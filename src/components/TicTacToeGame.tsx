"use client";
import React, { useState, useEffect } from 'react'
import TicTacToeMap from './TicTacToeMap'
import { useAnchorWallet, useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import * as web3 from '@solana/web3.js';
import idl from '@/../tictactoe.json';
import { type GameAccount } from '@/utils/GameAccount';

const PROGRAM_ID = "H4bSrBW7fkzj4AeaJD5AVdzR3fcBM4DMykcKqHpen48v";

const TicTacToeGame = ({ addr }: { addr: string }) => {

  const wallet: WalletContextState = useWallet();
  const [content, setContent] = useState<GameAccount | null>(null);
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const accountAddr = new web3.PublicKey(addr);
  const pubkey = wallet.publicKey;
  

  const fetchProgramAccount = async () => {
    const res = await program?.account.game.fetch(new web3.PublicKey(addr));
    if (res) {
      const account: GameAccount = {
        players: [res.players[0].toString(), res.players[1].toString()],
        map: res.map,
        status: res.status
      }
      setContent(account);
    }
  }

  const sendPlay = async (coordinates: number, setSelected: (n: number) => void) => {

    if (pubkey && coordinates >= 0 && coordinates <= 8) {
      const tx = await program?.methods
      .play(coordinates)
      .accounts({
        game: accountAddr,
        user: pubkey
      })
      .transaction();

      if (tx) {
        const blockhash = await connection.getLatestBlockhash();

        tx.feePayer = pubkey;
        tx.recentBlockhash = blockhash.blockhash;

        if (wallet.signTransaction) {
          const signedTx = await wallet.signTransaction(tx);
          
          // Send the transaction
          const sig = await connection.sendRawTransaction(signedTx.serialize());

          const confirmStrategy: web3.BlockheightBasedTransactionConfirmationStrategy = {
            blockhash: blockhash.blockhash,
            lastValidBlockHeight: blockhash.lastValidBlockHeight,
            signature: sig,
          };
          const result = await connection.confirmTransaction(confirmStrategy);
          await fetchProgramAccount();
          setSelected(-1);
        }
      }
    }
  }

  useEffect(() => {
    let provider: anchor.Provider;

    try {
      provider = anchor.getProvider();
    } catch {
      provider = new anchor.AnchorProvider(connection, anchorWallet as anchor.Wallet, {});
      anchor.setProvider(provider);
    }
    const tmpProgram: anchor.Program<anchor.Idl> = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
    setProgram(tmpProgram);
  }, [])

  useEffect(() => {
    fetchProgramAccount();
  }, [program])

  return (
    <div className='flex flex-grow w-1/3 m-auto'>
      {wallet.connected && content &&
        <>
          <TicTacToeMap gameData={content} play={sendPlay} refresh={fetchProgramAccount} />
          {/* <button onClick={fetchProgramAccount}>asfasf</button> */}
        </>

      }
    </div>
  )
}

export default TicTacToeGame
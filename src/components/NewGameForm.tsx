"use client";
import { useAnchorWallet, useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import React, { use, useEffect, useState } from 'react'
import * as anchor from '@coral-xyz/anchor';
import * as web3 from '@solana/web3.js';
import idl from '../../tictactoe.json';

const PROGRAM_ID = "FwbbVwjZ5zLs2C6Qw1bBMDaWaLymzqoT4WapDZDQ5zGY";

const NewGameForm = () => {
  const wallet: WalletContextState = useWallet();

  const [pubkey, setPubkey] = useState<string>("");
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();


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
    if (wallet.connected === true && wallet.publicKey?.toString() != pubkey) {
      setPubkey(wallet.publicKey?.toString() || "");
    }
  }, [wallet])

  const onClick = async (pubkey: web3.PublicKey) => {
    const newAccount = anchor.web3.Keypair.generate();

    if (wallet && wallet.publicKey) {
      try {
        const transaction = await program?.methods
          .createGame(pubkey)
          .accounts({
            game: newAccount.publicKey,
            user: wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([newAccount]) //Need this else it says missing signature
          .transaction();
  
        if (transaction && wallet.signTransaction) {
          const blockhash = await connection.getLatestBlockhash();

          transaction.feePayer = wallet.publicKey;
          transaction.recentBlockhash = blockhash.blockhash;
          
          transaction.partialSign(newAccount); //Need this else it says missing signature

          //Signature with the user's wallet
          const signedTx = await wallet.signTransaction(transaction);
          const txid = await connection.sendRawTransaction(signedTx.serialize());

          const confirmStrategy: web3.BlockheightBasedTransactionConfirmationStrategy = {
            blockhash: blockhash.blockhash,
            lastValidBlockHeight: blockhash.lastValidBlockHeight,
            signature: txid,
          };

          const result = await connection.confirmTransaction(confirmStrategy);
          
          window.location.href = `/game/${newAccount.publicKey.toString()}`;
        }
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const pubkey = new web3.PublicKey(event.target.elements.addr2.value);
    await onClick(pubkey);
  }

  return (
    <div className='flex flex-grow'>
      <div className="w-10/12 sm:w-2/5 m-auto mrounded-lg border p-5 border-neutral-800">
        <form onSubmit={onSubmit} className='flex flex-col space-y-1'>
          <input type="text" disabled={true} className="input input-bordered input-primary w-full disabled" defaultValue={pubkey} />
          <input type="text" name="addr2" className="input input-bordered w-full text-black" placeholder="Opponent's public key" />
          <br />
          <input type='submit' value={"Start New game"} className='btn btn-block text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' />
        </form>
      </div>
    </div>
  )
}

export default NewGameForm
"use client";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'
import * as anchor from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';

const PROGRAM_ID = "H4bSrBW7fkzj4AeaJD5AVdzR3fcBM4DMykcKqHpen48v";

const NewGameForm = () => {
  const wallet = useWallet();

  const [pubkey, setPubkey] = useState("");
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();


  useEffect(() => {
    let provider: anchor.Provider;

    // provider = anchor.getProvider();
    try {
      provider = anchor.getProvider();
    } catch {
      provider = new anchor.AnchorProvider(connection, anchorWallet as anchor.Wallet, {});
      anchor.setProvider(provider);
    }
  }, [])

  useEffect(() => {
    if (wallet.connected === true && wallet.publicKey?.toString() != pubkey) {
      console.log(wallet);
      setPubkey(wallet.publicKey?.toString() || "");
    }
  }, [wallet])

  const onSubmit = (event: any) => {
    event.preventDefault();
    // console.log(event.target.elements.addr2.value);
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
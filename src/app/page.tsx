"use client";
import React, { useMemo } from "react";
import NewGameForm from "@/components/NewGameForm";
import dynamic from "next/dynamic";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletMultiButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });

export default function Home() {

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], [network]);

  return (
    <div className="flex h-screen flex-col p-2">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
          <div className='absolute right-2'>
            <WalletMultiButtonDynamic/>
          </div>
          <h1 className="text-5xl">
            Solana <span className="font-black">Tic Tac Toe</span>
            </h1>
          <NewGameForm />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
  );
}

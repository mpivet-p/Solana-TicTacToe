"use client";
import TicTacToeGame from '@/components/TicTacToeGame';
import dynamic from 'next/dynamic';
import React, { ReactNode, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletMultiButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });

export default function Home({ params }
  : {
    params: {address: string}
  }): ReactNode {
    
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], [network]);

  return (
    <div className='flex h-screen flex-col p-2'>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className='absolute right-2'>
              <WalletMultiButtonDynamic/>
            </div>
            <TicTacToeGame addr={params.address}/>
            {/* <p>{params.address}</p> */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );

}
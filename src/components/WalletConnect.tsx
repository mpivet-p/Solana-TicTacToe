"use client";
import React from 'react';
import Wallet from './Wallet';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });


const WalletConnect = () => {
  return (
    <Wallet>
      <div className='w-full flex justify-end'>
        <WalletMultiButtonDynamic/>
      </div>
    </Wallet>
  )
}

export default WalletConnect
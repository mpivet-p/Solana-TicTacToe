import TicTacToeGame from '@/components/TicTacToeGame';
import React, { ReactNode } from 'react'

export default function Home({ params }
  : {
    params: {address: string}
  }): ReactNode {
  return (
    <div className='flex h-screen flex-col p-2'>
      {/* <TicTacToeGame /> */}
      <p>{params.address}</p>
    </div>
  );

}
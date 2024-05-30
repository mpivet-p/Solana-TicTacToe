"use client";
import React, { useEffect, useState } from 'react';
import Square from './Square';
import './tictactoe.css';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { type GameAccount } from '@/utils/GameAccount';
import Link from 'next/link';
import { setServers } from 'dns';

const TicTacToeMap = ({ gameData, play, refresh }: {
  gameData: GameAccount,
  play: (coordinates: number, f: (n: number) => void) => void,
  refresh: () => void
}) => {
  const wallet: WalletContextState = useWallet();

  const [selected, setSelected] = useState<number>(-1);

  const toPlay = gameData.status;
  const map = gameData.map;
  const status: string = gameData.status <= 1 ? "playing" : "won";
  const playing: boolean = gameData.status <= 1 && gameData.players[gameData.status] === wallet.publicKey?.toString();

  console.log(gameData);

  const sendPlay = () => {
    play(selected, setSelected);
  }

  return (
    <div className="flex flex-col w-full my-10 items-center min-w-64">
      {status === "playing" &&
        <>
          <div className='controls my-5 w-full'>
            <button className="btn w-full" onClick={refresh}>Refresh</button>
          </div>
          <div className='status my-4'>
            <p><span className='badge badge-lg badge-accent'>{"XO"[toPlay]}</span> Playing {playing && "(You)"}</p>
          </div>
        </>
      }
      <div>
        <Square map={map} index={0} selected={selected} setSelected={setSelected} playing={playing} player={toPlay}/>
        <Square map={map} index={1} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={2} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
      </div>
      <div>
        <Square map={map} index={3} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={4} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={5} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
      </div>
      <div>
        <Square map={map} index={6} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={7} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={8} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
      </div>
      {status === "playing" &&
        <div className='m-5 w-full'>
          <button className='btn border-none w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' onClick={sendPlay}>Play</button>
        </div>
      }
      {status === "won" &&
        <div role="alert" className="alert alert-success my-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Congrats you won!</span>
        </div>
      }
      {status === "lost" &&
        <div role="alert" className="alert alert-error my-5 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>You lost!</span>
        </div>
      }
      {status !== "playing" &&
        <Link href="/" className='btn btn-primary btn-lg border-none w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' >New Game</Link>
      }
    </div>
  )
}

export default TicTacToeMap
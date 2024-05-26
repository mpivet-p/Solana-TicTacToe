"use client";
import React, { useEffect, useState } from 'react';
import Square from './Square';
import './tictactoe.css';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';

const TicTacToeMap = () => {
  const wallet: WalletContextState = useWallet();

  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

  //TMP
  const x: number[] = [0, 0, 1, 0, 0, 1, 0, 0, 0];
  const o: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 0];
  const players: string[] = ["3vGRegbBSpitpMyxdY71jBZUoKSvHtvYfTPexVp88zXP", "3vGRegbBSpitpMyxdY71jBZUoKSvHtvYfTPexVp88zXP"];
  const toPlay = 0;
  const status: string = "won";
  const playing: boolean = players[toPlay] === wallet.publicKey?.toString() && status === "playing";

  useEffect(() => {
    const tmp = [...map];
    for (let i = 0; i < 9; i++) {
      if (x[i]) {
        tmp[i] = 1;
      } else if (o[i]) {
        tmp[i] = 2;
      }
    }
    setMap(tmp);
  }, [])

  const refresh = () => {
    console.log(localStorage.getItem("GameAddress"));
    console.log("refresh");
  }

  const sendPlay = () => {
    console.log("play");
    localStorage.setItem("GameAddress", "value");
  }

  const newGame = () => {
    localStorage.removeItem("GameAddress");
  }

  return (
    <div className="flex flex-col w-full my-10 items-center">
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
        <Square map={map} index={1} selected={selected} setSelected={setSelected} playing={playing} player={toPlay}/>
        <Square map={map} index={2} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={3} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
      </div>
      <div>
        <Square map={map} index={4} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={5} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={6} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
      </div>
      <div>
        <Square map={map} index={7} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={8} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
        <Square map={map} index={9} selected={selected} setSelected={setSelected} playing={playing} player={toPlay} />
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
        <button className='btn btn-primary btn-lg border-none w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' onClick={newGame}>New Game</button>
      }
    </div>
  )
}

export default TicTacToeMap
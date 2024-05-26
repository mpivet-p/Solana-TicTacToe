"use client";
import Image from "next/image";
import Wallet from "../components/Wallet";
import NewGameForm from "@/components/NewGameForm";
import WalletConnect from "@/components/WalletConnect";
import TicTacToeGame from "@/components/TicTacToeGame";


export default function Home() {
  const accountAddress = localStorage.getItem("GameAddress");
  return (
    <div className="flex h-screen flex-col p-2">
      <WalletConnect />
      <h1 className="text-5xl">Solana <span className="font-black">Tic Tac Toe</span></h1>
      <Wallet>
        {accountAddress &&
          <TicTacToeGame />
        }
        {!accountAddress &&
          <NewGameForm />
        }
      </Wallet>
    </div>
  );
}

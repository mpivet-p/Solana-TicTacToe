"use client";
import React from 'react'

const Square = ({ map, index, selected, setSelected, playing, player }
  : {
    map: number[],
    index: number,
    selected: any,
    setSelected: any,
    playing: boolean,
    player: number
  }) => {
  let res: string = "‎";

  if (map[index] === 1 || (selected === index && player === 0)) {
    res = "X";
  } else if (map[index] === 2 || (selected === index && player === 1)) {
    res = "O"
  }

  const onClick = () => {
    if (playing && map[index] === 0 && selected != index)
      setSelected(index);
  }

  return (
    <button className='square border-purple-700 border-2' onClick={onClick}>{res}</button>
  )
}

export default Square
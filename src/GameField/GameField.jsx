import React from 'react'
import "./gameField.scss"
import GameEl from "../GameEl/GameEl";


export default function Game (props) {
 
    		    return (
      <>
				<div className="game">
					{props.squares.map((_,i) => 
					{return <GameEl
						key={i}
						text={props.squares[i]}
						onClick={() => props.onClick(i)}
					/>}
					)}
      </div>
			</>
    );
  }



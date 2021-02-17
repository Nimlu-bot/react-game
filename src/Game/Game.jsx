import React from 'react'
import "./game.scss"
import GameEl from "../GameEl/GameEl";

export default function Game(props) {

	return (
		<div className="game">
			{props.elArray.map((el,idx)=>{
				return <GameEl text={el} key={idx}/>
			})}
						
		</div>
	)
}

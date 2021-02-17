import React from 'react'
import "./game.scss"
import GameEl from "../GameEl/GameEl";

export default function Game(props) {

	console.log(props);
	return (
		<div className="game">
			{props.elArray.map(el=>{
				return <GameEl text={el}/>
			})}
						
		</div>
	)
}

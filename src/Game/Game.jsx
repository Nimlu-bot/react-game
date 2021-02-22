import React, {useState} from 'react'
import "./game.scss"
import GameEl from "../GameEl/GameEl";

export default function Game(props) {
const [squares,setSquares] =useState( Array(9).fill("y"));

function  handleClick(i) {
	const squaresCopy = squares.slice();
	console.log(squaresCopy);
	squaresCopy[i] = 'X';
	setSquares({squares: squaresCopy});
	
}

	return (
		<div className="game">
			{/* {props.elArray.map((el,idx)=>{
				return <GameEl text={el} key={idx}/>
			})} */}
				{squares.map((el,idx)=>{
				return <GameEl text={el} key={idx} onClick={ ()=>handleClick}/>
			})}
						
		</div>
	)
}

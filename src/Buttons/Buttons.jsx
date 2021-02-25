import React from 'react'
import "./buttons.scss"

export default function Buttons(props) {
  return (
    <div className="buttons-wrapper">
			<button className ="new-game" onClick={props.onReset}>new game</button>
			<button className ="auto-play"onClick={props.onAuto}>auto play</button>
		</div>
  );
}
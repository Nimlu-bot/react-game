import React from 'react'
import "./buttons.scss"

export default function Buttons(props) {
  return (
    <div className="buttons-wrapper">
			<button className ="new-game btn btn-outline-primary btn-sm" onClick={props.onReset}>New game</button>
			<button className ="settings btn btn-outline-primary btn-sm" onClick={props.onSettings}>Settings</button>
			<button className ="fullScrean btn btn-outline-primary btn-sm" onClick={props.onFullScrean}>FullScrean</button>
			<button className ="stat btn btn-outline-primary btn-sm" onClick={props.onStat}>Stat</button>
			<button className ="auto-play btn btn-outline-primary btn-sm" onClick={props.onAuto}>Auto play</button>
		</div>
  );
}
import React from 'react'
import "./gameEl.scss";
// import useSound from 'use-sound';
// import click from "../assets/audio/click.mp3";

export default function GameEl(props) {
	return (
		<div className="el-container"onClick={props.onClick} > 
    <div className="el"> 
        <div className={`front ${props.text ? "front__rotated" : ""}`} >
          <span >{props.text}</span>
        </div>
        <div className= {`back ${props.text ? "back__rotated" : ""}`}>{props.text}</div>
    </div>
</div>
	)
}
// 
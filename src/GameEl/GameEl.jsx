import React,{useState} from 'react'
import "./gameEl.scss";
import useSound from 'use-sound';
import click from "../assets/audio/click.mp3";

export default function GameEl(props) {
	const [isActive, setActive] = useState(false);
	const [play] = useSound(click);

	const handleToggle = () => {
    setActive(!isActive);
		
  };

	
	return (
		<div className="el-container"onClick={handleToggle} onMouseDown={play}>
    <div className="el">
        <div className={`front ${isActive ? "front__rotated" : ""}`} >
          <span >{props.text}</span>
        </div>
        <div className= {`back ${isActive ? "back__rotated" : ""}`}>back{props.text}</div>
    </div>
</div>
	)
}

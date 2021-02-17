import React from 'react'
import "./gameEl.scss"

export default function GameEl(props) {
	console.log(props);
	return (
		<div className="el-container">
    <div className="el">
        <div className="front">
          <span className="fa fa-user">{props.text}</span>
        </div>
        <div className="back">back{props.text}</div>
    </div>
</div>
	)
}

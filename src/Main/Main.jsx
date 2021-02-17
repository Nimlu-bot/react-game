import React from "react";
import "./main.scss";
import Game from "../Game/Game";

export default function Main() {
	const elArray =[1,2,3,4,5,6,7,8,9]
  return (
    <div className="main">
      <div className="stat">time, turn, palyer</div>
      <Game elArray ={elArray}/>
    </div>
  );
}

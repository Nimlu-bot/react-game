import React from "react";
import "./main.scss";
import Game from "../GameField/GameField";

export default class Main extends React.Component{
	constructor(props) {
    super(props);
		const historyStor = localStorage.getItem('currentTurn') ?
	JSON.parse(localStorage.getItem('currentTurn') ):
 null;
 if(historyStor) {this.state = {
	history:historyStor ,
	isNextX: true,
}}
 else{this.state = {
	history: [{
		squares: Array(9).fill(null),
	}],
	isNextX: true,
}}
//  console.log(historyStor)
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//       }],
//       isNextX: true,
//     };
  }

	handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
		const squares = current.squares.slice();
		
		// console.log(this.state.history);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isNextX ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      isNextX: !this.state.isNextX,
    });
		
	this.updatelocal();
	console.log(this.state.history)
  }
	updatelocal(){
		localStorage.setItem('currentTurn', JSON.stringify(this.state.history));
		console.log("hi")
	}

	// componentDidMount() {
	// 	const historyStor = localStorage.getItem('currentTurn') ?
	// 	 JSON.parse(localStorage.getItem('currentTurn') ):
	// 	null;
	// 	if(historyStor) this.setState({ history:historyStor });
	// 	console.log(historyStor)
	// }
	


	
	render() {
		const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
		
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
			if(history.length<10){
      status = 'Следующий ход: ' + (this.state.isNextX ? 'X' : 'O');
		}else{
			status = 'Ничья';
		}
    }
		this.updatelocal();
	

    return (
      <div className="main">
      <div className="turn"> turn {history.length - 1} </div>
      <Game squares={current.squares}
            onClick={(i) => this.handleClick(i)}
			/>
			<div className="status">{status}</div>
     </div>
    );
  }
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function loadLocal(){
	const historyStor = localStorage.getItem('currentTurn') ?
	JSON.parse(localStorage.getItem('currentTurn') ):
 null;
 if(historyStor) this.setState({ history:historyStor });
 console.log(historyStor)
	} 
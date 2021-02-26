import React from 'react';
import './main.scss';
import Game from '../GameField/GameField';
import Buttons from '../Buttons/Buttons';
import Audio from '../Audio/Audio';

// let ctx = new AudioContext();
// let out = ctx.destination;
// let gain = ctx.createGain();
// let sound = ctx.createMediaElementSource(click);

// sound.connect(gain);
// gain.connect(out);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const historyStor = localStorage.getItem('currentTurn')
            ? JSON.parse(localStorage.getItem('currentTurn'))
            : null;
        if (historyStor) {
            this.state = {
                history: historyStor,
                isNextX: (historyStor.length - 1) % 2 === 0,
                stepNumber: historyStor.length - 1,
            };
        } else {
            this.state = {
                history: [
                    {
                        squares: Array(9).fill(null),
                    },
                ],
                isNextX: true,
                stepNumber: 0,
            };
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // ctx.resume();
        // sound.mediaElement.play();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNextX ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            isNextX: !this.state.isNextX,
        });

        //this.updateLocal();
        // console.log(this.state.history);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isNextX: step % 2 === 0,
        });
    }
    updateLocal(key) {
        if (key === 'currentTurn') {
            localStorage.setItem('currentTurn', JSON.stringify(this.state.history));
        }
        if (key === 'score') {
            const scoreStor = localStorage.getItem('scores')
                ? JSON.parse(localStorage.getItem('scores'))
                : Array(10).fill(null);

            if (1) {
                if (this.state.stepNumber % 2 === 0) {
                    const scores = scoreStor.slice(-9);
                    scores.push({ winner: 'O', turn: this.state.stepNumber });
                    localStorage.setItem('scores', JSON.stringify(scores));
                } else {
                    const scores = scoreStor.slice(-9);
                    scores.push({ winner: 'X', turn: this.state.stepNumber });
                    localStorage.setItem('scores', JSON.stringify(scores));
                }
            }
        }
        if (key === 'draw') {
            const scoreStor = localStorage.getItem('scores')
                ? JSON.parse(localStorage.getItem('scores'))
                : Array(10).fill(null);
            {
                const scores = scoreStor.slice(-9);
                scores.push({ winner: '-', turn: this.state.stepNumber });
                localStorage.setItem('scores', JSON.stringify(scores));
            }
        }
    }

    resetGame() {
        this.jumpTo(0);
        this.setState({
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
        });
        //this.updateLocal();
    }

    autoPlay() {
        this.resetGame();
        setTimeout(() => this.handleClick(0), 1000);
        setTimeout(() => this.handleClick(3), 2000);
        setTimeout(() => this.handleClick(1), 3000);
        setTimeout(() => this.handleClick(4), 4000);
        setTimeout(() => this.handleClick(5), 5000);
        setTimeout(() => this.handleClick(2), 6000);
        setTimeout(() => this.handleClick(7), 7000);
        setTimeout(() => this.handleClick(8), 8000);
        setTimeout(() => this.handleClick(6), 9000);

        // const history = this.state.history.slice(0, 1);
        //   const squares = [null, null, 'X', null, null, null, null, null, null];
        //   this.setState({
        //       history: history.concat([
        //           {
        //               squares: squares
        //           }
        //       ]),
        //       stepNumber: history.length,
        //       isNextX: !this.state.isNextX
        //   });
    }
    updateStatus() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'Выиграл ' + winner;
            this.updateLocal('score');
            console.log('hi');
        } else {
            if (history.length < 10) {
                status = 'Следующий ход: ' + (this.state.isNextX ? 'X' : 'O');
            } else {
                status = 'Ничья';
                this.updateLocal('draw');
            }
        }
        this.updateLocal('currentTurn');
        return status;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        // const winner = calculateWinner(current.squares);
        // let status;

        // if (winner) {
        //     status = 'Выиграл ' + winner;
        //     // const rezult={winner,turn:history.length - 1}
        //     this.updateLocal('score');
        //     console.log('hi');
        // } else {
        //     if (history.length < 10) {
        //         status = 'Следующий ход: ' + (this.state.isNextX ? 'X' : 'O');
        //     } else {
        //         status = 'Ничья';
        //         this.updateLocal('draw');
        //     }
        // }
        // this.updateLocal('currentTurn');

        return (
            <div className='wrapper'>
                <div className='main'>
                    <div className='turn'> turn {history.length - 1} </div>
                    <Game squares={current.squares} onClick={(i) => this.handleClick(i)} />
                    <div className='status'>{this.updateStatus()}</div>
                    <Buttons onReset={() => this.resetGame()} onAuto={() => this.autoPlay()} />
                </div>
                <Audio />
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

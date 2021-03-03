import React from 'react';
import './main.scss';
import Game from '../GameField/GameField';
import Buttons from '../Buttons/Buttons';
import Audio from '../Audio/Audio';
import Stat from '../Stat/Stat';
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.game = React.createRef();
        this.end = true;
        const historyStor = localStorage.getItem('currentTurn')
            ? JSON.parse(localStorage.getItem('currentTurn'))
            : null;

        if (historyStor) {
            this.state = {
                history: historyStor,
                isNextX: (historyStor.length - 1) % 2 === 0,
                stepNumber: historyStor.length - 1,
                settings: false,
                stat: false,
                win: false,
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
                settings: false,
                stat: false,
                win: false,
            };
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares)) {
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
            const scores = scoreStor.slice(-9);
            if (this.state.stepNumber % 2 === 0) {
                this.winHandler();
                scores.push({ winner: 'O', turn: this.state.stepNumber });
            } else {
                this.winHandler();
                scores.push({ winner: 'X', turn: this.state.stepNumber });
            }
            localStorage.setItem('scores', JSON.stringify(scores));
        }

        if (key === 'draw') {
            const scoreStor = localStorage.getItem('scores')
                ? JSON.parse(localStorage.getItem('scores'))
                : Array(10).fill(null);
            {
                const scores = scoreStor.slice(-9);
                scores.push({ winner: '-', turn: this.state.stepNumber });
                localStorage.setItem('scores', JSON.stringify(scores));
                this.winHandler();
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
        this.end = false;
    }

    autoPlay() {
        this.resetGame();
        setTimeout(() => this.handleClick(0), 1000);
        setTimeout(() => this.handleClick(3), 2000);
        setTimeout(() => this.handleClick(1), 3000);
        setTimeout(() => this.handleClick(8), 4000);
        setTimeout(() => this.handleClick(5), 5000);
        setTimeout(() => this.handleClick(2), 6000);
        setTimeout(() => this.handleClick(7), 7000);
        setTimeout(() => this.handleClick(4), 8000);
        setTimeout(() => this.handleClick(6), 9000);
    }

    updateStatus() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'Winner ' + winner;
            if (!this.end) {
                this.updateLocal('score');
            }
            this.end = true;
        } else {
            if (history.length < 10) {
                status = 'Next move: ' + (this.state.isNextX ? 'X' : 'O');
            } else {
                status = 'Draw';
                if (!this.end) {
                    this.updateLocal('draw');
                }
                this.end = true;
            }
        }

        this.updateLocal('currentTurn');
        return status;
    }

    settings() {
        this.setState((prevState) => ({
            settings: !prevState.settings,
        }));
    }

    stat() {
        this.setState((prevState) => ({
            stat: !prevState.stat,
        }));
    }

    winHandler() {
        setTimeout(
            () =>
                this.setState((prevState) => ({
                    win: !prevState.win,
                })),
            0,
        );
        setTimeout(
            () =>
                this.setState((prevState) => ({
                    win: !prevState.win,
                })),
            3000,
        );
    }

    fullScrean() {
        this.game.current.requestFullscreen();
    }

    componentDidMount() {
        this.end = false;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        return (
            <div className='wrapper'>
                <div className='main'>
                    <div ref={this.game} className='game-field'>
                        <div className='turn '> Turn {history.length - 1} </div>
                        <Game squares={current.squares} onClick={(i) => this.handleClick(i)} />
                        <div className={`status ${this.state.win === true ? 'blinked' : ''}`}>
                            {this.updateStatus()}
                        </div>
                    </div>
                    <Buttons
                        onReset={() => this.resetGame()}
                        onAuto={() => this.autoPlay()}
                        onSettings={() => this.settings()}
                        onFullScrean={() => this.fullScrean()}
                        onStat={() => this.stat()}
                    />
                </div>
                <Audio show={this.state.settings} onClose={() => this.settings()} />
                <Stat show={this.state.stat} onClose={() => this.stat()} />
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

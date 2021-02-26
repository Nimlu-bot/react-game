import React, { useEffect } from 'react';
import './gameField.scss';
import GameEl from '../GameEl/GameEl';
import Sound from '../Audio/SoundProc';
import click from '../assets/audio/click.mp3';

export default function Game(props) {
    useEffect(() => {
        Sound.init();
    }, []);
    return (
        <>
            <div className='game'>
                {props.squares.map((_, i) => {
                    return (
                        <GameEl
                            key={i}
                            text={props.squares[i]}
                            onClick={() => props.onClick(i)}
                            jmiak={() => {
                                Sound.play('click');
                            }}
                        />
                    );
                })}
            </div>
            <audio controls src={`${click}`} id='click'></audio>
        </>
    );
}

import React, { useEffect, useState } from 'react';
//import click from '../assets/audio/click.mp3';
import muz from '../assets/audio/bit.mp3';
import AudioProc from './AudioProc';
import Sound from './SoundProc';
import './settings.scss';

export default function Audio() {
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [playSound, setPlaySound] = useState(false);
    const [muteSound, setMuteSound] = useState(false);
    const [volume, setVolume] = useState(1);
    const [pan, setPan] = useState(0);
    const [volumeSound, setVolumeSound] = useState(1);
    const [panSound, setPanSound] = useState(0);

    const changeVolume = (e) => {
        let { value } = e.target;
        setVolume(value);
        AudioProc.setVolume(value);
    };
    const changePan = (e) => {
        let { value } = e.target;
        setPan(value);
        AudioProc.setPan(value);
    };
    const changeVolumeSound = (e) => {
        let { value } = e.target;
        setVolumeSound(value);
        Sound.setVolume(value);
    };
    const changePanSound = (e) => {
        let { value } = e.target;
        setPanSound(value);
        Sound.setPan(value);
    };
    useEffect(() => {
        AudioProc.init();
        //  Sound.init();
    }, []);
    return (
        <div className='audio-wrapper'>
            <audio controls src={`${muz}`} id='muz'></audio>
            {/* <audio controls src={`${click}`} id="click"></audio> */}
            <button
                className='btn btn-outline-success btn-sm'
                onClick={() => {
                    if (!play) {
                        AudioProc.play('muz');
                        setPlay(true);
                    } else {
                        AudioProc.pause('muz');
                        setPlay(false);
                    }
                }}
            >
                play
            </button>
            <p className='music-title'>Music</p>
            <button
                className='btn btn-outline-success btn-sm'
                data-bs-toggle='button'
                onClick={() => {
                    if (!mute) {
                        AudioProc.setVolume(0);
                        setMute(true);
                    } else {
                        AudioProc.setVolume(1);
                        setMute(false);
                    }
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-volume-mute-fill'
                    viewBox='0 0 16 16'
                >
                    <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                </svg>
            </button>
            <div className='audio-container'>
                <div className='volume-container'>
                    <span>G</span>
                    <input
                        type='range'
                        id='volume'
                        min='0'
                        max='2'
                        value={volume}
                        step='0.01'
                        className='input-slider'
                        onChange={changeVolume}
                    />
                </div>
                <div className='panner-container'>
                    <span>L</span>
                    <input
                        type='range'
                        id='panner'
                        min='-1'
                        max='1'
                        value={pan}
                        step='0.01'
                        className='input-slider'
                        onChange={changePan}
                    />
                    <span>R</span>
                </div>
            </div>

            <div className='audio-container'>
                <p className='sound-title'>Sound</p>
                <div className='volume-container'>
                    <button
                        className='btn btn-outline-success btn-sm'
                        onClick={() => {
                            if (!muteSound) {
                                Sound.setVolume(0);
                                setMuteSound(true);
                            } else {
                                Sound.setVolume(1);
                                setMuteSound(false);
                            }
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-volume-mute-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                        </svg>
                    </button>
                    <span>G</span>

                    <input
                        type='range'
                        id='volume'
                        min='0'
                        max='2'
                        value={volumeSound}
                        step='0.01'
                        className='input-slider'
                        onChange={changeVolumeSound}
                    />
                </div>
                <div className='panner-container'>
                    <span>L</span>
                    <input
                        type='range'
                        id='panner'
                        min='-1'
                        max='1'
                        value={panSound}
                        step='0.01'
                        className='input-slider'
                        onChange={changePanSound}
                    />
                    <span>R</span>
                </div>
            </div>
        </div>
    );
}

/*
for example:
AudioProcessor.play('bark');
AudioProcessor.pause('bark');
AudioProcessor.reset('bark');
AudioProcessor.setVolume(number); [0, 2]
AudioProcessor.setPan(number); [-1, 1]
 */

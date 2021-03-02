import React, { useState } from 'react';
import AudioProc from './AudioProc';
import Sound from './SoundProc';
import './settings.scss';

export default function Audio(props) {
    const [mute, setMute] = useState(false);
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

    return (
        <div className={`audio-wrapper ${props.show === true ? '' : 'hided'}`}>
            <div className='music-wrapper'>
                <div className='music-title'>Music</div>
                <button
                    className='btn btn-outline-primary btn-sm'
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
                    <i className={`bi ${!mute ? 'bi-volume-mute-fill' : 'bi-volume-down-fill'}`}></i>
                </button>
            </div>
            <div className='audio-container'>
                <div className='volume-container'>
                    <div className='text'>-</div>
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
                    <div className='text'>+</div>
                </div>

                <div className='panner-container'>
                    <span className='text'>L</span>
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
                    <span className='text'>R</span>
                </div>
            </div>
            <div className='music-wrapper'>
                <div className='music-title'>Sound</div>
                <button
                    className='btn btn-outline-primary btn-sm'
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
                    <i className={`bi ${!muteSound ? 'bi-volume-mute-fill' : 'bi-volume-down-fill'}`}></i>
                </button>
            </div>
            <div className='audio-container'>
                <div className='volume-container'>
                    <div className='text'>-</div>
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
                    <div className='text'>+</div>
                </div>
                <div className='panner-container'>
                    <span className='text'>L</span>
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
                    <span className='text'>R</span>
                </div>
            </div>
            <button
                className='btn btn-outline-primary btn-sm'
                onClick={() => {
                    props.onClose();
                }}
            >
                close
            </button>
        </div>
    );
}

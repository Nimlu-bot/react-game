import React, { useEffect,useState } from 'react';
import './header.scss';
import AudioProc from '../Audio/AudioProc';
import muz from '../assets/audio/bit.mp3';

export default function Header() {
	const [play, setPlay] = useState(false);
	useEffect(() => {
		AudioProc.init();
}, []);
    return (
        <div className="nav">
					<audio controls src={`${muz}`} id='muz'></audio>
            <div className="logo">React Game</div>
						<button className="play"
						onClick={() => {
							if (!play) {
									AudioProc.play('muz');
									setPlay(true);
							} else {
									AudioProc.pause('muz');
									setPlay(false);
						}
	}}><i className={`bi i ${play ? 'bi-pause-fill' : 'bi-play-fill'}`}></i></button>
            <div className="user">User</div>
        </div>
    );
}

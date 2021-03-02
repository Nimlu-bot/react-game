import React from 'react';
import './stat.scss';

export default function Stat(props) {
    const score = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];

    const rezult = score.filter((el, idx) => el !== null);
    return (
        <ul className={`stat-wrapper ${props.show === true ? '' : 'hided'}`}>
            {rezult.map((el, idx) => {
                return (
                    <li key={idx}>
                        <span className='statidx'>{idx + 1}</span>
                        <span className='stat-winner'>Winner: {el.winner}</span>{' '}
                        <span className='stat-turn'>Turn: {el.turn}</span>
                    </li>
                );
            })}
            <button
                className='btn btn-outline-primary btn-sm'
                onClick={() => {
                    props.onClose();
                }}
            >
                close
            </button>
        </ul>
    );
}

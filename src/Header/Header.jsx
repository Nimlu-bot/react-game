import React from 'react';
import './header.scss';
import Audio from '../Audio/Audio';

export default function Header() {
    return (
        <div className="nav">
            <div className="logo">React Game</div>
            <Audio />
            <div className="user">User</div>
        </div>
    );
}

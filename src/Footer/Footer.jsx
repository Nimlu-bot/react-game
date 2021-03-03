import React from 'react';
import './footer.scss';
import logo from '../assets/img/rs_school_js.svg';
import gitLogo from '../assets/img/github.svg';

export default function Footer() {
    return (
        <footer className='footer'>
            <a className='logo-box' href='https://rs.school/js/'>
                <img className='rs-logo' src={logo} alt='rs-logo' />
            </a>
            <a className='autor-name' href='https://github.com/nimlu-bot'>
                <img className='git-logo' src={gitLogo} alt='git-logo' />
                Nimlu-bot
            </a>
            <div className='year'>2021</div>
        </footer>
    );
}

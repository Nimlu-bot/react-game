import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <Main />
        <Footer />
    </React.StrictMode>,
    document.getElementById('root'),
);

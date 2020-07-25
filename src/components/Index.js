import React from 'react';
import Logo from '../images/logo.png';

export default function Index() {
    return (
        <div className="content">
            <h1>Rotaract District Organisation</h1>
                <h3>RI District 3291 ~ Kolkata, South Bengal & Andamans</h3>
                <h2>Why am I seeing this?</h2>
                <p>
                    We are sorry that you are having to wait a little longer.
                </p>
                <ul>
                    <li><i>But good things take time, you know.</i></li>
                </ul>
            
            <a className="logo" target="_blank" rel="noopener noreferrer" href="https://facebook.com/rotaractdistrict3291">
                <img src={Logo} alt="DRR Theme RY 2020 - 21 || RI District 3291" style={{ height: '8rem', width: 'auto' }} />
            </a>
        </div>
    );
}
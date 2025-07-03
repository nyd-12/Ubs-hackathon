import React, { useState } from 'react';
import '../styles/Header.css';
import Drawer from './Drawer';

const Header: React.FC<{
    onOpenDrawer?: () => void;
}> = ({ onOpenDrawer }) => (
    <header className="header">
        <button
            className="drawer-toggle-btn"
            onClick={onOpenDrawer}
            aria-label="Open chat history drawer"
            style={{
                background: 'none',
                border: 'none',
                color: '#ff2d2d',
                fontSize: '1.7rem',
                fontWeight: 700,
                marginRight: '1.2rem',
                cursor: 'pointer',
                verticalAlign: 'middle',
            }}
        >
            &#9776;
        </button>
        <span className="header-red">Red</span>
        <span className="header-white">Bot</span>
    </header>
);

export default Header;
import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  onOpenDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenDrawer }) => (
  <header className="header">
    <button
      className="drawer-toggle-btn"
      aria-label="Open chat history"
      onClick={onOpenDrawer}
      type="button"
    >
      {/* Simple hamburger icon */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect y="6" width="28" height="3" rx="1.5" fill="#a3a3b3"/>
        <rect y="13" width="28" height="3" rx="1.5" fill="#a3a3b3"/>
        <rect y="20" width="28" height="3" rx="1.5" fill="#a3a3b3"/>
      </svg>
    </button>
    <span className="header-white">Smart-Stacks</span>
  </header>
);

export default Header;
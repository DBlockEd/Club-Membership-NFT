import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import '../css/Navbar.css'; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Club Membership</h1>
      <div className="connectButtonContainer">
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;

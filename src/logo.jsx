import React from 'react';
import myLogo from './assets/logo.png';

function Logo() {
  return (
    <nav>
      <img src={myLogo} alt="workout-maintainer" style={{ height: '40px', width: 'auto' }} />
    </nav>
  );
}
export default Logo;
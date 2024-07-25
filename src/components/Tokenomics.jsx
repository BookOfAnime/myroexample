import React, { useState } from 'react';
import './Tokenomics.css';

const Tokenomics = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <section className="tokenomics">
      <h2 className="tokenomics-title">Tokenomics</h2>
      <div className="tokenomics-container">
        <div className="tokenomics-box" onClick={() => handleCopy('$MYRO')}>
          <span className="tokenomics-label">Symbol</span>
          <span className="tokenomics-value">$MYRO</span>
        </div>
        <div className="tokenomics-box" onClick={() => handleCopy('0/0')}>
          <span className="tokenomics-label">Tax</span>
          <span className="tokenomics-value">0/0</span>
        </div>
        <div className="tokenomics-box" onClick={() => handleCopy('Burned Forever')}>
          <span className="tokenomics-label">LP</span>
          <span className="tokenomics-value">Burned Forever</span>
        </div>
        <div className="tokenomics-box" onClick={() => handleCopy('HhJpBhRRn4g56VsyLuT8...')}>
          <span className="tokenomics-label">Token Address</span>
          <span className="tokenomics-value">HhJpBhRRn4g56VsyLuT8...</span>
        </div>
      </div>
      {copySuccess && <div className="copy-notification">{copySuccess}</div>}
    </section>
  );
};

export default Tokenomics;
import React from 'react';

const Features = () => {
  return (
    <section className="features">
      <h2 className="features-title">Features <span className="bowl-icon">🍲</span></h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>Myro Buy Bot</h3>
          <p>Solana's first public BuyBot on Telegram. Promotes cross-pollination and offers free exposure through "MYRO Trending". As adoption grows, a small fee for trending may be introduced, with a chance for free inclusion.</p>
          <button className="feature-button">Add to group</button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Social-Fi mobile app</h3>
          <p>A social media app based on Solana Mobile that allows selling posted images and media as cNFTs. Those who like/favorite posted images can receive a share of the final sale price.</p>
          <button className="feature-button">Coming Soon...</button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>Further Use-Cases</h3>
          <p>SMYRO aims to enhance the Solana ecosystem, providing essential utilities for evolving user needs. Our commitment supports Solana's long-term growth, serving a wide user base.</p>
          <button className="feature-button">Coming Soon...</button>
        </div>
      </div>
    </section>
  );
};

export default Features;
import React from 'react';
import './JoinMADMovement.css';

const JoinMADMovement = () => {
  const socialLinks = [
    { name: 'Telegram', icon: 'telegram-icon.png', url: 'https://t.me/MADmovementchannel' },
    { name: 'Instagram', icon: 'instagram-icon.png', url: 'https://www.instagram.com/madmovementofficial/' },
    { name: 'Twitter', icon: 'twitter-icon.png', url: 'https://twitter.com/MADMovement_' },
    { name: 'TikTok', icon: 'tiktok-icon.png', url: 'https://www.tiktok.com/@madmovementofficial' },
  ];

  return (
    <div className="join-mad-movement">
      <div className="overlay"></div>
      <div className="content-wrapper">
        <div className="text-content">
          <h1>Join the $DOBS</h1>
          <p>Join the MAD Meme Club and let's have fun while making BANK!</p>
          <p>Follow us for updates so juicy, you might get a buzz!</p>
        </div>
        <div className="social-buttons">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinMADMovement;

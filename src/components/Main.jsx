import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './Main.css';

gsap.registerPlugin(TextPlugin);

const InfiniteLooper = ({ speed, direction, children }) => {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  function resetAnimation() {
    if (innerRef.current) {
      innerRef.current.style.animation = 'none';
      innerRef.current.offsetHeight; // Trigger reflow
      innerRef.current.style.animation = null;
    }
  }

  function setInstanceCount(containerWidth, itemWidth) {
    const instances = Math.ceil(containerWidth / itemWidth) + 1;
    setLooperInstances(instances);
  }

  useEffect(() => {
    if (innerRef.current && outerRef.current) {
      const containerWidth = outerRef.current.offsetWidth;
      const itemWidth = innerRef.current.firstChild.offsetWidth;
      setInstanceCount(containerWidth, itemWidth);
    }

    function handleResize() {
      if (innerRef.current && outerRef.current) {
        const containerWidth = outerRef.current.offsetWidth;
        const itemWidth = innerRef.current.firstChild.offsetWidth;
        setInstanceCount(containerWidth, itemWidth);
        resetAnimation();
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="looper" ref={outerRef}>
      <div className="looper__innerList" ref={innerRef} style={{
        animationDuration: `${speed}s`,
        animationDirection: direction === "right" ? "reverse" : "normal"
      }}>
        {[...Array(looperInstances)].map((_, ind) => (
          <div key={ind} className="looper__listInstance">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

const BackgroundTickers = () => {
  return (
    <div className="background-tickers">
      {[...Array(20)].map((_, index) => (
        <InfiniteLooper key={index} speed={100} direction={index % 2 === 0 ? "left" : "right"}>
          <div className="ticker__item">$DOBS</div>
          <div className="ticker__item">$DOBS</div>
          <div className="ticker__item">$DOBS</div>
          <div className="ticker__item">$DOBS</div>
          <div className="ticker__item">$DOBS</div>
        </InfiniteLooper>
      ))}
    </div>
  );
};

const CoolButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      className={`cool-button ${isPressed ? 'pressed' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span className="cool-button-content">Buy $DOBS</span>
      <span className="cool-button-glitch"></span>
      <span className="cool-button-label">Rebel Dog Coin</span>
    </button>
  );
};

const Main = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState('Bliss');
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = cardRef.current.offsetWidth;
      canvas.height = cardRef.current.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !canvasRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const tiltX = (y - 0.5) * 30;
    const tiltY = (x - 0.5) * -30;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(50px)`;

    const shadowX = 50 * (x - 0.5);
    const shadowY = 50 * (y - 0.5);
    const hue = (x * 360) | 0;
    cardRef.current.style.boxShadow = `
      ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.7),
      0 0 100px 50px hsla(${hue}, 100%, 50%, 0.8)
    `;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      cardRef.current.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    }
    setIsHovered(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setDisplayText((prevText) => {
            const newText = prevText === 'Bliss' ? '$DOBS' : 'Bliss';
            setIsYellow(newText === '$DOBS');
            return newText;
          });
          gsap.to(textRef.current, { duration: 0.5, opacity: 1, scale: 1, ease: "power2.inOut" });
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <BackgroundTickers />
      <main className="content">
        <div className="text-content">
          <h1>Solana's Rebel Dog</h1>
          <div className="animated-text-wrapper">
            <span ref={textRef} className={`animated-text ${isYellow ? 'yellow-text' : ''}`}>{displayText}</span>
          </div>
          <h2>Rebel Dog on Solana.</h2>
          <CoolButton />
        </div>
        <div
          className={`image-container ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          <img src="/main.jpeg" alt="Rebel Dog" />
          <canvas ref={canvasRef} className="particle-canvas" />
          <div className="social-icon icon-twitter"></div>
          <div className="social-icon icon-instagram"></div>
        </div>
      </main>
    </div>
  );
};

export default Main;

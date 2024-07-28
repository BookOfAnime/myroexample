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
    const instances = Math.ceil(containerWidth / itemWidth) * 2 + 1;
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

const CoolButton = React.forwardRef((props, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      ref={ref}
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
});

const BouncingCircle = ({ imageSrc, size, glowColor }) => {
  const circleRef = useRef(null);
  const [position, setPosition] = useState({ 
    x: Math.random() * (window.innerWidth - size), 
    y: Math.random() * (window.innerHeight - size) 
  });
  const [velocity, setVelocity] = useState({ 
    x: (Math.random() - 0.5) * 1.5, 
    y: (Math.random() - 0.5) * 1.5 
  });

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setPosition(prevPos => {
        let newX = prevPos.x + velocity.x * 0.01;
        let newY = prevPos.y + velocity.y * 0.01;
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        if (newX <= 0 || newX >= window.innerWidth - size) {
          newVelocityX = -newVelocityX;
          newX = Math.max(0, Math.min(newX, window.innerWidth - size));
        }
        if (newY <= 0 || newY >= window.innerHeight - size) {
          newVelocityY = -newVelocityY;
          newY = Math.max(0, Math.min(newY, window.innerHeight - size));
        }

        setVelocity({ x: newVelocityX, y: newVelocityY });

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, velocity]);

  return (
    <div 
      ref={circleRef}
      className="bouncing-circle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundImage: `url(${imageSrc})`,
        boxShadow: `0 0 20px ${glowColor}`
      }}
    />
  );
};

const Main = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const buttonRef = useRef(null);
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

  useEffect(() => {
    gsap.set([welcomeTextRef.current, h1Ref.current, textRef.current, h2Ref.current, buttonRef.current], { 
      opacity: 0, 
      y: 50 
    });

    const tl = gsap.timeline();
    tl.to(welcomeTextRef.current, { duration: 1, opacity: 1, y: 0, ease: 'power3.out' })
      .to(h1Ref.current, { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.5')
      .to(textRef.current, { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.5')
      .to(h2Ref.current, { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.5')
      .to(buttonRef.current, { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.5');
  }, []);

  return (
    <div className="main-container">
      <BackgroundTickers />
      <main className="content">
        <div className="text-content">
          <h1 className="welcome-text" ref={welcomeTextRef}>Welcome To</h1>
          <h1 ref={h1Ref}>Solana's Rebel Dog</h1>
          <div className="animated-text-wrapper">
            <span ref={textRef} className={`animated-text ${isYellow ? 'yellow-text' : ''}`}>{displayText}</span>
          </div>
          <h2 ref={h2Ref}>Rebel Dog on Solana.</h2>
          <CoolButton ref={buttonRef} />
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
      <BouncingCircle imageSrc="/together.png" size={80} glowColor="#ff0000" />
      <BouncingCircle imageSrc="/green.png" size={60} glowColor="#00ff00" />
      <BouncingCircle imageSrc="/char.png" size={100} glowColor="#0000ff" />
      <BouncingCircle imageSrc="/DOBS.png" size={70} glowColor="#ffff00" />
    </div>
  );
};

export default Main;
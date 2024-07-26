import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './Main.css';

gsap.registerPlugin(TextPlugin);

const InfiniteLooper = ({ speed, direction, children }) => {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const resetAnimation = () => {
    if (innerRef?.current) {
      innerRef.current.setAttribute("data-animate", "false");
      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute("data-animate", "true");
        }
      }, 10);
    }
  };

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();
    const { width: parentWidth } = outerRef.current.getBoundingClientRect();
    const widthDeficit = parentWidth - width;
    const instanceWidth = width / innerRef.current.children.length;

    if (widthDeficit) {
      setLooperInstances(
        looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
      );
    }

    resetAnimation();
  }, [looperInstances]);

  useEffect(() => setupInstances(), [setupInstances]);

  useEffect(() => {
    window.addEventListener("resize", setupInstances);
    return () => {
      window.removeEventListener("resize", setupInstances);
    };
  }, [looperInstances, setupInstances]);

  return (
    <div className="looper" ref={outerRef}>
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => (
          <div
            key={ind}
            className="looper__listInstance"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

const Main = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = cardRef.current.offsetWidth;
      canvas.height = cardRef.current.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
      particles.current.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particles.current.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !canvasRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const tiltX = (y - 0.5) * 10;
    const tiltY = (x - 0.5) * -10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const shadowX = 30 * (x - 0.5);
    const shadowY = 30 * (y - 0.5);
    const hue = (x * 360) | 0;
    cardRef.current.style.boxShadow = `
      ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.5),
      0 0 70px 30px hsla(${hue}, 100%, 50%, 0.7)
    `;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = 0; i < 5; i++) {
      particles.current.push(new Particle(mouseX, mouseY));
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      cardRef.current.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }
    setIsHovered(false);
  };

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(textRef.current, {
      duration: 1,
      text: { value: "$DOBS", delimiter: "" },
      ease: "none",
      onStart: () => {
        textRef.current.classList.remove('bliss-text');
        textRef.current.classList.add('dobs-text');
      },
    })
    .to(textRef.current, {
      duration: 1,
      text: { value: "bliss", delimiter: "" },
      ease: "none",
      delay: 2,
      onStart: () => {
        textRef.current.classList.remove('dobs-text');
        textRef.current.classList.add('bliss-text');
      },
    });
  }, []);

  return (
    <div className="main-container">
      <main className="content">
        <div 
          className={`image-container ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          <img src="/main.jpeg" alt="Rebel Dog" />
          <canvas ref={canvasRef} className="particle-canvas" />
        </div>
        <div className="text-content">
          <h1>
            Matt Furie's <span ref={textRef} className="bliss-text">bliss</span>
          </h1>
          <h2>Rebel Dog on Solana.</h2>
        </div>
      </main>
      <InfiniteLooper speed={10} direction="left">
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
        <div className="ticker__item">$DOBS</div>
      </InfiniteLooper>
    </div>
  );
};

export default Main;
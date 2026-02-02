import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const HeroSection = () => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hero-glass-container glass-card"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="cake-emoji"
        >
          🎁
        </motion.div>
        <h1 className="hero-title">
          Happy Birthday,<br />
          <span className="name-highlight">Siri</span>
        </h1>
        <p className="hero-subtitle">Bonded since 2021 – Distance changes nothing 🌍✨</p>
        <Link to="/gallery" style={{ display: 'inline-block', textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Explore Our Memories
          </motion.button>
        </Link>
      </motion.div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-section {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #fff5f5;
          overflow: hidden;
          position: relative;
          padding: 20px;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(238,156,167,0.2) 0%, transparent 70%);
          top: -50%;
          left: -50%;
          animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-glass-container {
          padding: 2rem 1.5rem;
          max-width: 900px;
          position: relative;
          z-index: 2;
          width: 90%;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .hero-glass-container {
            padding: 4rem 3rem;
          }
        }
        .cake-emoji {
          font-size: clamp(3rem, 8vw, 4.5rem);
          margin-bottom: 1.5rem;
          display: inline-block;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.5rem, 10vw, 6rem);
          margin-bottom: 1rem;
          color: var(--text-dark);
          line-height: 1.1;
        }
        .name-highlight {
          font-family: 'Caveat', cursive;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.3em;
          display: block;
          margin: 0.5rem 0;
          filter: drop-shadow(2px 4px 10px rgba(0,0,0,0.1));
        }
        .hero-subtitle {
          font-size: clamp(0.9rem, 4vw, 1.4rem);
          color: var(--text-soft);
          margin-bottom: 2.5rem;
          font-weight: 500;
          padding: 0 10px;
        }
      `}} />
    </section>
  );
};

export default HeroSection;

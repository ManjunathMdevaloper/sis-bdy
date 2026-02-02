import React from 'react';
import { motion } from 'framer-motion';

const Note = () => {
  return (
    <div className="section-padding container note-page">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="note-container glass-card"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="sparkle-bg"
        >
          ✨
        </motion.div>
        <h1 className="note-title">From My Heart</h1>
        <div className="note-body">
          <p>Dearest Siri,</p>
          <p>
            When we met in 2021, I had no idea how much my life was about to change.
            Those 2.6 years we spent together were not just time—they were a collection of
            the most beautiful 'lifetime memories' I could ever ask for.
          </p>
          <p>
            Distance has kept us far since 2023, but it has never touched our bond.
            Whether we are laughing until our stomachs hurt, fighting over the silliest things,
            or supporting each other through it all, you have shown me a love that is deeper than blood.
          </p>
          <p>
            You are simply the best in the world. Thank you for every second of your time and love.
            No matter where life takes us, remember—I’m always here, and I'll love you forever.
          </p>
          <p className="signature">Happy Birthday, Siri! 🎂🌸</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="final-heart"
        >
          ❤️
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .note-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 200px);
        }
        .note-container {
          padding: 2.5rem 1.5rem;
          max-width: 800px;
          text-align: center;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        @media (min-width: 768px) {
          .note-container {
            padding: 5rem 3rem;
          }
        }
        .note-title {
          font-family: 'Outfit', sans-serif;
          color: var(--accent-color);
          font-size: clamp(2.5rem, 8vw, 4rem);
          margin-bottom: 2rem;
        }
        .note-body p {
          font-size: clamp(1.1rem, 4.5vw, 1.4rem);
          line-height: 1.8;
          margin-bottom: 25px;
          color: var(--text-dark);
          font-weight: 400;
        }
        .signature {
          font-weight: 700;
          margin-top: 40px;
          font-size: clamp(1.5rem, 6vw, 2.5rem);
          font-family: 'Caveat', cursive;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sparkle-bg {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 2rem;
          opacity: 0.3;
        }
        .final-heart {
          font-size: clamp(3rem, 10vw, 4rem);
          margin-top: 30px;
        }
      `}} />
    </div>
  );
};

export default Note;

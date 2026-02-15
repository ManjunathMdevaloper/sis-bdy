import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHeartOrgan } from 'react-icons/gi';

const Note = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="section-padding container note-page">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { duration: 0.8 } }}
            className="gate-container"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpened(true)}
              className="heart-trigger"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1, 1.25, 1],
                  filter: [
                    'drop-shadow(0 0 10px rgba(255, 107, 107, 0.2))',
                    'drop-shadow(0 0 30px rgba(255, 107, 107, 0.6))',
                    'drop-shadow(0 0 15px rgba(255, 107, 107, 0.3))',
                    'drop-shadow(0 0 40px rgba(255, 107, 107, 0.8))',
                    'drop-shadow(0 0 10px rgba(255, 107, 107, 0.2))'
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  times: [0, 0.1, 0.2, 0.4, 0.7],
                  ease: "easeInOut"
                }}
                className="trigger-icon"
              >
                <GiHeartOrgan color="var(--accent-color)" size={120} />
              </motion.div>
              <div className="trigger-text-container">
                <span className="trigger-text">open heart</span>
                <div className="heartbeat-line"></div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="note"
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
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
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .note-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 200px);
          perspective: 1500px;
        }
        .gate-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .heart-trigger {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
          transition: var(--transition-smooth);
        }
        .trigger-text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .trigger-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          color: var(--accent-color);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 4px;
          opacity: 0.9;
        }
        .heartbeat-line {
          width: 60px;
          height: 2px;
          background: var(--accent-color);
          position: relative;
          overflow: hidden;
          opacity: 0.3;
        }
        .heartbeat-line::after {
          content: '';
          position: absolute;
          left: -100%;
          width: 100%;
          height: 100%;
          background: white;
          animation: scan 1.2s infinite;
        }
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .note-container {
          padding: 2.5rem 1.5rem;
          max-width: 800px;
          text-align: center;
          position: relative;
          overflow: hidden;
          width: 100%;
          transform-style: preserve-3d;
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

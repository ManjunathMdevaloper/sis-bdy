import React, { useState, useRef } from 'react';
import { FiMusic, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import song from '../assets/song/bimbisara-song.m4a'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(e => {
          console.error("Audio play error:", e);
          alert("Click anywhere on the page first, then try the music button again!");
        });
    }
  };

  return (
    <div className="music-player">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="music-toggle glass-card"
      >
        {isPlaying ? <FiVolume2 /> : <FiVolumeX />}
        <span className="music-label">Birthday Music</span>
        {isPlaying && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="music-wave"
          >
            <FiMusic />
          </motion.span>
        )}
      </motion.button>
      <audio
        ref={audioRef}
        src={song}
        preload="auto"
        loop
      />
      <style dangerouslySetInnerHTML={{
        __html: `
        .music-player {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        .music-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
          font-weight: 600;
        }
        .music-label {
          font-size: 0.9rem;
        }
        .music-wave {
          color: var(--accent-color);
        }
        @media (max-width: 768px) {
          .music-label {
            display: none;
          }
        }
      `}} />
    </div>
  );
};

export default MusicPlayer;

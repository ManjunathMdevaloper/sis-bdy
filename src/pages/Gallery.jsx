import React from 'react';
import GalleryGrid from '../components/GalleryGrid';
import { motion } from 'framer-motion';

const Gallery = () => {
  return (
    <div className="section-padding container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title text-center">Capture The Joy</h1>
        <p className="page-subtitle text-center mb-5">Moments we've shared, memories we'll cherish.</p>
        <GalleryGrid />
      </motion.div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .page-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          color: var(--accent-color);
          margin-bottom: 10px;
        }
        .page-subtitle {
          font-size: clamp(1rem, 4vw, 1.25rem);
          opacity: 0.7;
          margin-bottom: 40px;
        }
        .text-center { text-align: center; }
        .mb-5 { margin-bottom: 3rem; }
      `}} />
    </div>
  );
};

export default Gallery;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiX, FiPlay, FiImage, FiVideo } from 'react-icons/fi';

// Import all images and videos from assets
const imagePaths = import.meta.glob('../assets/images/*.{jpg,jpeg,png,gif,webp}', { eager: true });
const videoPaths = import.meta.glob('../assets/videos/*.{mp4,webm,ogg}', { eager: true });

const GalleryGrid = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeFilter, setActiveFilter] = useState('image'); // 'image' or 'video'

  const mediaItems = useMemo(() => {
    const images = Object.keys(imagePaths).map((path, index) => ({
      id: `img-${index}`,
      url: imagePaths[path].default,
      title: `Memory ${index + 1}`,
      type: 'image'
    }));

    const videos = Object.keys(videoPaths).map((path, index) => ({
      id: `vid-${index}`,
      url: videoPaths[path].default,
      title: `Video ${index + 1}`,
      type: 'video'
    }));

    return [...images, ...videos];
  }, []);

  const filteredItems = mediaItems.filter(item => item.type === activeFilter);

  return (
    <div className="gallery-container">
      {/* Premium Toggle Switch */}
      <div className="filter-wrapper">
        <div className="filter-toggle glass-card">
          <button
            className={`filter-btn ${activeFilter === 'image' ? 'active' : ''}`}
            onClick={() => setActiveFilter('image')}
          >
            <FiImage /> Photos
          </button>
          <button
            className={`filter-btn ${activeFilter === 'video' ? 'active' : ''}`}
            onClick={() => setActiveFilter('video')}
          >
            <FiVideo /> Videos
          </button>
          <motion.div
            className="filter-bg"
            animate={{ x: activeFilter === 'image' ? '0%' : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <motion.div
        layout
        className={`grid-layout ${activeFilter === 'video' ? 'video-grid' : ''}`}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedMedia(item)}
                className="gallery-item"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title} loading="lazy" />
                ) : (
                  <video src={item.url} muted preload="metadata" />
                )}
                <div className="overlay">
                  {item.type === 'image' ? (
                    <FiMaximize2 className="zoom-icon" />
                  ) : (
                    <FiPlay className="zoom-icon" />
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-media"
            >
              No {activeFilter}s added yet...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              layoutId={selectedMedia.id}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'image' ? (
                <img src={selectedMedia.url} alt={selectedMedia.title} />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="modal-video"
                />
              )}
              <button className="close-btn" onClick={() => setSelectedMedia(null)}>
                <FiX />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-container {
          padding: 20px 0;
        }
        .filter-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .filter-toggle {
          position: relative;
          display: flex;
          padding: 6px;
          gap: 5px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.4);
          width: 280px;
        }
        .filter-btn {
          position: relative;
          z-index: 2;
          flex: 1;
          padding: 12px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition-smooth);
        }
        .filter-btn.active {
          color: white;
        }
        .filter-bg {
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: 6px;
          width: calc(50% - 6px);
          background: var(--primary-gradient);
          border-radius: 50px;
          z-index: 1;
          box-shadow: 0 4px 10px rgba(238, 156, 167, 0.3);
        }
        .grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 15px;
        }
        @media (min-width: 480px) {
          .grid-layout {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }
        @media (min-width: 768px) {
          .video-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 900px;
            margin: 0 auto;
          }
        }
        .gallery-item {
          position: relative;
          height: 220px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: #f0f0f0;
          box-shadow: var(--shadow-soft);
        }
        @media (min-width: 768px) {
          .gallery-item {
            height: 350px;
          }
        }
        .gallery-item img, .gallery-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover img, .gallery-item:hover video {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(238, 156, 167, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }
        .gallery-item:hover .overlay {
          opacity: 1;
        }
        .zoom-icon {
          color: white;
          font-size: 2rem;
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2010;
          padding: 20px;
        }
        .modal-content {
          max-width: 95%;
          max-height: 95%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content img, .modal-video {
          max-width: 100%;
          max-height: 85vh;
          display: block;
          object-fit: contain;
        }
        .modal-video {
          width: 100%;
          background: black;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.5rem;
          color: var(--text-dark);
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          z-index: 10;
        }
        .no-media {
          grid-column: 1 / -1;
          text-align: center;
          font-style: italic;
          opacity: 0.6;
          padding: 80px 20px;
          font-size: 1.2rem;
        }
      `}} />
    </div>
  );
};

export default GalleryGrid;

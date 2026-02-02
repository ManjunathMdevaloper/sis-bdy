import React from 'react';
import { motion } from 'framer-motion';

const MessageCard = ({ text, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      viewport={{ once: true }}
      className="message-card glass-card"
    >
      <div className="quote-icon">“</div>
      <p className="message-text">{text}</p>
      <div className="card-footer">
        <span className="heart-icon">💖</span>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .message-card {
          padding: 40px;
          margin-bottom: 30px;
          position: relative;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .quote-icon {
          font-size: 5rem;
          color: var(--accent-color);
          opacity: 0.2;
          position: absolute;
          top: 10px;
          left: 20px;
          line-height: 1;
        }
        .message-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--text-dark);
          position: relative;
          z-index: 1;
          font-weight: 500;
        }
        .card-footer {
          margin-top: 20px;
          text-align: right;
        }
        .heart-icon {
          font-size: 1.5rem;
        }
      `}} />
    </motion.div>
  );
};

export default MessageCard;

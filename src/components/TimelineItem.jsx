import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ year, wish, side, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className={`timeline-item ${side}`}
        >
            <div className="timeline-content glass-card">
                <h3 className="year">{year}</h3>
                <p className="wish-text">{wish}</p>
            </div>
            <div className="timeline-dot"></div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: 50%;
          position: relative;
          margin-bottom: 40px;
          width: 100%;
        }
        .timeline-item.right {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: 50%;
        }
        .timeline-content {
          width: 80%;
          padding: 20px;
          position: relative;
        }
        .timeline-dot {
          width: 20px;
          height: 20px;
          background: var(--accent-color);
          border-radius: 50%;
          position: absolute;
          right: -10px;
          top: 20px;
          z-index: 2;
          box-shadow: 0 0 10px var(--accent-color);
        }
        .timeline-item.right .timeline-dot {
          left: -10px;
          right: auto;
        }
        .year {
          color: var(--accent-color);
          margin-bottom: 5px;
        }
        .wish-text {
          font-size: 1rem;
          color: var(--text-dark);
        }
        @media (max-width: 768px) {
          .timeline-item {
            justify-content: flex-start;
            padding-left: 40px;
            padding-right: 0;
          }
          .timeline-item.right {
            padding-left: 40px;
          }
          .timeline-content {
            width: 100%;
          }
          .timeline-dot {
            left: -10px !important;
            right: auto !important;
          }
        }
      `}} />
        </motion.div>
    );
};

export default TimelineItem;

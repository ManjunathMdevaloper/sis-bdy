import React from 'react';
import TimelineItem from '../components/TimelineItem';
import { motion } from 'framer-motion';

const wishesData = [
  { year: "2021", wish: "The year our stars crossed in college. I didn't know then that I'd found a sister for life." },
  { year: "2021 - 2023", wish: "2.6 years of pure magic. Every fight, every laugh, and every memory we built is frozen in time." },
  { year: "2023", wish: "The distance tried to separate us, but it only made our bond stronger. Miles apart, but soul-to-soul." },
  { year: "The Bonding", wish: "Fighting like kids, loving more than siblings. You truly are the best in the entire world, Siri." },
  { year: "Today", wish: "Happy Birthday! No matter where we are, I'm always standing right behind you. Love you forever! 🎂" }
];

const Wishes = () => {
  return (
    <div className="section-padding container">
      <h1 className="text-center mb-5" style={{ color: 'var(--accent-color)', fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}>Our Timeline</h1>
      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        {wishesData.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            wish={item.wish}
            side={index % 2 === 0 ? 'left' : 'right'}
            delay={index * 0.1}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .timeline-wrapper {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--accent-color);
          opacity: 0.3;
          transform: translateX(-50%);
        }
        @media (max-width: 768px) {
          .timeline-line {
            left: 30px;
          }
        }
        .text-center { text-align: center; }
        .mb-5 { margin-bottom: 3rem; }
      `}} />
    </div>
  );
};

export default Wishes;

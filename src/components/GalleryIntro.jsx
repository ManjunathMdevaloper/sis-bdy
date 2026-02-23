import React, { useState, useEffect } from 'react';

/*
  Auto-play Theater Curtain reveal for the Gallery page.
  Timeline (no click needed):
  0.0s → Curtains show with title + camera emoji
  1.4s → Curtains begin sliding apart (left & right)
  2.6s → Gallery is fully revealed, overlay unmounts
*/

const GalleryIntro = ({ onDone }) => {
    const [open, setOpen] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setOpen(true), 1400); // curtains open
        const t2 = setTimeout(() => {
            setGone(true);
            onDone();
        }, 2800); // unmount
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (gone) return null;

    return (
        <div className="gi-root">

            {/* ── LEFT CURTAIN ── */}
            <div className="gi-curtain gi-left" style={{ transform: open ? 'translateX(-100%)' : 'translateX(0)' }}>
                {/* vertical fabric folds */}
                <div className="gi-folds">
                    {[...Array(5)].map((_, i) => <div key={i} className="gi-fold" />)}
                </div>
                {/* swag at top */}
                <div className="gi-swag gi-swag-left" />
            </div>

            {/* ── RIGHT CURTAIN ── */}
            <div className="gi-curtain gi-right" style={{ transform: open ? 'translateX(100%)' : 'translateX(0)' }}>
                <div className="gi-folds">
                    {[...Array(5)].map((_, i) => <div key={i} className="gi-fold" />)}
                </div>
                <div className="gi-swag gi-swag-right" />
            </div>

            {/* ── TOP PELMET (valance bar) ── */}
            <div className="gi-pelmet" style={{ opacity: open ? 0 : 1 }} />

            {/* ── CENTRE LABEL (fades as curtains open) ── */}
            <div className="gi-label" style={{ opacity: open ? 0 : 1 }}>
                <div className="gi-camera">📸</div>
                <h2 className="gi-title">Our Memories</h2>
                <p className="gi-sub">Opening the album...</p>
            </div>

            <style>{`
        .gi-root {
          position: fixed;
          inset: 0;
          z-index: 500;
          pointer-events: none;
          overflow: hidden;
        }

        /* ── CURTAINS ── */
        .gi-curtain {
          position: absolute;
          top: 0; bottom: 0;
          width: 52%;           /* slight overlap at center */
          transition: transform 1.15s cubic-bezier(0.77, 0, 0.175, 1);
          overflow: hidden;
        }
        .gi-left  { left: 0; }
        .gi-right { right: 0; }

        /* Rich velvet gradient */
        .gi-left {
          background: linear-gradient(
            170deg,
            #c0165a 0%,
            #e8266e 25%,
            #ff5c8d 55%,
            #e8266e 80%,
            #c0165a 100%
          );
        }
        .gi-right {
          background: linear-gradient(
            190deg,
            #c0165a 0%,
            #e8266e 25%,
            #ff5c8d 55%,
            #e8266e 80%,
            #c0165a 100%
          );
        }

        /* Fabric folds (vertical stripes) */
        .gi-folds {
          position: absolute;
          inset: 0;
          display: flex;
        }
        .gi-fold {
          flex: 1;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.12) 0%,
            rgba(255,255,255,0.08) 40%,
            rgba(0,0,0,0.12) 100%
          );
        }
        /* Shimmer sheen */
        .gi-curtain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.15) 0%,
            transparent 50%,
            rgba(0,0,0,0.08) 100%
          );
          pointer-events: none;
        }

        /* ── SWAG (curved top edge) ── */
        .gi-swag {
          position: absolute;
          top: 0;
          width: 110%;
          height: 60px;
          background: #a80e49;
          border-radius: 0 0 50% 50%;
          z-index: 2;
        }
        .gi-swag-left  { left: -5%; }
        .gi-swag-right { right: -5%; }

        /* ── PELMET (top bar across full width) ── */
        .gi-pelmet {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 56px;
          background: linear-gradient(90deg, #a80e49 0%, #d01560 50%, #a80e49 100%);
          box-shadow: 0 6px 24px rgba(168,14,73,0.55);
          z-index: 10;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        /* Gold trim line on pelmet */
        .gi-pelmet::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f5c842, #ffe07a, #f5c842);
        }

        /* ── CENTRE LABEL ── */
        .gi-label {
          position: absolute;
          z-index: 20;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .gi-camera {
          font-size: clamp(3rem, 9vw, 5rem);
          animation: gi-cam-pulse 1s ease-in-out infinite alternate;
          line-height: 1;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3));
        }
        @keyframes gi-cam-pulse {
          from { transform: scale(1) rotate(-5deg); }
          to   { transform: scale(1.1) rotate(5deg); }
        }
        .gi-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(2rem, 7vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          text-shadow: 0 3px 18px rgba(0,0,0,0.35);
          margin: 0 0 0.35rem;
          letter-spacing: 1px;
        }
        .gi-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.85rem, 3vw, 1.1rem);
          color: rgba(255,255,255,0.88);
          letter-spacing: 2px;
          animation: gi-dots 1.2s ease-in-out infinite alternate;
        }
        @keyframes gi-dots {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default GalleryIntro;

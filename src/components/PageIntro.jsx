import React, { useState, useEffect } from 'react';

/*
  Reusable theater-curtain auto-reveal.
  Props:
    emoji    — center emoji shown before curtains open
    title    — big heading
    sub      — small subtitle line
    color    — hex base color for the curtain (default deep pink)
    onDone() — called when animation is finished
*/

const PageIntro = ({
    emoji = '✨',
    title = 'Welcome',
    sub = 'Opening...',
    color = '#c0165a',
    onDone,
}) => {
    const [open, setOpen] = useState(false);
    const [gone, setGone] = useState(false);

    // Derive lighter/darker shades from base color via CSS mix
    const colorLight = color;

    useEffect(() => {
        const t1 = setTimeout(() => setOpen(true), 1300);
        const t2 = setTimeout(() => { setGone(true); onDone(); }, 2700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []); // eslint-disable-line

    if (gone) return null;

    const curtainStyle = (side) => ({
        background: `linear-gradient(
      ${side === 'left' ? '170deg' : '190deg'},
      ${color}cc 0%,
      ${color} 30%,
      ${color}ee 60%,
      ${color}bb 100%
    )`,
        transform: open
            ? side === 'left' ? 'translateX(-100%)' : 'translateX(100%)'
            : 'translateX(0)',
    });

    return (
        <div className="pi-root">

            {/* LEFT CURTAIN */}
            <div className="pi-curtain pi-left" style={curtainStyle('left')}>
                <div className="pi-folds">{[...Array(5)].map((_, i) => <div key={i} className="pi-fold" />)}</div>
                <div className="pi-swag pi-swag-left" style={{ background: `${color}` }} />
            </div>

            {/* RIGHT CURTAIN */}
            <div className="pi-curtain pi-right" style={curtainStyle('right')}>
                <div className="pi-folds">{[...Array(5)].map((_, i) => <div key={i} className="pi-fold" />)}</div>
                <div className="pi-swag pi-swag-right" style={{ background: `${color}` }} />
            </div>

            {/* TOP PELMET */}
            <div className="pi-pelmet" style={{ background: color, opacity: open ? 0 : 1 }} />

            {/* CENTRE LABEL */}
            <div className="pi-label" style={{ opacity: open ? 0 : 1 }}>
                <div className="pi-emoji">{emoji}</div>
                <h2 className="pi-title">{title}</h2>
                <p className="pi-sub">{sub}</p>
            </div>

            <style>{`
        .pi-root {
          position: fixed;
          inset: 0;
          z-index: 500;
          pointer-events: none;
          overflow: hidden;
        }

        /* CURTAINS */
        .pi-curtain {
          position: absolute;
          top: 0; bottom: 0;
          width: 52%;
          transition: transform 1.15s cubic-bezier(0.77, 0, 0.175, 1);
          overflow: hidden;
        }
        .pi-left  { left: 0; }
        .pi-right { right: 0; }

        /* shimmer sheen */
        .pi-curtain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.18) 0%,
            transparent 50%,
            rgba(0,0,0,0.1) 100%
          );
          pointer-events: none;
        }

        /* fabric folds */
        .pi-folds {
          position: absolute;
          inset: 0;
          display: flex;
        }
        .pi-fold {
          flex: 1;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.14) 0%,
            rgba(255,255,255,0.09) 40%,
            rgba(0,0,0,0.14) 100%
          );
        }

        /* SWAG (curved top) */
        .pi-swag {
          position: absolute;
          top: 0;
          width: 110%;
          height: 58px;
          border-radius: 0 0 50% 50%;
          z-index: 2;
          filter: brightness(0.78);
        }
        .pi-swag-left  { left: -5%; }
        .pi-swag-right { right: -5%; }

        /* PELMET */
        .pi-pelmet {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 54px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.3);
          z-index: 10;
          transition: opacity 0.35s ease;
          pointer-events: none;
          filter: brightness(0.8);
        }
        .pi-pelmet::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f5c842, #ffe07a, #f5c842);
        }

        /* CENTRE LABEL */
        .pi-label {
          position: absolute;
          z-index: 20;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          transition: opacity 0.35s ease;
          width: 80vw;
        }
        .pi-emoji {
          font-size: clamp(3rem, 9vw, 5rem);
          line-height: 1;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3));
          animation: pi-emoji-pulse 1s ease-in-out infinite alternate;
        }
        @keyframes pi-emoji-pulse {
          from { transform: scale(1) rotate(-4deg); }
          to   { transform: scale(1.1) rotate(4deg); }
        }
        .pi-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(2rem, 7vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          text-shadow: 0 3px 18px rgba(0,0,0,0.35);
          margin: 0 0 0.35rem;
          letter-spacing: 1px;
        }
        .pi-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.85rem, 3vw, 1.1rem);
          color: rgba(255,255,255,0.88);
          letter-spacing: 2px;
          animation: pi-pulse 1.2s ease-in-out infinite alternate;
          margin: 0;
        }
        @keyframes pi-pulse { from { opacity: 0.6; } to { opacity: 1; } }
      `}</style>
        </div>
    );
};

export default PageIntro;

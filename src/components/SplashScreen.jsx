import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('waiting'); // waiting → scissors → cut → open → done
  const timersRef = useRef([]);

  const fireBlast = () => {
    // Centre burst
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#ff6b6b', '#ff9a9e', '#fecfef', '#fff', '#feb47b', '#ff5c8d', '#ffdd67'],
      startVelocity: 55,
      ticks: 120,
      zIndex: 9998,
      scalar: 1.1,
    });
    // Left cannon
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors: ['#ff6b6b', '#fecfef', '#fff', '#ffdd67'],
      startVelocity: 60,
      zIndex: 9998,
    });
    // Right cannon
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors: ['#ff6b6b', '#fecfef', '#fff', '#ffdd67'],
      startVelocity: 60,
      zIndex: 9998,
    });
    // Second pulse after 350ms for layered effect
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff9a9e', '#fff', '#feb47b', '#ffd700'],
        startVelocity: 40,
        ticks: 90,
        zIndex: 9998,
        scalar: 0.85,
      });
    }, 350);
  };

  const fireGrandBlast = () => {
    // Massive centre explosion
    confetti({
      particleCount: 220,
      spread: 140,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#ff6b6b', '#ff9a9e', '#fecfef', '#fff', '#feb47b', '#ff5c8d', '#ffdd67', '#ffd700'],
      startVelocity: 70,
      ticks: 200,
      zIndex: 9998,
      scalar: 1.2,
    });
    // Left side fountain
    confetti({
      particleCount: 100,
      angle: 55,
      spread: 80,
      origin: { x: 0.05, y: 0.5 },
      colors: ['#ff6b6b', '#fff', '#ffd700', '#fecfef'],
      startVelocity: 75,
      ticks: 180,
      zIndex: 9998,
    });
    // Right side fountain
    confetti({
      particleCount: 100,
      angle: 125,
      spread: 80,
      origin: { x: 0.95, y: 0.5 },
      colors: ['#ff6b6b', '#fff', '#ffd700', '#fecfef'],
      startVelocity: 75,
      ticks: 180,
      zIndex: 9998,
    });
    // Continuous shower for 3 seconds over the home page
    const end = Date.now() + 3000;
    const shower = setInterval(() => {
      if (Date.now() > end) { clearInterval(shower); return; }
      confetti({
        particleCount: 18,
        spread: 100,
        origin: { x: Math.random(), y: -0.05 },
        colors: ['#ff6b6b', '#ffb3c1', '#fff', '#ffd700', '#feb47b'],
        startVelocity: 20,
        ticks: 160,
        gravity: 0.8,
        zIndex: 9998,
        scalar: 0.9,
      });
    }, 120);
  };

  const handleOpen = () => {
    if (phase !== 'waiting') return;
    fireBlast();          // instant blast on click
    setPhase('scissors');

    const t1 = setTimeout(() => setPhase('cut'), 1600);
    // Fire grand celebration exactly when panels slide open
    const t2 = setTimeout(() => { setPhase('open'); fireGrandBlast(); }, 2200);
    const t3 = setTimeout(() => { setPhase('done'); onComplete(); }, 3600);

    timersRef.current = [t1, t2, t3];
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const ribbonCut = phase === 'cut' || phase === 'open' || phase === 'done';
  const panelsOpen = phase === 'open' || phase === 'done';

  return (
    <div className="sp-root">

      {/* ── LEFT PANEL ── */}
      <div className="sp-panel sp-left" style={{ transform: panelsOpen ? 'translateX(-100%)' : 'translateX(0)' }}>
        {/* Word pushed all the way to the LEFT edge */}
        <div className="sp-panel-inner sp-inner-left">
          <span className="sp-star">✦</span>
          <p className="sp-panel-word">Happy</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="sp-panel sp-right" style={{ transform: panelsOpen ? 'translateX(100%)' : 'translateX(0)' }}>
        {/* Word pushed all the way to the RIGHT edge */}
        <div className="sp-panel-inner sp-inner-right">
          <p className="sp-panel-word">Birthday!</p>
          <span className="sp-star">✦</span>
        </div>
      </div>

      {/* ── CENTRE TITLE CARD ── */}
      <div
        className="sp-title"
        style={{ opacity: panelsOpen ? 0 : 1, pointerEvents: panelsOpen ? 'none' : 'auto' }}
      >
        <div className="sp-cake">🎂</div>
        <h1 className="sp-h1">A Special Surprise</h1>
        <p className="sp-sub">Just for you, Sis ✨</p>

        {phase === 'waiting' && (
          <button className="sp-btn" onClick={handleOpen}>
            🎀 Click to Open
          </button>
        )}
        {phase === 'scissors' && (
          <p className="sp-cutting-text">✂ Cutting the ribbon...</p>
        )}
      </div>

      {/* ── RIBBON + SCISSORS ── */}
      <div className="sp-ribbon-row">
        <div className="sp-ribbon sp-ribbon-left"
          style={{ transform: ribbonCut ? 'scaleX(0)' : 'scaleX(1)', opacity: ribbonCut ? 0 : 1 }}
        />
        <div className="sp-ribbon sp-ribbon-right"
          style={{ transform: ribbonCut ? 'scaleX(0)' : 'scaleX(1)', opacity: ribbonCut ? 0 : 1 }}
        />
        <div className="sp-bow"
          style={{ transform: ribbonCut ? 'scale(0)' : 'scale(1)', opacity: ribbonCut ? 0 : 1 }}
        >🎀</div>

        <div className="sp-scissors" style={{
          left: phase === 'waiting' ? '-10%' : phase === 'scissors' ? '50%' : '110%',
          opacity: phase === 'waiting' ? 0 : 1,
        }}>✂</div>

        {ribbonCut && (
          <div className="sp-sparks">
            {['✨', '💫', '🌟', '⭐', '✨', '💫'].map((s, i) => (
              <span key={i} className={`sp-spark sp-spark-${i}`}>{s}</span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .sp-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
        }

        /* ── PANELS ── */
        .sp-panel {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          display: flex;
          align-items: center;
          overflow: hidden;
          transition: transform 1.3s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .sp-left {
          left: 0;
          justify-content: flex-start;   /* text sticks LEFT */
          background: linear-gradient(150deg, #ff5c7a 0%, #ff8fa3 45%, #ffb8c8 100%);
        }
        .sp-right {
          right: 0;
          justify-content: flex-end;     /* text sticks RIGHT */
          background: linear-gradient(210deg, #ff5c7a 0%, #ff8fa3 45%, #ffb8c8 100%);
        }
        /* dot texture */
        .sp-panel::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px);
          background-size: 26px 26px;
          pointer-events: none;
        }
        /* glow circle */
        .sp-panel::after {
          content: '';
          position: absolute;
          width: 80vw; height: 80vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .sp-left::after  { right: -30vw; top: 50%; transform: translateY(-50%); }
        .sp-right::after { left: -30vw;  top: 50%; transform: translateY(-50%); }

        /* Panel inner — pushed to outer edges */
        .sp-panel-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 1;
        }
        /* LEFT: pad from the very left edge of screen */
        .sp-inner-left {
          padding-left: clamp(1rem, 4vw, 3rem);
          align-items: flex-start;
        }
        /* RIGHT: pad from the very right edge of screen */
        .sp-inner-right {
          padding-right: clamp(1rem, 4vw, 3rem);
          align-items: flex-end;
        }

        .sp-panel-word {
          font-family: 'Caveat', cursive;
          font-size: clamp(2.6rem, 8vw, 6rem);
          font-weight: 700;
          color: #fff;
          text-shadow: 0 3px 20px rgba(140,10,40,0.4), 0 1px 5px rgba(0,0,0,0.2);
          letter-spacing: -1px;
          line-height: 1;
          margin: 0;
          white-space: nowrap;
        }
        .sp-star {
          font-size: clamp(1rem, 3vw, 1.8rem);
          color: rgba(255,255,255,0.75);
          animation: sp-spin 5s linear infinite;
          display: block;
        }
        @keyframes sp-spin { to { transform: rotate(360deg); } }

        /* ── CENTRE TITLE CARD ── */
        .sp-title {
          position: absolute;
          z-index: 200;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          /* keep it narrow so panel words are visible on both sides */
          width: clamp(200px, 60vw, 340px);
          padding: 1.6rem 1.4rem 1.4rem;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.55);
          border-radius: 24px;
          box-shadow: 0 12px 50px rgba(255,60,100,0.28), 0 2px 8px rgba(0,0,0,0.08);
          transition: opacity 0.4s ease;
          animation: sp-card-in 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes sp-card-in {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.88); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }

        .sp-cake {
          font-size: clamp(2rem, 7vw, 3.5rem);
          animation: sp-bounce 1.6s ease-in-out infinite alternate;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        @keyframes sp-bounce {
          from { transform: translateY(0); }
          to   { transform: translateY(-9px); }
        }
        .sp-h1 {
          font-family: 'Caveat', cursive;
          font-size: clamp(1.5rem, 5vw, 2.4rem);
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 14px rgba(160,20,55,0.6), 0 1px 4px rgba(0,0,0,0.22);
          margin: 0 0 0.3rem;
          line-height: 1.1;
        }
        .sp-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.8rem, 2.5vw, 1.05rem);
          color: rgba(255,255,255,0.95);
          text-shadow: 0 1px 8px rgba(160,20,55,0.4);
          letter-spacing: 1.2px;
          margin: 0 0 1rem;
        }

        /* Click to Open button */
        .sp-btn {
          display: inline-block;
          background: #fff;
          color: #d62b52;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.85rem, 2.8vw, 1.05rem);
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 0.75rem 1.8rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(214,43,82,0.35), 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: sp-btn-pulse 1.5s ease-in-out infinite alternate;
        }
        .sp-btn:hover  { transform: scale(1.06); box-shadow: 0 10px 32px rgba(214,43,82,0.5); }
        .sp-btn:active { transform: scale(0.96); }
        @keyframes sp-btn-pulse {
          from { box-shadow: 0 6px 24px rgba(214,43,82,0.35); }
          to   { box-shadow: 0 6px 36px rgba(214,43,82,0.6); }
        }

        .sp-cutting-text {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.82rem, 2.5vw, 0.98rem);
          color: rgba(255,255,255,0.92);
          letter-spacing: 1px;
          margin: 0;
          animation: sp-pulse 0.6s ease-in-out infinite alternate;
        }
        @keyframes sp-pulse { from { opacity: 0.6; } to { opacity: 1; } }

        /* ── RIBBON ROW ── */
        .sp-ribbon-row {
          position: absolute;
          /* sits below the title card */
          top: calc(50% + 120px);
          left: 0; right: 0;
          height: 52px;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        @media (max-height: 600px) {
          .sp-ribbon-row { top: calc(50% + 90px); }
        }

        .sp-ribbon {
          position: absolute;
          height: 48px;
          width: 50%;
          background: linear-gradient(180deg,
            #b8112f 0%, #d92042 15%, #ff4060 50%, #d92042 85%, #b8112f 100%);
          box-shadow:
            0 4px 22px rgba(185,17,47,0.55),
            inset 0 2px 0 rgba(255,255,255,0.35),
            inset 0 -2px 0 rgba(0,0,0,0.12);
          transition: transform 0.45s ease, opacity 0.45s ease;
        }
        .sp-ribbon::before {
          content: '';
          position: absolute;
          top: 10px; left: 0; right: 0;
          height: 3px;
          background: rgba(255,255,255,0.38);
          border-radius: 2px;
        }
        .sp-ribbon-left  { right: 50%; transform-origin: right center; }
        .sp-ribbon-right { left:  50%; transform-origin: left center; }

        .sp-bow {
          position: absolute;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          z-index: 51;
          filter: drop-shadow(0 4px 12px rgba(185,17,47,0.5));
          transition: transform 0.25s ease, opacity 0.25s ease;
          animation: sp-bow-pulse 1.2s ease-in-out infinite alternate;
        }
        @keyframes sp-bow-pulse {
          from { transform: scale(1); }
          to   { transform: scale(1.12); }
        }

        .sp-scissors {
          position: absolute;
          font-size: clamp(2rem, 6vw, 3.2rem);
          z-index: 55;
          transition: left 1.5s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;
          filter: drop-shadow(0 4px 14px rgba(0,0,0,0.3));
          transform: translateX(-50%) scaleX(-1) rotate(-45deg);
          line-height: 1;
        }

        /* Sparkles */
        .sp-sparks { position: absolute; pointer-events: none; z-index: 60; }
        .sp-spark {
          position: absolute;
          font-size: clamp(1rem, 3vw, 1.4rem);
          animation: sp-fly 0.9s ease-out forwards;
        }
        .sp-spark-0 { animation-delay:0.00s; --sx:-75px; --sy:-50px; }
        .sp-spark-1 { animation-delay:0.05s; --sx: 75px; --sy:-50px; }
        .sp-spark-2 { animation-delay:0.10s; --sx:-90px; --sy: 10px; }
        .sp-spark-3 { animation-delay:0.15s; --sx: 90px; --sy: 10px; }
        .sp-spark-4 { animation-delay:0.08s; --sx:-55px; --sy: 55px; }
        .sp-spark-5 { animation-delay:0.12s; --sx: 55px; --sy: 55px; }
        @keyframes sp-fly {
          from { transform:translate(0,0) scale(0); opacity:1; }
          60%  { opacity:1; }
          to   { transform:translate(var(--sx),var(--sy)) scale(1.4); opacity:0; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

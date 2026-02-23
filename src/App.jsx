import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages';
import Wishes from './pages/Wishes';
import Note from './pages/Note';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <Router>
      <>
        {/* Ribbon-cutting splash — always mounted first, unmounts after animation */}
        <AnimatePresence>
          {!splashDone && (
            <SplashScreen onComplete={() => setSplashDone(true)} />
          )}
        </AnimatePresence>

        {/* Main app content fades in after splash */}
        <motion.div
          className="app-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: splashDone ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FloatingHearts />
          <Navbar />
          <MusicPlayer />

          <div className="content-area">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                <Route path="/messages" element={<PageWrapper><Messages /></PageWrapper>} />
                <Route path="/wishes" element={<PageWrapper><Wishes /></PageWrapper>} />
                <Route path="/note" element={<PageWrapper><Note /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </div>

          <footer className="footer">
            <p>© 2026 Made with ❤️ for my Sister</p>
          </footer>
        </motion.div>
      </>
    </Router>
  );
}

export default App;

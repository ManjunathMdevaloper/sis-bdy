import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';
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
  return (
    <Router>
      <div className="app-main">
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

        <footer className="footer section-padding">
          <p>© 2026 Made with ❤️ for my Sister</p>
        </footer>

        <style dangerouslySetInnerHTML={{
          __html: `
          .app-main {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .content-area {
            flex: 1;
            padding-bottom: 100px; /* Space for navbar */
          }
          @media (min-width: 768px) {
            .content-area {
              padding-top: 80px;
              padding-bottom: 40px;
            }
          }
          .footer {
            text-align: center;
            opacity: 0.6;
            font-size: 0.9rem;
            padding: 40px 20px;
          }
        `}} />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiImage, FiMail, FiCalendar, FiHeart } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Gallery', path: '/gallery', icon: <FiImage /> },
    { name: 'Messages', path: '/messages', icon: <FiMail /> },
    { name: 'Wishes', path: '/wishes', icon: <FiCalendar /> },
    { name: 'Note', path: '/note', icon: <FiHeart /> },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container glass-card">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .navbar {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 95%;
          max-width: 450px;
        }
        .nav-container {
          padding: 10px 20px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 15px 35px rgba(255, 107, 107, 0.1);
        }
        .nav-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-link {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px 10px;
          color: var(--text-dark);
          font-size: 0.75rem;
          font-weight: 600;
          transition: var(--transition-smooth);
          opacity: 0.5;
        }
        .nav-link.active {
          opacity: 1;
          color: var(--accent-color);
        }
        .nav-icon {
          font-size: 1.4rem;
          margin-bottom: 2px;
        }
        .nav-underline {
          position: absolute;
          bottom: -8px;
          width: 6px;
          height: 6px;
          background: var(--accent-color);
          border-radius: 50%;
        }
        @media (min-width: 768px) {
          .navbar {
            top: 30px;
            bottom: auto;
            width: auto;
            max-width: none;
          }
          .nav-container {
            padding: 12px 40px;
          }
          .nav-links {
            gap: 40px;
          }
          .nav-text {
            display: block;
            margin-top: 2px;
          }
        }
      `}} />
    </nav>
  );
};

export default Navbar;

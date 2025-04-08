import { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import { User } from '@supabase/supabase-js';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import nft1 from './assets/nft11.jpeg';
import nft2 from './assets/nft2.jpeg';
import nft3 from './assets/nft3.jpeg';
import nft4 from './assets/nft4.jpeg';
import nft5 from './assets/nft5.jpeg';
import nft6 from './assets/nft6.jpeg';
import nft7 from './assets/nft7.jpeg';
import nft8 from './assets/nft8.png';
import nft9 from './assets/nft9.jpeg';
import nft10 from './assets/nft10.jpeg';
import nft12 from './assets/nft12.jpeg';
import nft13 from './assets/nft13.jpeg';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const checkUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error.message);
      setUser(null);
    } else {
      setUser(session?.user || null);
    }
  };

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });

    if (error) {
      console.error('Google login error:', error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-name">ScoutNFT</h1>
      </header>

      <main className="main-content">
        {user ? (
          <div className="welcome-container">
            <h2 className="welcome-title">Welcome, {user.email ? user.email : user.user_metadata?.name || "Scout"}!</h2>
            <p className="welcome-message">Explore the exciting world of digital collectibles.</p>
            <button className="logout-button" onClick={handleLogout}>Sign Out</button>
          </div>
        ) : (
          <div className="auth-container">
            <div className="nft-background-images">
              <div className="nft-bg nft-bg-1" style={{ backgroundImage: `url(${nft1})` }}></div>
              <div className="nft-bg nft-bg-2" style={{ backgroundImage: `url(${nft2})` }}></div>
              <div className="nft-bg nft-bg-3" style={{ backgroundImage: `url(${nft3})` }}></div>
              <div className="nft-bg nft-bg-4" style={{ backgroundImage: `url(${nft4})` }}></div>
              <div className="nft-bg nft-bg-5" style={{ backgroundImage: `url(${nft5})` }}></div>
              <div className="nft-bg nft-bg-6" style={{ backgroundImage: `url(${nft6})` }}></div>
              <div className="nft-bg nft-bg-7" style={{ backgroundImage: `url(${nft7})` }}></div>
              <div className="nft-bg nft-bg-8" style={{ backgroundImage: `url(${nft8})` }}></div>
              <div className="nft-bg nft-bg-9" style={{ backgroundImage: `url(${nft9})` }}></div>
              <div className="nft-bg nft-bg-10" style={{ backgroundImage: `url(${nft10})` }}></div>
              <div className="nft-bg nft-bg-12" style={{ backgroundImage: `url(${nft12})` }}></div>
              <div className="nft-bg nft-bg-13" style={{ backgroundImage: `url(${nft13})` }}></div>
            </div>
            <div className="auth-card">
              <div className="auth-card-content">
                <h2 className="auth-title">Sign In to ScoutNFT</h2>
                <p className="auth-subtitle">Unlock a universe of unique digital assets.</p>
                <button className="google-button" onClick={handleGoogleLogin}>
                  <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} ScoutNFT. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
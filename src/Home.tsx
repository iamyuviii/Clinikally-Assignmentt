
import React, { useRef } from 'react';
import { Autocomplete, AutocompleteHandle } from './Components/auto';
import './home.css';

export default function Home() {
  const autocompleteRef = useRef<AutocompleteHandle>(null);

  return (
    <main className="home-main dark-bg">
      <div className="background-overlay"></div>
      <div className="center-content">
        <div className="headline-badge">
          
        </div>
        <h1 className="main-headline">
        The Largest Real‑Time <br />
          <span className="main-headline-secondary">Product Search</span>
        </h1>
        <p className="main-subtitle">
        Discover products instantly as you type just seamless infinite scrolling.<br />
        just seamless infinite scrolling
        </p>
        <div className="search-bar-wrapper">
          <span className="search-icon">
            <svg width="22" height="22" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
          <div className="search-autocomplete">
            <Autocomplete ref={autocompleteRef} />
          </div>
        </div>
      </div>
    </main>
  );
}

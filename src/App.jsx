import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Buy from './components/Buy';
import SmoothScroll from './components/SmoothScroll';
import './App.css';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';

const App = () => {
  return (
    <SmoothScroll>
      <div className="app">
        <Header />
        <Hero />
        <About />
        <Buy />
        <Features />
        <Tokenomics />
      </div>
    </SmoothScroll>
  );
};

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Buy from './components/Buy';
import SmoothScroll from './components/SmoothScroll';
import './App.css';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import Main from './components/Main';
import FAQ from './components/FAQ';
import JoinMADMovement from './components/JoinMADMovement';
import Roadmap from './components/Roadmap';

const App = () => {
  return (
    // <SmoothScroll>
      <div className="app">
        <Header />
        <Main />
        {/* <Hero /> */}
        <About />
        <Buy />
        <Roadmap />
        {/* <Features /> */}
        <Tokenomics />
        <JoinMADMovement />
        <FAQ />
      </div>
    // </SmoothScroll>
  );
};

export default App;
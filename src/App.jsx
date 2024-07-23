import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
    </div>
  );
};

export default App;
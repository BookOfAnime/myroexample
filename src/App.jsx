import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import './App.css';
import Buy from './components/Buy';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
      <Buy />
    </div>
  );
};

export default App;
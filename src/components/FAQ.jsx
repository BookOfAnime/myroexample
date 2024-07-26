import React, { useState } from 'react';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    { question: "WHAT BLOCKCHAIN IS $MAD ON?", answer: "Answer here..." },
    { question: "WHAT'S THE TOKEN CONTRACT ADDRESS?", answer: "Answer here..." },
    { question: "ON WHICH EXCHANGES WILL BE MAD LISTED?", answer: "Answer here..." },
    { question: "WHAT'S THE VISION OF MAD?", answer: "Answer here..." },
    { question: "WHAT'S THE MAD VIP LIST?", answer: "Answer here..." },
    { question: "WHAT'S THE MAD PROMOTERS CLUB?", answer: "Answer here..." },
    { question: "WHAT ARE THE COMMUNITY QUESTS?", answer: "Answer here..." },
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-title">FAQ</h2>
      <div className="faq-content">
        <img src="/greenChar.png" alt="Character" className="faq-image" />
        <div className="faq-list">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
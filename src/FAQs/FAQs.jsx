import React, { useState } from 'react';
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Mobile Legends: Bang Bang?",
      answer: "Mobile Legends: Bang Bang is a multiplayer online battle arena (MOBA) game designed for mobile phones."
    },
    {
      question: "Is Mobile Legends free to play?",
      answer: "Yes, Mobile Legends is free to play with optional in-game purchases."
    },
    {
      question: "What are the different game modes in Mobile Legends?",
      answer: "The main modes are Classic, Rank, Brawl, and various special event modes."
    },
    {
      question: "How do ranks work in Mobile Legends?",
      answer: "Players progress through tiers from Warrior to Mythical Glory by earning stars through victories."
    },
    {
      question: "What are Emblems, and how do they work?",
      answer: "Emblems are customizable talent trees that provide stat bonuses and special effects for your heroes."
    },
    {
      question: "What is the current meta?",
      answer: "The meta changes with updates, but currently marksmen and strong early-game fighters dominate."
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h1>FAQs</h1>
        
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div 
              className="faq-question" 
              onClick={() => toggleAnswer(index)}
            >
              <h3>{faq.question}</h3>
              <span className={`dropdown-icon ${activeIndex === index ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
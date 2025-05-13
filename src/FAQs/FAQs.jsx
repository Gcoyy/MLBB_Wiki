import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "./FAQs.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs from Firestore
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const faqData = [];
        
        querySnapshot.forEach((doc) => {
          faqData.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // Sort FAQs by their order property
        faqData.sort((a, b) => a.order - b.order);
        setFaqs(faqData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching FAQs:", err);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="faq-container">
        <div className="faq-content">
          <h1>FAQs</h1>
          <p>Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faq-container">
        <div className="faq-content">
          <h1>FAQs</h1>
          <p className="error-message">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h1>FAQs</h1>
        
        {faqs.length === 0 ? (
          <p>No FAQs found in the database.</p>
        ) : (
          faqs.map((faq, index) => (
            <div className="faq-item" key={faq.id}>
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
          ))
        )}
      </div>
    </div>
  );
}

export default FAQ;
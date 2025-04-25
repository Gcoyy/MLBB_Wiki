import "./FAQs.css"
import { useState } from "react";

const faqs = [
    { question: "What is Mobile Legends: Bang Bang?", answer: "Mobile Legends is a 5v5 multiplayer online battle arena (MOBA) game." },
    { question: "Is Mobile Legends free to play?", answer: "Yes, Mobile Legends is free to play with optional in-game purchases." },
    { question: "What are the different game modes in Mobile Legends?", answer: "Game modes include Classic, Ranked, Brawl, Arcade, and more." },
    { question: "How do ranks work in Mobile Legends?", answer: "Players progress through ranks like Warrior, Elite, Master, Grandmaster, Epic, Legend, and Mythic by winning ranked matches." },
    { question: "What are Emblems, and how do they work?", answer: "Emblems provide bonus stats and abilities to heroes based on their roles." },
    { question: "What is the current meta?", answer: "The meta constantly changes, but it typically revolves around strong heroes, strategies, and team compositions in the latest patch." }
  ];

function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="FAQs">
        <h1 className="title">FAQs</h1>

        <hr />
        <div className="faq-container">
        {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            <hr />
            </div>
        ))}
        </div>
    </div>
  );
}    

export default FAQs
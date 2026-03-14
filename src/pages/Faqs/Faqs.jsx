import React, { useState } from 'react'
import './Faqs.css'

const Faqs = () => {

  const [activeIndex, setActiveIndex] = useState(-1);

  const faqData = [
    { 
      question: "Is available for online session?", 
      answer: "Yes! UNIMAS provides online counseling via Microsoft Teams for students who cannot attend in person." 
    },
    { 
      question: "Who can I book a session with?", 
      answer: "You can choose between experienced Lecturers or Trainee Counselors depending on your needs." 
    },
    { 
      question: "Is the service free?", 
      answer: "Yes, counseling services are free of charge for all registered UNIMAS students." 
    },
    { 
      question: "How do I cancel an appointment?", 
      answer: "You can cancel through the 'My Appointments' section at least 24 hours before the slot." 
    }
  ];

  const handleToggle = (index) => {
    // If you click the same one, close it. Otherwise, open the new one.
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className='faq-section' id='faq-section'>
      <h2 className="faq-title">FAQs</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button 
              className="faq-question-bar" 
              onClick={() => handleToggle(index)}
            >
              <span>{item.question}</span>
              <span className={`plus-icon ${activeIndex === index ? 'rotate' : ''}`}>
                +
              </span>
            </button>
            
            {/* This div only shows if activeIndex matches the item index */}
            {activeIndex === index && (
              <div className="faq-answer-content">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faqs
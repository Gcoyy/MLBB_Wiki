import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "./ContactUs.css";

function ContactUs() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        setContacts(contactData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return (
    <>
      <div className="contact-us-container">
        <div className="contact-us-content">
          <h1 className="contact-title">Contact Us</h1>
          <p>Loading contact information...</p>
        </div>
      </div>
    </>
  );

  if (error) return (
    <>
      <div className="contact-us-container">
        <div className="contact-us-content">
          <h1 className="contact-title">Contact Us</h1>
          <p className="error-message">Error: {error}</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="contact-us-container">
        <div className="contact-us-content">
          <h1 className="contact-title">Contact Us</h1>
          <h2 className="contact-subtitle">We'd love to hear from you! Reach out for inquiries, collaborations, or feedback</h2>
          <div className="cu-horizontal-line"></div>
          
          <div className="contact-methods">
            {contacts.length === 0 ? (
              <p>No contact information available</p>
            ) : (
              contacts.map((contact) => (
                <div className="contact-method" key={contact.id}>
                  <div className="icon-and-heading">
                    <img className="contact-icon" src={contact.icon} alt={contact.type} title={contact.type}/>
                    <h3>{contact.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</h3>
                  </div>
                  <p className="contact-description">{contact.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
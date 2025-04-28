import "./ContactUs.css";
import Header from "../Header/Header.jsx";
import React from "react";

function ContactUs() {
  return (
    <>
      <Header />
      <div className="ContactUs">
        <div className="contact-us-container">
          <h1>Contact Us</h1>
          <h2>We'd love to hear from you! Reach out for inquiries, collaborations, or feedback</h2>
          <br></br>
          <div className="cu-horizontal-line"></div>
<br></br>
          <div className="contact-us-content">
            <div className="contact-method">
              <div className="icon-and-heading">
                <div className="contact-icon">
                  <img src="Address.png" alt="Location" />
                </div>
                <h3>Silliman University,<br />College of Computer Studies</h3>
              </div><br></br>
              <p>→ Visit us at our university for inquiries and discussions.</p>
            </div>

            <div className="contact-method">
              <div className="icon-and-heading">
                <div className="contact-icon">
                  <img src="Phone.png" alt="Phone" />
                </div>
                <h3>09328764723<br />09948345321</h3>
              </div><br></br>
              <p>→ Call or text us for quick assistance and inquiries.</p>
            </div>

            <div className="contact-method">
              <div className="icon-and-heading">
                <div className="contact-icon">
                  <img src="Email.png" alt="Email" />
                </div>
                <h3>giancarlobdejesus@su.edu.ph<br />lancevillanueva@su.edu.ph</h3>
              </div><br></br>
              <p>→ Drop us an email for questions, feedback, or collaborations.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
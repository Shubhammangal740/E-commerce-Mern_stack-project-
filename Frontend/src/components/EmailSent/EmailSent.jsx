import React from "react";
import { Link } from "react-router-dom";
import "./EmailSent.css";
import { FaEnvelopeOpenText } from "react-icons/fa"; // FontAwesome icon

function EmailSent() {
  return (
    <div className="email-sent-container">
      <div className="email-sent-box">
        <FaEnvelopeOpenText className="email-icon" />
        <h2>Check Your Inbox!</h2>
        <p>
          A reset link has been sent to your registered email address. Please
          check your inbox and follow the instructions to reset your password.
        </p>
        <p>
          Didn't receive an email? <Link to="/reset">Resend Link</Link>
        </p>
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default EmailSent;

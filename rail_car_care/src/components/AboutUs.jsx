import React from 'react';
import './AboutUs.css'; // Make sure you have this CSS file in your project with the corresponding styles

function AboutUs() {
  const aboutUsStyle = {
    bottom: 0,
    left: 0,
    width: "100%",
    position: 'fixed',
    backgroundColor: "rgb(42, 42, 43)", 
    color: "#fff",
    fontSize:"0.75rem",
    fontFamily:"Helvetica"
  };

  return (
    <div className="about-us-container">
      <h3 className="about-us-title">About Us</h3> {/* Class 'about-us-title' used for styling */}
      <p className="about-us-text">
        Welcome to our railway services platform. We are dedicated to providing safe and efficient transportation for passengers and goods, emphasizing safety, reliability, and sustainability.
      </p>
    </div>
  );
}

export default AboutUs;

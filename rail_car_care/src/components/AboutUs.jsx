import React from "react";

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to our railway services platform. We are committed to providing safe and efficient transportation for both passengers and goods. Our dedicated team ensures the smooth operation and maintenance of railway systems.
      </p>
      <p>
        At our core, we prioritize safety, reliability, and sustainability. Our goal is to connect people and items seamlessly, reducing environmental impact while delivering top-notch service.
      </p>
      <p>
        Whether you're a passenger seeking a comfortable journey or a business relying on efficient freight transport, we are here to meet your needs.
      </p>
      <p>
        &copy; {new Date().getFullYear()} Railway Services, Inc. All rights reserved.
      </p>
    </div>
  );
}

export default AboutUs;

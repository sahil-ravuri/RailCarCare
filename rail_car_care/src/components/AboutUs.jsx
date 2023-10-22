
function AboutUs() {
  const aboutUsStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "23%",
    backgroundColor: "rgb(42, 42, 43)", 
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div  style={aboutUsStyle}>
      <h1>About Us</h1>
      <p>
        Welcome to our railway services platform. We are dedicated to providing safe and efficient transportation for passengers and goods, emphasizing safety, reliability, and sustainability.
      </p>
      <p>
        Whether you're a passenger or a business, we're here to meet your transportation needs.
      </p>
      <p>
        &copy; {new Date().getFullYear()} Railway Services, Inc. All rights reserved.
      </p>
    </div>
  );
}

export default AboutUs;


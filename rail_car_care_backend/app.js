require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Complaint=require('./models/Complaint');
const User=require('./models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const app = express();
// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'  // Adjust this if your frontend origin is different
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vamsikrishnarolla@gmail.com',
    pass: 'naaj nzrf klod dxko'
  }
});

// MongoDB Atlas connection URI
const dbURI = 'mongodb+srv://vkNaidu:pv2mVzMnOTG9UaoO@cluster0.69pfljh.mongodb.net/railcarcaredb?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// API endpoint to handle form submission
app.post('/submit-complaint', async (req, res) => {
  try {
    const newComplaint = new Complaint({
      trainNo: req.body.trainNo,
      coachType: req.body.coachType,
      issueType: req.body.issueType,
      issueLocation: req.body.issueLocation,
      description: req.body.description
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint); // Sending back the saved complaint as a JSON response
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get-complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to delete a complaint by ID
app.delete('/delete-complaint/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Complaint.findByIdAndDelete(id);
    res.send('Complaint deleted successfully');
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });

  if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user._id, role: user.role }, 'vkNaidu', { expiresIn: '1h' });

  // Successful login
  return res.status(200).json({ message: 'Logged successfully', token });
});




const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'group10');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

 // Applying middleware to /home route
app.use('/manager', authenticate);// Applying middleware to /manager route

let otpStore = {};

app.post('/request-password-reset', async (req, res) => {
  const email = req.body.email;
  const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  otpStore[email] = { otp, expires: new Date().getTime() + 60 }; // 1 minutes expiry

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('OTP sent to email');
    }
  });
});

app.post('/reset-password', async(req, res) => {
  const { email, otp, password } = req.body;
  const storedOtp = otpStore[email];

  try{

    if (!storedOtp || storedOtp.expires < new Date().getTime()) {
      delete otpStore[email]; // Clear the used OTP
      return res.status(400).send('OTP expired or invalid');
    }
    
    if (storedOtp.otp !== otp) {
      delete otpStore[email]; // Clear the used OTP
      return res.status(400).send('Invalid OTP');
    }
    

  // Proceed to reset password logic (e.g., update in database)
  // Remember to hash the new password before storing
  const updatePassword = await User.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { new: true }
  );

  if (updatePassword) {
    console.log('Password updated successfully:', updatePassword);
  } else {
    console.log('User not found with the provided email.');
  }
 } catch (error) {
  console.error('Error updating password:', error);
}
  // Clear the used OTP
  delete otpStore[email];

  res.send('Password reset successfully');
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

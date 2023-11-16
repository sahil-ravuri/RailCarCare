const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Complaint=require('./models/Complaint')
const cors = require('cors');

const app = express();
// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'  // Adjust this if your frontend origin is different
}));

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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

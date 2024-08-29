const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer for uploads

require('dotenv').config(); // Load environment variables from .env

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the photo schema
const PhotoSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // Store the photo data as a buffer
  contentType: String 
});

const Photo = mongoose.model('Photo', PhotoSchema); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false
}));

// Home route
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 }); // Fetch photos in descending order
  res.render('index', { photos: photos });
});

// Upload route
app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const newPhoto = new Photo({
      name: req.file.originalname, // Get original filename
      data: req.file.buffer, // Get photo data as buffer
      contentType: req.file.mimetype 
    });

    await newPhoto.save();
    res.redirect('/'); // Redirect back to home after saving
  } catch (err) {
    console.error('Error uploading photo:', err);
    res.status(500).send('Error uploading photo');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'); // This is needed to allow cross-origin requests (if the front-end and back-end are on different ports)
const multer = require('multer');
const path = require('path'); // Ensure path is imported

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ish1t@88', // Replace with your own password
  database: 'pethealth'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Register a new user (Sign Up)
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Registration failed' });
      res.status(201).json({ success: true, message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error during registration' });
  }
});

// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Set session and respond
    req.session.user_id = user.id;
    req.session.username = user.username; 
    res.json({ success: true, message: 'Login successful' }); // Respond with JSON
  });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  // Ensure session exists before accessing the dashboard
  if (req.session.user_id) {
    const username = req.session.username; 
    res.sendFile(path.join(__dirname, 'dashboard.html')); // Serve the dashboard HTML file
  } else {
    res.redirect('/login'); // If not logged in, redirect to the login page
  }
});

// Pet overview route
app.get('/petoverview', (req, res) => {
  // Ensure session exists before accessing the pet overview
  if (req.session.user_id) {
    res.sendFile(path.join(__dirname, 'petoverview.html')); // Serve the pet overview HTML file
  } else {
    res.redirect('/login'); // If not logged in, redirect to the login page
  }
});

const storage = multer.diskStorage({
  destination: './uploads/', // Folder to store uploaded images
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('pet-Photo');

// POST: /petoverview - Adds a new pet for a user
app.post('/addPetModal', upload, (req, res) => {
  const { petName, petSpecies, petBreed, petAge, weight, height } = req.body; // These come from form fields
  const userId = req.session.user_id; // Assuming user is logged in

  // Get the file path from the uploaded file
  const photoPath = req.file ? req.file.filename : null; // Get the filename of the uploaded file

  const query = 'INSERT INTO pets (user_id, name, species, breed, age, weight, height, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'; // Updated query
  db.query(query, [userId, petName, petSpecies, petBreed, petAge, weight, height, photoPath], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to add pet' });
      }
      res.status(201).json({ message: 'Pet added successfully' });
  });
});

// GET: /petoverview - Retrieves all pets for the logged-in user
app.get('/petoverview', (req, res) => {
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'SELECT * FROM pets WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve pets' });
    }
    res.status(200).json(result); // Send the list of pets as JSON
  });
});

// PUT: /petoverview/:id - Updates an existing pet
app.put('/petoverview/:id', (req, res) => {
  const { name, species, breed, age, weight, height } = req.body; // Added weight and height
  const petId = req.params.id;
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'UPDATE pets SET name = ?, species = ?, breed = ?, age = ?, weight = ?, height = ? WHERE id = ? AND user_id = ?'; // Added weight and height
  db.query(query, [name, species, breed, age, weight, height, petId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update pet' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found or not authorized' });
    }
    res.status(200).json({ message: 'Pet updated successfully' });
  });
});

// DELETE: /petoverview/:id - Deletes a pet
app.delete('/petoverview/:id', (req, res) => {
  const petId = req.params.id;
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'DELETE FROM pets WHERE id = ? AND user_id = ?'; // Added quotes around the SQL statement
  db.query(query, [petId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete pet' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found or not authorized' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  });
});

// POST: /reminders - Adds a new reminder for a user
app.post('/reminders', (req, res) => {
  const { title, description, date, time } = req.body;
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'INSERT INTO reminders (user_id, title, description, date, time) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, title, description, date, time], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add reminder' });
    }
    res.status(201).json({ message: 'Reminder added successfully' });
  });
});

// GET: /reminders - Retrieves all reminders for the logged-in user
app.get('/reminders', (req, res) => {
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'SELECT * FROM reminders WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve reminders' });
    }
    res.status(200).json(result); // Send the list of reminders as JSON
  });
});

// PUT: /reminders/:id - Updates an existing reminder
app.put('/reminders/:id', (req, res) => {
  const { title, description, date, time } = req.body;
  const reminderId = req.params.id;
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'UPDATE reminders SET title = ?, description = ?, date = ?, time = ? WHERE id = ? AND user_id = ?';
  db.query(query, [title, description, date, time, reminderId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update reminder' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reminder not found or not authorized' });
    }
    res.status(200).json({ message: 'Reminder updated successfully' });
  });
});

// DELETE: /reminders/:id - Deletes a reminder
app.delete('/reminders/:id', (req, res) => {
  const reminderId = req.params.id;
  const userId = req.session.user_id; // Assuming user is logged in

  const query = 'DELETE FROM reminders WHERE id = ? AND user_id = ?';
  db.query(query, [reminderId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete reminder' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reminder not found or not authorized' });
    }
    res.status(200).json({ message: 'Reminder deleted successfully' });
  });
});





// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

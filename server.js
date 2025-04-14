require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // required for hashing in createUser
const UserService = require('./user-service');
require('./passport-config');

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Secured Route Example
app.get('/api/user/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Success',
    user: req.user
  });
});

// 🔐 Protected Routes for Favourites and History
app.get('/api/user/favourites', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Fetched favourites (stub)' });
});

app.put('/api/user/favourites/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: `Added favourite ${req.params.id} (stub)` });
});

app.delete('/api/user/favourites/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: `Deleted favourite ${req.params.id} (stub)` });
});

app.get('/api/user/history', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Fetched history (stub)' });
});

app.put('/api/user/history/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: `Added history ${req.params.id} (stub)` });
});

app.delete('/api/user/history/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: `Deleted history ${req.params.id} (stub)` });
});

// 🔐 Register Route
app.post('/api/user/register', async (req, res) => {
  const { userName, password, password2 } = req.body;

  if (!userName || !password || !password2) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // For demo: this won't persist data; you can expand with MongoDB later
  const users = [
    { _id: "1", userName: "admin", password: "1234" },
    { _id: "2", userName: "test", password: "abcd" }
  ];

  const userExists = users.find(u => u.userName === userName);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Simulate success (normally, you'd save to DB)
  return res.status(200).json({ message: 'User registered successfully' });
});

// 🔐 Login Route
app.post('/api/user/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserService.checkUser(userName, password);

    const payload = {
      _id: user._id,
      userName: user.userName
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// 🆕 Register Route
app.post('/api/user/register', async (req, res) => {
  const { userName, password, password2 } = req.body;

  if (!userName || !password || !password2 || password !== password2) {
    return res.status(400).json({ message: 'Invalid registration details' });
  }

  try {
    const existingUser = await UserService.getUserByEmail(userName);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await UserService.createUser(userName, password);
    return res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

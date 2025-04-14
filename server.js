// const express = require('express');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const UserService = require('./user-service'); // or adjust the path
// require('dotenv').config();
// require('./passport-config');

// const app = express(); // <-- 🔹 THIS defines `app`

// app.use(express.json());
// app.use(passport.initialize());

// //  Login Route
// app.post('/api/user/login', async (req, res) => {
//   const { userName, password } = req.body;

//   try {
//     const user = await UserService.checkUser(userName, password);

//     const payload = {
//       _id: user._id,
//       userName: user.userName
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid username or password" });
//   }
// });

// //  Example protected route
// app.get('/api/user/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({
//     message: 'Success',
//     user: req.user
//   });
// });

// //  Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserService = require('./user-service');
require('dotenv').config();
require('./passport-config');

const app = express();

app.use(express.json());
app.use(passport.initialize());

// ✅ Secured Route Example
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

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

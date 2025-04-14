const bcrypt = require('bcryptjs');
const User = require('./models/user');

async function getUserByEmail(userName) {
  return await User.findOne({ email: userName });
}

async function validatePassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

async function checkUser(userName, password) {
  const user = await getUserByEmail(userName);
  if (!user) throw new Error("User not found");

  const isValid = await validatePassword(user, password);
  if (!isValid) throw new Error("Wrong password");

  return user;
}

async function checkUserById(id) {
  return await User.findById(id);
}

async function createUser(userName, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: userName,
    password: hashedPassword,
    favourites: [],
    history: []
  });
  return await newUser.save();
}

module.exports = {
  checkUser,
  checkUserById,
  checkUserByUsername,
  createUser
};

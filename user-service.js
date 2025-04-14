// ✅ checkUser function for login
async function checkUser(userName, password) {
  const users = [
    { _id: "1", userName: "admin", password: "1234" },
    { _id: "2", userName: "test", password: "abcd" }
  ];

  const user = users.find(u => u.userName === userName);
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Wrong password");

  return user;
}

// ✅ checkUserById function for token validation
async function checkUserById(id) {
  const users = [
    { _id: "1", userName: "admin", password: "1234" },
    { _id: "2", userName: "test", password: "abcd" }
  ];

  return users.find(u => u._id === id);
}

// ✅ Export both functions
module.exports = {
  checkUser,
  checkUserById
};

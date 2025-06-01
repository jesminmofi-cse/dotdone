const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword, // 👉 Save hashed version!
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid email or password' });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

module.exports = {
  registerUser,
  loginUser,
};

const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {

  const user = await User.find({ email: req.body.email });

  //Check if user with email already exists
  if (user.length!=0) {
    res.status(401).json({
      status: 'fail',
      message: 'Email Already Exists'
    });
  }

  //create a new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  let payload = { subject: newUser._id };
  let token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(201).json({
    status: 'success',
    token,
    data: newUser
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //2. Check if user exists and password is correct
  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      error: "Invalid User"
    })
  }
  else {
    let payload = { subject: user._id };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({
      status: 'success',
      token
    });
  }
}

exports.protect = async (req, res, next) => {
  //1. Getting the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: 'Token is not valid'
    })
  }
  //2. Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  //3. Check If User still exists
  const currentUser = await User.findById(decoded.subject);
  if (!currentUser) {
    res.status(401).json({
      status: 'fail',
      message: 'User no longer exists'
    })
  }

  //Grant Access to protected route
  req.user = currentUser;
  next();
};
const jwt = require('jsonwebtoken');
const hashPassword = require("../utills/authUtills");
const User = require("../models/users");

exports.getAuthToken = (user) => {
  const { id, email, userName, mobile, role } = user;
  // const { id: sessionId, deviceId } = session;

  const token = jwt.sign(
    {
      user: { id, email, userName, mobile, role },
      // session: { id: sessionId, deviceId },
    },
    process.env.AUTH_TOKEN_SECRET,
    { expiresIn: process.env.USER_SESSION_EXPIRE_DAYS }
  );
  return token;
};


exports.register = async function register(
  userName,
  fullName,
  email,
  mobile,
  dob,
  gender,
  role,
  password
) {
  const hashedPassword = await hashPassword(password);


  const newUser = await User.create({
    userName,
    fullName,
    email,
    mobile,
    dob,
    gender,
    role,
    password: hashedPassword,
  });

  return newUser;
};

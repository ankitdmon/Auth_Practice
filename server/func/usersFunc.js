const hashPassword = require("../utills/authUtills");
const User = require("../models/users");

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

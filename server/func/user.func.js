const jwt = require("jsonwebtoken");
const hashPassword = require("../utills/authUtills");
const User = require("../models/users");

exports.getAuthToken = async (user) => {
  // delete user.password;
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

exports.getUserById = async (userId) => {
  const userResult = await User.findOne({ _id: userId });
  const user = userResult.toObject(); // Convert Mongoose Document to JavaScript object
  delete user.password;
  // console.log(user);
  return user;
};

exports.getUserByMobile= async(mobile)=>{
  const userResults = await User.find({ mobile });
    const users = userResults.map((user) => {
      const userObject = user.toObject(); // Convert Mongoose Document to plain JavaScript object
      delete userObject.password;
      return userObject;
    });
    // console.log(users);
    return users;
}

exports.getUserByEmail= async(email)=>{
  const userResults = await User.find({ email });
    const users = userResults.map((user) => {
      const userObject = user.toObject(); // Convert Mongoose Document to plain JavaScript object
      delete userObject.password;
      return userObject;
    });
    // console.log(users);
    return users;
}

exports.getUserByUsername= async(userName)=>{
  const userResults = await User.find({ userName });
    const users = userResults.map((user) => {
      const userObject = user.toObject(); // Convert Mongoose Document to plain JavaScript object
      delete userObject.password;
      return userObject;
    });
    // console.log(users);
    return users;
}

exports.register = async (
  userName,
  fullName,
  email,
  mobile,
  dob,
  gender,
  role,
  password
) => {
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

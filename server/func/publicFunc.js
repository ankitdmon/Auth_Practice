const User = require("../models/users");

exports.checkIfUsernameExists = async (userName) => {
  const result = await User.findOne({ userName });
  if (result) {
    return false;
  } else {
    return true;
  }
};

exports.checkIfMobileExists = async (mobile) => {
  const result = await User.findOne({ mobile });
  if (result) {
    return false;
  } else {
    return true;
  }
};

exports.checkIfEmailExists = async (email) => {
  const result = await User.findOne({ email });
  if (result) {
    return false;
  } else {
    return true;
  }
};

exports.userNameSuggestion = async (username) => {
  const suggestedUsernames = [];

  // Check if the username is empty
  if (username.trim().length === 0) {
    return ["Please enter a valid username."];
  }

  // Convert the username to lowercase
  const lowercaseUsername = username.toLowerCase();

  // Generate a list of suggested usernames
  for (let i = 1; i <= 10; i++) {
    const suggestedUsername = `${lowercaseUsername}${i}`;
    suggestedUsernames.push(suggestedUsername);
  }

  return suggestedUsernames;
};

const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helper/responses");

const publicFunc = require("../func/publicFunc");

exports.isUserNameAvailable = async (req, res) => {
  try {
    let userName = req.body.userName;
    if (!userName) {
      return failResponse(req, res, "Please enter a username!");
    }
    if (userName.trim().includes(" ")) {
      return failResponse(req, res, "Username will not contain space!!");
    }

    // Check if the username already exists in the database
    const userExists = await publicFunc.checkIfUsernameExists(userName);
    if (!userExists) {
      // Generate a list of suggested usernames
      let list = await publicFunc.userNameSuggestion(userName);
      let suggestedList = list.filter((name) => name !== userName);
      return failResponse(req, res, {
        message: "Username is already taken!",
        userNameList: suggestedList,
      });
    } else {
      return successResponse(req, res, "Avalible!!");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.isMobileAvaliable = async (req, res) => {
  try {
    let mobile = req.body.mobile;
    if (!mobile) {
      return failResponse(req, res, "Enter mobile no!");
    }
    const mobileExist = await publicFunc.checkIfMobileExists(mobile);
    if (!mobileExist) {
      return failResponse(req, res, "Mobile no already taken!!");
    } else {
      return successResponse(req, res, "Avaliable!!");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.isEmailAvaliable = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return errorResponse(req, res, "Enter email!");
    }
    const emailExist = await publicFunc.checkIfEmailExists(email);
    if (!emailExist) {
      return failResponse(req, res, "Email already taken!!");
    } else {
      return successResponse(req, res, "Avaliable!!");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

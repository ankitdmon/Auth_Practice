const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helper/responses");
const usersFunc = require("../func/user.func");
const loginSignup = require("../func/loginSignup.func");

exports.register = async (req, res) => {
  try {
    let { userName, fullName, email, mobile, dob, gender, role, password } =
      req.body;
    if (!userName && !fullName && !mobile && role && password && !gender) {
      return failResponse(req, res, "Please enter the required fields!!");
    }
    const userNameValidate = userName.search(/^[a-zA-Z0-9\-\@\#\_]*$/);
    if (userNameValidate === -1) {
      return failResponse(
        req,
        res,
        "Enter username with only a-z A-Z 0-9 @ # - "
      );
    }

    const userNameAvail = await loginSignup.checkIfUsernameExists(userName);
    if (!userNameAvail) {
      const suggestedList = await loginSignup.userNameSuggestion(userName);
      return failResponse(req, res, {
        message: "UserName already taken!!",
        userNameList: suggestedList,
      });
    }

    const mobileAvail = await loginSignup.checkIfMobileExists(mobile);
    if (!mobileAvail) {
      return failResponse(req, res, "Mobile no already taken!!");
    }

    const emailAvail = await loginSignup.checkIfEmailExists(email);
    if (!emailAvail) {
      return failResponse(req, res, "Email already taken!!");
    }

    const passwordValidate = password.search(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).+$/
    );
    if (passwordValidate === -1) {
      return failResponse(
        req,
        res,
        "Enter password with at least one lowercase character, uppercase character, number, and special character"
      );
    }

    let userResult = await usersFunc.register(
      userName,
      fullName,
      email,
      mobile,
      dob,
      gender,
      role,
      password
    );
    const user = await usersFunc.getUserById(userResult._id);
    const token = await usersFunc.getAuthToken(userResult);

    user.token = token;

    // console.log(user);
    return successResponse(req, res, user);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const loginMode = req.body.loginMode;

    const types = ["userName", "email", "mobile"];
    if (!types.includes(loginMode)) {
      return failResponse(
        req,
        res,
        "Enter correct login mode, userName/ email/  mobile"
      );
    }
    if (loginMode === "mobile") {
      const { mobile, password } = req.body;
      if (!mobile) {
        return failResponse(req, res, "Enter mobile no!!");
      }
      if (!password) {
        return failResponse(req, res, "Please enter password!!");
      }
      const mobileAvail = await loginSignup.checkIfMobileExists(mobile);
      if (mobileAvail) {
        return failResponse(req, res, "Mobile no is not registered!!");
      }
      userResult = await usersFunc.getUserByMobile(mobile);
      userResult = userResult[0];
      if (!userResult) {
        return failResponse(req, res, "User not exists");
      }
      const token = await usersFunc.getAuthToken(userResult);
      userResult.token = token;
      return successResponse(req, res, userResult);
    }
    if (loginMode === "email") {
      const { email, password } = req.body;
      if (!email) {
        return failResponse(req, res, "please enter email id!!");
      }
      if (!password) {
        return failResponse(req, res, "Please enter pasword!!");
      }
      const emailAvail = await loginSignup.checkIfEmailExists(email);
      if (emailAvail) {
        return failResponse(req, res, "Email is not resgistered!!");
      }
      userResult = await usersFunc.getUserByEmail(email);
      userResult = userResult[0];
      if (!userResult) {
        return failResponse(req, res, "User not exists");
      }
      const token = await usersFunc.getAuthToken(userResult);
      userResult.token = token;
      return successResponse(req, res, userResult);
    }
    if (loginMode === "userName") {
      const { userName, password } = req.body;
      if (!userName) {
        return failResponse(req, res, "Please enter userName!!");
      }
      if (!password) {
        return failResponse(req, res, "Please enter password!!");
      }
      const userNameAvail = await loginSignup.checkIfUsernameExists(userName);
      if (userNameAvail) {
        return failResponse(req, res, "Username is not registered!!");
      }
      userResult = await usersFunc.getUserByUsername(userName);
      userResult = userResult[0];
      if (!userResult) {
        return failResponse(req, res, "User not exists");
      }
      const token = await usersFunc.getAuthToken(userResult);
      userResult.token = token;
      return successResponse(req, res, userResult);
    }
  } catch (error) {
    return errorResponse(req, res, error, "Login Failed!!");
  }
};

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
    const userExists = await loginSignup.checkIfUsernameExists(userName);
    if (!userExists) {
      // Generate a list of suggested usernames
      let list = await loginSignup.userNameSuggestion(userName);
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
    const mobileExist = await loginSignup.checkIfMobileExists(mobile);
    if (mobileExist) {
      return successResponse(req, res, "available");
    } else {
      return failResponse(req, res, "notAvailable");
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
    const emailExist = await loginSignup.checkIfEmailExists(email);
    if (emailExist) {
      return successResponse(req, res, "available");
    } else {
      return failResponse(req, res, "notAvailable");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

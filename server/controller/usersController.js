const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helper/responses");
const usersFunc = require("../func/usersFunc");
const publicFunc = require("../func/publicFunc");

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

    const userNameAvail = await publicFunc.checkIfUsernameExists(userName);
    if (!userNameAvail) {
      const suggestedList = await publicFunc.userNameSuggestion(userName);
      return failResponse(req, res, {
        message: "UserName already taken!!",
        userNameList: suggestedList,
      });
    }

    const mobileAvail = await publicFunc.checkIfMobileExists(mobile);
    if (!mobileAvail) {
      return failResponse(req, res, "Mobile no already taken!!");
    }

    const emailAvail = await publicFunc.checkIfEmailExists(email);
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

    console.log(user);
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
      const mobileAvail = await publicFunc.checkIfMobileExists(mobile);
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
      const emailAvail = await publicFunc.checkIfEmailExists(email);
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
      const userNameAvail = await publicFunc.checkIfUsernameExists(userName);
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

exports.getUserById = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return failResponse(req, res, "Enter userId!!");
    }
    const result = await usersFunc.getUserById(userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.getUserByMobile = async (req, res) => {
  try {
    const mobile = req.body.mobile;
    if (!mobile) {
      return failResponse(req, res, "Enter mobile no!!");
    }
    const result = await usersFunc.getUserByMobile(mobile);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return failResponse(req, res, "Enter email!!");
    }
    const result = await usersFunc.getUserByEmail(email);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const userName = req.body.userName;
    if (!userName) {
      return failResponse(req, res, "Enter userName!!");
    }
    const result = await usersFunc.getUserByUsername(userName);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

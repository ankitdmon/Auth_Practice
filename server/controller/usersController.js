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

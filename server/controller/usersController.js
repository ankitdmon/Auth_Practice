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
      return failResponse(req, res, "Please enter the reqiored fileds!!");
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

    const passwordValidate = password.search(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).+$/
    );
    if (passwordValidate === -1) {
      return failResponse(
        req,
        res,
        "Enter password with atleast one lowercase character , uppercase character , number and special character"
      );
    }

    const result = await usersFunc.register(
      userName,
      fullName,
      email,
      mobile,
      dob,
      gender,
      role,
      password
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

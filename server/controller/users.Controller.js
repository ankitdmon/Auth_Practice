const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helper/responses");

const usersFunc = require("../func/user.func");

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

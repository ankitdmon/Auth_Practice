const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helper/responses");

exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return failResponse(req, res, "Please enter name");
    }
    return successResponse(req, res, name);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

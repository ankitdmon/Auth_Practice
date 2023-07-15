const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/responses");
const usersFunc = require("../func/user.func");

exports.authenticatetoken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const brearertoken = bearer[1];
    req.token = brearertoken;

    try {
      const Authdata = jwt.verify(req.token, process.env.AUTH_TOKEN_SECRET);

      const user = await usersFunc.getUserById(Authdata.user._id);
      if (!user || user.length <= 0) {
        return errorResponse(req, res, "userNotExist", "authFailed", 403);
      }
      if (user.isDeleted) {
        return errorResponse(req, res, "userDeleted", "authFailed", 403);
      }

      req.user = user; // Authdata.user
      next();
    } catch (err) {
      return errorResponse(
        req,
        res,
        "TokenVerificationFailed",
        "authFailed",
        403
      );
    }
  } else {
    return errorResponse(req, res, "NoBearerToken", "authFailed");
  }
};

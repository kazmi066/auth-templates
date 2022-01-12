const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    return next();
  }

  const header = req.headers.authorization;
  const token = header.replace("Bearer ", "");
  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    if (jwtData && jwtData.user) {
      req.user = jwtData.user;
    } else {
      return;
    }
  } catch (err) {
    console.log("Invalid token");
  }
  return next();
};

module.exports = auth;

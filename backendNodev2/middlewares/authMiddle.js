const { validateToken } = require("./JWTAuth");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: token missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = validateToken(token);
    req.user = {
      username: decoded.username,
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
};

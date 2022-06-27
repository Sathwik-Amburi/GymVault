const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateJwtToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ error: "Token is required for authentication" });
  }

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).send({ error: "Invalid token." });
    }

    req.user = payload;
    next();
  });
};

module.exports = { validateJwtToken };

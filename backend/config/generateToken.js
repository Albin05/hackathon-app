const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shravan", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

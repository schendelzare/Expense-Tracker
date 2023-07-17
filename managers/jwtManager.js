const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  // Generate access TOKEN...
  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.full_name,
    },
    process.env.jwt_salt //important KEY
  );
  return accessToken;
};

module.exports = jwtManager;

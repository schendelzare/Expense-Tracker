const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.headers);
  const accessToken = req.headers.authorization.replace("Bearer ", ""); //Remove bearer string from string

  try {
    //Verify if the token match on .env file
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);

    req.user = jwt_payload; //Can access anywhere
    console.log("auth", req.user);
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: "Unauthorized",
    });
    return;
  }
  next();
};

module.exports = auth;

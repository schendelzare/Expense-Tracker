//handle all errors
const errorHandler = (error, req, res, next) => {
  //validations...
  if (error) {
    console.log(error);
    if (error.message) {
      res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
    res.status(400).json({
      status: "Failed",
      error: error,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;

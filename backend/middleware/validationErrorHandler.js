const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    res.status(400).json({ message: err.details[0].message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = validationErrorHandler;
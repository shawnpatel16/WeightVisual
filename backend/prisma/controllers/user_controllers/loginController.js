const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");


// Joi validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Login controller
const loginController = asyncHandler(async (req, res) => {
  // Validate request body
  const { email, password } = await loginSchema.validateAsync(req.body);

  // Check if the user exists
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the provided password with the stored password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  console.log(user.userId)
   const token = jwt.sign({ id: user.userId, email: user.email }, process.env.JWT_SECRET, {
     expiresIn: "1h",
   });
  // Generate a JWT
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  maxAge: 60 * 60 * 1000, // 1 hour
  sameSite: "lax", // Prevent CSRF attacks
});

  // Send the JWT in the response
  res.status(200).json({ token });
});

module.exports = loginController;

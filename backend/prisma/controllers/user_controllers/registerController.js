const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require('../../prismaClient')

// Joi validation schema
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
});

// Register controller
const registerController = asyncHandler(async (req, res) => {
  // Validate request body
  const { email, password } = await registerSchema.validateAsync(req.body);

  // Check if the email is already in use
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("user exists")
    return res.status(400).json({ message: "Email is already in use" });

  }

  // Salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user in the database
  const newUser = await prisma.users.create({
    data: { email, password: hashedPassword },
  });

  // Generate a JWT
 const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
   expiresIn: "12h",
 });

 // Set the JWT as an HTTP-only cookie
 res.cookie("token", token, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
   maxAge: 60 * 60 * 1000, // 1 hour
   sameSite: "lax", // Prevent CSRF attacks
 });
 res.status(200).json({ message: "Logged in" });

});

module.exports = registerController;

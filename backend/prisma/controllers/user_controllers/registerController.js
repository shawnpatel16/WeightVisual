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
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
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
    expiresIn: "1h",
  });

  // Send the JWT in the response
  res.status(201).json({ token });
});

module.exports = registerController;

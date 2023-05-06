const prisma = require("../../prismaClient");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const isAuthenticated = asyncHandler(async (req, res) => {
  
  try {
    // Get the token from the cookie
    const token = req.cookies.token;
    console.log("hello from this side")
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("helolo from the other side");
    // Get the user from the database
    const user = await prisma.users.findUnique({
      where: { userId: decoded.id },
    });
    

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    console.error("Error in isAuthenticated:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = isAuthenticated;

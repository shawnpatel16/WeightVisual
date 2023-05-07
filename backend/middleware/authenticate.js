const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const prisma = require("../prisma/prismaClient");

const jwtOptions = {
  jwtFromRequest: (req) => req.cookies.token,
  secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async (jwtPayload, done) => {
  
  try {
    const user = await prisma.users.findUnique({
      where: { userId: jwtPayload.id },
      select: {
        userId: true,
        email: true,
      },
    });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Initialize the JwtStrategy
passport.use(new JwtStrategy(jwtOptions, jwtVerify));

// Authentication middleware
const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = authenticate;

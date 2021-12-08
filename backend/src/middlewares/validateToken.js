// libraries
import jwt from "jsonwebtoken";
import "dotenv/config";

// controllers
import User from "../models/UserModel.js";

async function validateToken(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({
      msg: "Access token is missing",
    });

  // get only token from string
  const token = authHeader.split(" ")[1];

  try {
    const user = await User.findOne({
      accessToken: token,
    });

    if (!user) return res.status(403).json({
      msg: `Authorization error`
    });

    // define decoded as jwt verified
    req.decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    next();

  } catch (err) {

    return res.status(403).json({
      err,
      msg: "Authentication error"
    });
  }
}

export default validateToken;

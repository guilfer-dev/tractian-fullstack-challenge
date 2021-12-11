import jwt from "jsonwebtoken";
import config from "../config.js";

function generateJwt(payload) {
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '1h'
    });
    return { err: false, token: token };
  }
  catch (err) {
    console.error(err);
    return { err: true };
  }
}

export default generateJwt;

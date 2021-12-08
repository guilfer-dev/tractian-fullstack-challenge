import jwt from "jsonwebtoken";
import "dotenv/config";

function generateJwt(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
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

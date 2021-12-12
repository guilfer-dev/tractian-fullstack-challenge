// libraries
import { Router } from "express";

// controllers
import AuthenticationController from "../controllers/AuthenticationController.js";

// middlewares
import validateToken from "../middlewares/validateToken.js";
import validateMaster from "../middlewares/validateMaster.js";

const route = Router();

// authentication routes
route.post('/login', AuthenticationController.login);
route.get('/logout', validateToken, AuthenticationController.logout);
route.get('/master', validateMaster, AuthenticationController.master);
route.get('/me', validateToken, AuthenticationController.me);

export default route;
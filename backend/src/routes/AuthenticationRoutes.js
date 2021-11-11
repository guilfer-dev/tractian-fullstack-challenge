import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";

const route = Router();

route.post('/signup', AuthenticationController.signup);
route.post('/login', AuthenticationController.login);
route.patch('/set', AuthenticationController.reset);
route.get('/logout', AuthenticationController.logout);

export default route;
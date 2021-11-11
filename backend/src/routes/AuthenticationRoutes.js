import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";

const route = Router();

route.post('/login', AuthenticationController.login);

export default route;
import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";

const route = Router();

route.post('/', AuthenticationController.login);

export default route;
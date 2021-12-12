import { Router } from "express";
import UserController from "../controllers/UserController.js";

import validateMaster from "../middlewares/validateMaster.js";

const route = Router();

route.post('/new-user', validateMaster, UserController.create);
route.get('/users', validateMaster, UserController.index);
route.put('/users/:id', validateMaster, UserController.update);
route.delete('/users/:id', validateMaster, UserController.delete);

export default route;
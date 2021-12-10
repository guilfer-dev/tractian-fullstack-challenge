import { Router } from "express";
import UserController from "../controllers/UserController.js";

const route = Router();

route.post('/new-user', UserController.create);
route.get('/users', UserController.index);
route.get('/users/:id', UserController.show);
route.put('/users/:id', UserController.update);
route.delete('/users/:id', UserController.delete);

export default route;
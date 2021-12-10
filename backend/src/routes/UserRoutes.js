import { Router } from "express";
import UserController from "../controllers/UserController.js";

const route = Router();

route.post('/', UserController.create);
route.get('/', UserController.index);
route.get('/:id', UserController.show);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);

export default route;
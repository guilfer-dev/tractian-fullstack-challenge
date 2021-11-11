import { Router } from "express";
import AssetController from "../controllers/AssetController.js";

const route = Router();

route.post('/', AssetController.create);
route.get('/', AssetController.index);
route.get('/:id', AssetController.show);
route.put('/:id', AssetController.update);
route.delete('/:id', AssetController.delete);

export default route;
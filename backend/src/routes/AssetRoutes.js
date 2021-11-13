import { Router } from "express";
import AssetController from "../controllers/AssetController.js";
import upload from "../middlewares/upload.js";

const route = Router();

route.post('/units/:unitName', upload, AssetController.create);
route.get('/assets', AssetController.index);
route.get('/assets/:id', AssetController.show);
route.put('/assets/:id', AssetController.update);
route.delete('/assets/:id', AssetController.delete);

export default route;
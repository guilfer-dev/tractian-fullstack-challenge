import { Router } from "express";
import AssetController from "../controllers/AssetController.js";
import parseAssetForm from "../middlewares/parseAssetForm.js";

const route = Router();

route.post('/units/:unitID', parseAssetForm, AssetController.create);
route.get('/units/:unitID/assets', AssetController.index);
route.get('/assets/:id', AssetController.show);
route.put('/assets/:id', parseAssetForm, AssetController.update);
route.delete('/assets/:id', AssetController.delete);

export default route;
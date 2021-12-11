import { Router } from "express";
import AssetController from "../controllers/AssetController.js";
import CompanyAssetController from "../controllers/CompanyAssetController.js";
import parseAssetForm from "../middlewares/parseAssetForm.js";

import validateToken from "../middlewares/validateToken.js";

const route = Router();

route.post('/units/:unitID', validateToken, parseAssetForm, AssetController.create);
route.get('/units/:unitID/assets', validateToken, AssetController.index);
route.get('/:companyID/all-assets', validateToken, CompanyAssetController.index);
route.get('/assets/:id', validateToken, AssetController.show);
route.put('/assets/:id', validateToken, parseAssetForm, AssetController.update);
route.delete('/assets/:id', validateToken, AssetController.delete);

export default route;
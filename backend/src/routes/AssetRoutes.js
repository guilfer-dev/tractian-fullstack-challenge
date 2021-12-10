import { Router } from "express";
import AssetController from "../controllers/AssetController.js";
import CompanyAssetController from "../controllers/CompanyAssetController.js";
import parseAssetForm from "../middlewares/parseAssetForm.js";

const route = Router();

route.post('/units/:unitID', parseAssetForm, AssetController.create);
route.get('/units/:unitID/assets', AssetController.index);
route.get('/:companyID/all-assets', CompanyAssetController.index);
route.get('/asset/:id', AssetController.show);
route.put('/asset/:id', parseAssetForm, AssetController.update);
route.delete('/asset/:id', AssetController.delete);

export default route;
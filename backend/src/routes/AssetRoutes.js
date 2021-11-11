import { Router } from "express";
import AssetController from "../controllers/AssetController.js";

const route = Router();

route.post('/companies/:companyName/units/:unitName', AssetController.create);
route.get('/assets', AssetController.index);
route.get('/:unitsId/:id', AssetController.show);
route.put('/:unitsId/:id', AssetController.update);
route.delete('/:unitsId/:id', AssetController.delete);

export default route;
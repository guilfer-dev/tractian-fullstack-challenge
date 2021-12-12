import { Router } from "express";
import UnitController from "../controllers/UnitController.js";

import validateMaster from "../middlewares/validateMaster.js";

const route = Router();

route.post('/new-unit', validateMaster, UnitController.create);
route.get('/units', validateMaster, UnitController.index);
route.put('/units/:id', validateMaster, UnitController.update);
route.delete('/units/:id', validateMaster, UnitController.delete);

export default route;
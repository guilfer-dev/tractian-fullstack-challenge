import { Router } from "express";
import CompanyController from "../controllers/CompanyController.js";

import validateMaster from "../middlewares/validateMaster.js";

const route = Router();

route.post('/new-company', validateMaster, CompanyController.create);
route.get('/companies', validateMaster, CompanyController.index);
route.put('/companies/:id', validateMaster, CompanyController.update);
route.delete('/companies/:id', validateMaster, CompanyController.delete);

export default route;
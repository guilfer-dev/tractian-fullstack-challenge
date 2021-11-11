import { Router } from "express";
import CompanyController from "../controllers/CompanyController.js";

const route = Router();

route.post('/', CompanyController.create);
route.get('/', CompanyController.index);
route.get('/:id', CompanyController.show);
route.put('/:id', CompanyController.update);
route.delete('/:id', CompanyController.delete);

export default route;
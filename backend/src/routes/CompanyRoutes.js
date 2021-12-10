import { Router } from "express";
import CompanyController from "../controllers/CompanyController.js";

const route = Router();

route.post('/new-company', CompanyController.create);
route.get('/companies', CompanyController.index);
route.get('/companies/:id', CompanyController.show);
route.put('/companies/:id', CompanyController.update);
route.delete('/companies/:id', CompanyController.delete);

export default route;
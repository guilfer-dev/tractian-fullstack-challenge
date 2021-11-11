import { Router } from "express";
import UnitController from "../controllers/UnitController.js";

const route = Router();

route.post('/companies/:companyName', UnitController.create);
route.get('/units', UnitController.index);
route.get('/units/:id', UnitController.show);
route.put('/units/:id', UnitController.update);
route.delete('/units/:id', UnitController.delete);

export default route;
import { Router } from "express";
import UnitController from "../controllers/UnitController.js";

const route = Router();

route.post('/:companyId', UnitController.create);
route.get('/', UnitController.index);
route.get('/:id', UnitController.show);
route.put('/:id', UnitController.update);
route.delete('/:id', UnitController.delete);

export default route;
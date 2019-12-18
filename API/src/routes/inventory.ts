import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();

router.post("/", [checkJwt], InventoryController.save);

router.get("/column-names", InventoryController.getColumnNames);

router.get("/summary-held-checks", InventoryController.summaryHeldChecks);

router.get("/", InventoryController.all);

router.delete("/:id([0-9]+)", [checkJwt], InventoryController.remove);

export default router;

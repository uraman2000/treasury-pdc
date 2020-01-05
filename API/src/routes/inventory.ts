import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();

router.get("/", InventoryController.all);

router.get("/testData", InventoryController.testData);

router.post("/", [checkJwt], InventoryController.save);

router.delete("/:id([0-9]+)", [checkJwt], InventoryController.remove);

router.get("/column-names", InventoryController.getColumnNames);

router.get("/summary-held-checks/:regionId([0-9]+)", InventoryController.summaryHeldChecks);

export default router;

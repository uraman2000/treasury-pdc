import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();

router.post("/paginate", [checkJwt], InventoryController.paginate);

router.post("/bulk", [checkJwt], InventoryController.bulkSave);

router.get("/testData", InventoryController.testData);

router.post("/", [checkJwt], InventoryController.save);

router.delete("/:id([0-9]+)", [checkJwt], InventoryController.remove);

router.get("/column-names", InventoryController.getColumnNames);

router.get("/summary-held-checks/:regionId([0-9]+)", [checkJwt], InventoryController.summaryHeldChecks);

export default router;

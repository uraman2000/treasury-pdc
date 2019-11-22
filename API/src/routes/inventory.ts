import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();

router.post("/", [checkJwt], InventoryController.save);

router.get("/column-names", [checkJwt], InventoryController.getColumnNames);

router.get("/", InventoryController.all);

router.delete("/:id([0-9]+)", [checkJwt], InventoryController.remove);

//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

// router.post("/accestoken", AuthController.refreshToken);

export default router;

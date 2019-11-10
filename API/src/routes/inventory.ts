import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();
//Login route
router.post("/", InventoryController.save);

router.get("/column-names", InventoryController.getColumnNames);

router.get("/", InventoryController.all);
//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

// router.post("/accestoken", AuthController.refreshToken);

export default router;

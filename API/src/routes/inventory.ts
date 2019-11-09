import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import InventoryController from "../controller/InventoryController";

const router = Router();
//Login route
router.post("/", InventoryController.save);

//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

// router.post("/accestoken", AuthController.refreshToken);

export default router;

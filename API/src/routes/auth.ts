import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/check-token", AuthController.isTokenExpired);

router.post("/signup", AuthController.signUp);

export default router;

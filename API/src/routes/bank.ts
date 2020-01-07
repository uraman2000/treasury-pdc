import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import BanksController from "../controller/BanksController";

const router = Router();

router.get("/", BanksController.all);

router.get("/lookUp", BanksController.lookUp);

router.get("/:id([0-9]+)", BanksController.one);

router.post("/", BanksController.save);

router.delete("/:id([0-9]+)", BanksController.remove);

export default router;

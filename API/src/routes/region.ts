import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import RegionController from "../controller/RegionController";

const router = Router();

router.get("/", RegionController.all);

router.get("/:id([0-9]+)", RegionController.one);

router.post("/", RegionController.save);

router.delete("/:id([0-9]+)", RegionController.remove);

export default router;

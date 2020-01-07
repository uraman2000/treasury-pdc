import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import BranchController from "../controller/BranchController";

const router = Router();

router.get("/", BranchController.all);

router.get("/lookUp", BranchController.lookUp);

router.get("/:id([0-9]+)", BranchController.one);

router.post("/", BranchController.save);

router.delete("/:id([0-9]+)", BranchController.remove);

export default router;

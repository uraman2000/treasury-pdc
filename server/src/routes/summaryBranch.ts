import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SumarryPerBranchController from "../controller/SummaryPerBranchController";

const router = Router();

router.get("/:regionId", SumarryPerBranchController.all);

export default router;
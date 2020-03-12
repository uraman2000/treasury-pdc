import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SumarryPerBranchController from "../controller/SummaryPerBranchController";

const router = Router();

router.get("/:regionId", [checkJwt], SumarryPerBranchController.all);

export default router;

import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SummaryController from "../controller/SummaryController";
import SumarryPerBranchController from "../controller/SummaryPerBranchController";

const router = Router();

router.get("/per-branch/:statusTableName", [checkJwt], SumarryPerBranchController.all);
router.get("/:statusTableName", [checkJwt], SummaryController.summaryStatus);

export default router;

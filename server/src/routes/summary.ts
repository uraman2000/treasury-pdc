import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SummaryController from "../controller/SummaryController";
import SumarryPerBranchController from "../controller/SummaryPerBranchController";

const router = Router();

router.get("/per-branch/:statusTableName", SumarryPerBranchController.all);
router.get("/:statusTableName", SummaryController.summaryStatus);


export default router;

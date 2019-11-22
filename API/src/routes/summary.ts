import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SummaryController from "../controller/SummaryController";

const router = Router();

router.get("/:statusTableName", SummaryController.summaryStatus);

export default router;

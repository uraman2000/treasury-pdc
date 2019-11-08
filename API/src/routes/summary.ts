import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import SummaryController from "../controller/SummaryController";

const router = Router();

router.get("/client-account", SummaryController.clientAccount);

export default router;

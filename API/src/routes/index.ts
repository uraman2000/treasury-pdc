import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import inventory from "./inventory";
import summary from "./summary";
import status from "./status";

import summaryBranch from "./summaryBranch";

const routes = Router();

routes.use("/auth", auth);

routes.use("/user", user);

routes.use("/inventory", inventory);

routes.use("/summary", summary);

routes.use("/status", status);

routes.use("/summary-per-branch", summaryBranch);

export default routes;

import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import inventory from "./inventory";
import summary from "./summary";
import status from "./status";

const routes = Router();

routes.use("/auth", auth);

routes.use("/user", user);

routes.use("/inventory", inventory);

routes.use("/summary", summary);

routes.use("/status", status);

export default routes;

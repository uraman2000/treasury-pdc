import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Region } from "../entity/Region";
import HandleResponse from "../../Constants/HandleResponse";
import { Roles } from "../entity/statuses/Roles";

export default class RolesController {
  static all = async (req: Request, res: Response) => {
    res.send(await getRepository(Roles).find());
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Roles).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, role }: Roles = req.body;
    let roles = new Roles();
    roles.id = id;
    roles.role = role;

    HandleResponse.save(res, roles, Roles);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Roles);
  };
}

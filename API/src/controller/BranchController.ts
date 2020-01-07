import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import HandleResponse from "../../Constants/HandleResponse";
import ResponseCodes from "../../Constants/ResponseCodes";
import { Branch } from "../entity/Branch";

export default class BranchController {
  static all = async (req: Request, res: Response) => {
    res.send(await getRepository(Branch).find());
  };

  static lookUp = async (req: Request, res: Response) => {
    let branches = await getRepository(Branch).find();
    let obj = {};
    branches.forEach((element: any) => {
      obj[element.id] = element.name;
    });
    res.status(ResponseCodes.OK).send(obj);
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Branch).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, name }: Branch = req.body;
    let branch = new Branch();
    branch.id = id;
    branch.name = name;

    HandleResponse.save(res, branch, Branch);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Branch);
  };
}

import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { AccountStatus } from "../entity/statuses/AccountStatus";
import IResponse from "../../app/IResponse";

const customRes: IResponse = {};

function statusRepository(statusTable: string) {
  return getRepository(statusTable);
}

export default class AccountStatusController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let statusTable = req.params.tableName;
    return res.status(200).send(await statusRepository(statusTable).find());
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    let statusTable = req.params.tableName;

    try {
      await statusRepository(statusTable).save(req.body);
      customRes.message = "saved succesfully";
      customRes.status = "SUCCESS";
    } catch (error) {
      customRes.errors = error;
      customRes.status = "FAILED";
    }
    return res.status(200).send(customRes);
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    let statusTable = req.params.tableName;
    try {
      let userToRemove = await statusRepository(statusTable).findOne(req.params.id);
      await statusRepository(statusTable).remove(userToRemove);
      customRes.message = `id : ${req.params.id} has been deleted succesfully`;
      customRes.status = "SUCCESS";
    } catch (error) {
      customRes.errors = error;
      customRes.status = "FAILED";
    }
    return res.status(200).send(customRes);
  }
}

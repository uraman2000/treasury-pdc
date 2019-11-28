import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import IResponse from "../../app/IResponse";
import { number } from "prop-types";
import { CheckPayeeName } from "../entity/statuses/CheckPayeeName";

const customRes: IResponse = {};

function statusRepository(statusTable: string) {
  return getRepository(statusTable);
}

export default class StatusController {
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

  static async allStatus(req: Request, res: Response, next: NextFunction) {
    const client_account_status = await statusRepository("client_account_status").find();
    const check_deposit_status = await statusRepository("check_deposit_status").find();
    const client_check_status = await statusRepository("client_check_status").find();
    const deposit_today_status = await statusRepository("deposit_today_status").find();
    const reason_for_bounce_status = await statusRepository("reason_for_bounce_status").find();
    const reason_for_hold_status = await statusRepository("reason_for_hold_status").find();
    const check_payee_name = await statusRepository("check_payee_name").find();

    console.log(check_payee_name);
    const obj: any = {};
    obj["client_account_status"] = cleanStatus(client_account_status);
    obj["check_deposit_status"] = cleanStatus(check_deposit_status);
    obj["check_re_deposit_status"] = cleanStatus(check_deposit_status);
    obj["check_payee_name"] = cleanStatus(check_payee_name);
    obj["client_check_status"] = cleanStatus(client_check_status);
    obj["deposit_today_status"] = cleanStatus(deposit_today_status);
    obj["reason_for_bounce_status"] = cleanStatus(reason_for_bounce_status);
    obj["reason_for_hold_status"] = cleanStatus(reason_for_hold_status);

    return res.status(200).send(obj);
  }
}

function cleanStatus(data) {
  const obj: any = {};
  data.map((item: any) => {
    const id: number = item.id;

    obj[id] = item.status || item.Name;
  });

  return obj;
}
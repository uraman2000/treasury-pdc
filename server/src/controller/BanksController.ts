import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import HandleResponse from "../../Constants/HandleResponse";
import ResponseCodes from "../../Constants/ResponseCodes";
import { Bank } from "../entity/Bank";

export default class BanksController {
  static all = async (req: Request, res: Response) => {
    res.send(await getRepository(Bank).find());
  };

  static lookUp = async (req: Request, res: Response) => {
    let branches = await getRepository(Bank).find();
    let obj = {};
    branches.forEach((element: any) => {
      obj[element.id] = `${element.bank_name}`;
    });
    res.status(ResponseCodes.OK).send(obj);
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Bank).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, bank_name }: Bank = req.body;
    let bank = new Bank();
    bank.id = id;
    // bank.account_number = account_number;
    bank.bank_name = bank_name;

    HandleResponse.save(res, bank, Bank);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Bank);
  };
}

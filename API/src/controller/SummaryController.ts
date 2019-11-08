import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { PDCInventory } from "../entity/PDCInventory";
import { validate } from "class-validator";
import { AccountStatus } from "../entity/statuses/AccountStatus";

class SummaryController {
  private userRepository = getRepository(PDCInventory);

  static clientAccount = async (req: Request, res: Response) => {
    const accountRepository = getRepository(AccountStatus);
    const statuses = await accountRepository.find();
    

    res.status(201).send(statuses);
  };
}

export default SummaryController;

import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { PDCInventory } from "../entity/PDCInventory";
import { validate } from "class-validator";

class InventoryController {
  private userRepository = getRepository(PDCInventory);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  static save = async (req: Request, res: Response) => {
    await getRepository(PDCInventory).save(req.body);

    res.status(201).send("User created");
  };

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}

export default InventoryController;

async function validateErrors(res: any, object: any) {
  const errors = await validate(object);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
}

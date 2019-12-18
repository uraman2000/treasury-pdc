import { validate } from "class-validator";
import IResponse from "../app/IResponse";
import ResponseCodes from "./ResponseCodes";
import { getRepository } from "typeorm";

const getErrors = async (entity: any) => {
  let validator = await validate(entity);
  const errors = [];
  await validator.map((item: any) => {
    errors.push(item.constraints.isNotEmpty);
  });

  return errors;
};
export default class HandleResponse {
  static save = async (res, entitiesValues: any, entity) => {
    const customRes: IResponse = {};
    customRes.errors = await getErrors(entitiesValues);

    if (customRes.errors.length > 0) {
      customRes.message = "Please Populate every details";
      res.status(ResponseCodes.BAD_REQUEST).send(customRes);
      return;
    }

    customRes.message = "Saved Successfully";
    customRes.data = await getRepository(entity).save(entitiesValues);
    res.status(ResponseCodes.OK).send(customRes);
  };

  static remove = async (res, req, enity) => {
    const customRes: IResponse = {};
    let userToRemove = await getRepository(enity).findOne(req.params.id);

    if (userToRemove) {
      await getRepository(enity).remove(userToRemove);
      customRes.data = userToRemove;
      customRes.message = "Successfully Deleted";
      res.status(ResponseCodes.OK).send(customRes);
      return;
    }
    customRes.message = "Not Found";
    res.status(ResponseCodes.NOT_FOUND).send(customRes);
  };
}

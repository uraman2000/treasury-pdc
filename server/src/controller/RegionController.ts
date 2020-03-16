import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Region } from "../entity/Region";
import HandleResponse from "../../Constants/HandleResponse";
import ResponseCodes from "../../Constants/ResponseCodes";

class RegionController {
  static all = async (req: Request, res: Response) => {
    res.send(await getRepository(Region).find());
  };

  static lookUp = async (req: Request, res: Response) => {
    let whereValues = {};
    if (req.query.region !== "null") {
      whereValues = { where: { region_code: req.query.region } };
    }

    let regions = await getRepository(Region).find(whereValues);
    let obj = {};
    regions.forEach((element: any) => {
      obj[element.id] = element.region_code;
    });
    res.status(ResponseCodes.OK).send(obj);
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Region).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, name, region_code }: Region = req.body;
    let region = new Region();
    region.id = id;
    region.name = name;
    region.region_code = region_code;

    HandleResponse.save(res, region, Region);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Region);
  };
}

export default RegionController;

import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Region } from "../entity/Region";
import HandleResponse from "../../Constants/HandleResponse";

class RegionController {
  static all = async (req: Request, res: Response) => {
    res.send(await getRepository(Region).find());
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Region).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, name, region_code, updatedBy, createdBy }: Region = req.body;
    let region = new Region();
    region.id = id;
    region.name = name;
    region.region_code = region_code;
    region.updatedBy = updatedBy;
    region.createdBy = createdBy;

    HandleResponse.save(res, region, Region);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Region);
  };
}

export default RegionController;

import { Request, Response, NextFunction } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { Roles } from "../entity/statuses/Roles";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    let user: User;
    try {
      user = await getConnection()
        .createQueryBuilder()
        .select("roles.role", "role")
        .from(User, "user")
        .leftJoin(Roles, "roles", "user.role = roles.id")
        .where("user.id = :id", { id: id })
        .getRawOne();
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role.toString()) > -1) next();
    else res.status(401).send();
  };
};

import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { UserStatus } from "../entity/statuses/UserStatus";
import HandleResponse from "../../Constants/HandleResponse";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username", "password", "role", "status"] //We dont want to send the passwords on response
    });

    const userData = users.map(item => ({
      id: item.id,
      username: item.username,
      password: "",
      role: item.role,
      status: item.status
    }));
    //Send the users object
    res.send(userData);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url

    const id: string = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //We dont want to send the password on response
      });
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password, status, role } = req.body;
    let user = new User();
    user.username = username;
    user.password = password;
    user.role = role === null ? 0 : role;
    user.status = status === null ? 1 : status;

    //Validade if the parameters are ok
    // const errors = await validate(user);
    // if (errors.length > 0) {
    //   res.status(400).send(errors);
    //   return;
    // }

    //Hash the password, to securely store on DB
    user.hashPassword();

    // //Try to save. If fails, the username is already in use
    // const userRepository = getRepository(User);
    // try {
    //   await userRepository.save(user);
    // } catch (e) {
    //   res.status(409).send("username already in use");
    //   return;
    // }

    //If all ok, send 201 response
    HandleResponse.save(res, user, User);
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, role, status, password } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    user.status = status;
    user.password = password;

    user.hashPassword();
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static status = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(UserStatus);
    const status = await userRepository.find();

    //Send the users object
    res.send(status);
  };

  static allPendingStatus = async (req: Request, res: Response) => {
    // SELECT * FROM `user` WHERE status = 1
    const status = await getConnection()
      .createQueryBuilder()
      .select(`*`)
      .from(User, "User")
      .where("status = :status")
      .setParameter("status", 1)
      .getRawMany();
    res.status(200).send(status);
  };
}

export default UserController;

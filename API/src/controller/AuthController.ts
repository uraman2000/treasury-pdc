import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";
import IResponse from "../../app/IResponse";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    const customRes: IResponse = {};
    const token_expiration = "20000";
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      customRes.status = "FAILED";
      customRes.message = "invalid Username or Password";
      res.status(401).send(customRes);
      return;
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      customRes.status = "FAILED";
      customRes.message = "invalid Username or Password";
      res.status(401).send(customRes);
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwtSign(user.id, user.username, token_expiration, "access_token");

    const Rtoken = jwtSign(user.id, user.username, token_expiration, "refresh_token");

    //Send the jwt in the response
    res.send({
      access_token: token,
      expires_in: token_expiration,
      refresh_token: Rtoken
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    const customRes: IResponse = {};
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword);
    console.log(newPassword);
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send({ ass: "assa" });
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send({ ass: "assa" });
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);
    customRes.message = "Password Change Succesfully";
    customRes.status = "SUCCESS";
    res.status(200).send(customRes);
  };

  static refreshToken = (req: Request, res: Response) => {
    let { refresh_token } = req.body;
    let jwtPayload;
    const token_expiration = "1h";

    try {
      jwtPayload = <any>jwt.verify(refresh_token, config.jwtSecret);
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send(error);
      return;
    }

    const { userId, username } = jwtPayload;
    const access_token = jwtSign(userId, username, token_expiration, "access_token");

    const new_refresh_token = jwtSign(userId, username, token_expiration, "refresh_token");

    res.status(200).send({
      access_token: access_token,
      expires_in: token_expiration,
      refresh_token: new_refresh_token
    });
  };

  static isTokenExpired = (req: Request, res: Response) => {
    let { access_token } = req.body;
    let jwtPayload;
    const customRes: IResponse = {};

    try {
      jwtPayload = <any>jwt.verify(access_token, config.jwtSecret);
      customRes.message = "Token still available";
      customRes.status = "SUCCESS";
      customRes.data = true;
      res.status(200).send(customRes);
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send(error);
      return;
    }
  };
}
function jwtSign(userId, username, token_expiration, type) {
  return jwt.sign({ userId, username, type }, config.jwtSecret, {
    expiresIn: token_expiration
  });
}
export default AuthController;

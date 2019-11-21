import axios from "axios";
import { baseUrl } from "../Constatnt";

interface LoginData {
  username: string;
  password: string;
}

export default class LoginApiRepository {
  public static async login(loginData: LoginData, callback: any) {
    try {
      await axios.post(`${baseUrl}/auth/login`, loginData).then(function(response) {
        callback(response);
      });
    } catch (error) {
      callback(error.response);
    }
  }

  public static async isTokenExpired(access_token?: any) {
    try {
      const response = await axios.post(`${baseUrl}/auth/check-token`, { access_token: access_token });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  public static async SignUp(signup: any, callback: any) {
    try {
      await axios.post(`${baseUrl}/auth/signup`, signup).then(function(response) {
        callback(response);
      });
    } catch (error) {
      callback(error.response);
    }
  }
}

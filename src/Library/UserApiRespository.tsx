import IData from "../Components/Interfaces/IData";
import { baseUrl, ResponseCodes } from "../Constatnt";
import HandleToken from "./HandleToken";
import { deleteAccess } from "../utils";

class UserApiRespository {
  public static async get() {
    try {
      const response = await (await HandleToken.getInstance()).get(`user`);
      return response.data;
    } catch (error) {
      if (error.response.status === ResponseCodes.Unauthorized) {
        deleteAccess();
      }
      return error.response.data;
    }
  }

  public static async save(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).patch(`user/${data.id}`, data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }

  public static async delete(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`${baseUrl}/user/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  public static async getAllPending() {
    try {
      const response = await (await HandleToken.getInstance()).get(`user/pending`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default UserApiRespository;

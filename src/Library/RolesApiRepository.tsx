import IData from "../Components/Interfaces/IData";
import { baseUrl, ResponseCodes } from "../Constatnt";
import HandleToken from "./HandleToken";
import { deleteAccess } from "../utils";

export default class RolesApiRepository {
  public static async getRoles() {
    try {
      const response = await (await HandleToken.getInstance()).get(`roles/`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}

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
  public static async getAccessValues() {
    try {
      const response = await (await HandleToken.getInstance()).get(`roles/access-values`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async saveRoles(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`roles/`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async deleteRoles(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`${baseUrl}/roles/${id}`);

      return response.status;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}

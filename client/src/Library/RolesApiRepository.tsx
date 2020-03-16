
import { baseUrl } from "../Constatnt";
import HandleToken from "./HandleToken";


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

  public static async getLookUp() {
    try {
      const response = await (await HandleToken.getInstance()).get(`roles/lookup`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async getOne(id: any) {
    try {
      const response = await (await HandleToken.getInstance()).get(`roles/roleName/${id}`);
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

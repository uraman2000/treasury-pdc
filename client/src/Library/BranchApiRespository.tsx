import { getAccess, isAdmin } from "../utils";
import HandleToken from "./HandleToken";

export default class BranchApiRespository {
  public static async All() {
    try {
      const response = await (await HandleToken.getInstance()).get(`branch/`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async save(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`branch/`, data);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async delete(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`branch/${id}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async lookUp() {
    try {
      const region = isAdmin() ? null : getAccess().region;

      const response = await (await HandleToken.getInstance()).get(`branch/lookUp?region=${region}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}

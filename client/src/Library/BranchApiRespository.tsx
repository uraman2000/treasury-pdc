import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { deleteAccess } from "../utils";
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

  public static async lookUp() {
    try {
      const response = await (await HandleToken.getInstance()).get(`branch/lookUp`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}

import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { deleteAccess } from "../utils";
import HandleToken from "./HandleToken";

export default class RegionRepository {
  public static async All() {
    try {
      const response = await(await HandleToken.getInstance()).get(`region/`);
      return response.data;
    } catch (error) {
      if (error.response.status === ResponseCodes.Unauthorized) {
        deleteAccess();
      }
      return error.response.data;
    }
  }
}

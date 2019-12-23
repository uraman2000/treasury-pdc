import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { getAccess, setAccess, deleteAccess } from "../utils";

export default class HandleToken {
  public static async refresh(refresh_token: any) {
    try {
      const response = await axios.post(`${baseUrl}/auth/refresh-token/`, {
        refresh_token: refresh_token
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  public static async getInstance() {
    const axiosInstance = axios.create({
      baseURL: `${baseUrl}/`,
      headers: {
        access_token: getAccess().access_token
      }
    });

    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const data = error.response.data;

        if (error.response.status === ResponseCodes.Unauthorized && data.expiredAt) {
          const originalRequest = error.config;

          await setAccess(await HandleToken.refresh(getAccess().refresh_token));
          originalRequest.headers.access_token = getAccess().access_token;

          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }

  public static delete(error: any) {
    if (error.response.status === ResponseCodes.Unauthorized) {
      deleteAccess();
    }
  }
}

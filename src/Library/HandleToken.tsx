import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { getAccess, setAccess } from "../utils";

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
      function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;
      },
      async function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const data = error.response.data;

        if (error.response.status === ResponseCodes.Unauthorized && data.expiredAt) {
          const originalRequest = error.config;
          await setAccess(await HandleToken.refresh(getAccess().refresh_token));
          console.log(originalRequest);
          axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
}

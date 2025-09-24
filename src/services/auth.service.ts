import { AxiosError } from "axios";

import { tesloApi } from "../api/teslo.api";
import { LoginResponse } from "../interfaces";

export class AuthService {
  public static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      // console.log(error);
      throw new Error("Unable to login");
    }
  };

  public static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
      return data;
    } catch (error) {
      // console.log(error);
      throw new Error("UnAuthorized");
    }
  };
}

import { PATH_API } from "@/app/shared/constants/pathsAPI";
import { httpClient } from "../httpClient";

export interface SignInParams {
  email: string;
  password: string;
}

interface SigninResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    token: string;
  }
}

export async function signin(params: SignInParams) {
  const { data } = await httpClient.post<SigninResponse>(`${PATH_API.MICRO_AUTH}/sign-in`, params);

  return data;
}

import { PATH_API } from "@/app/shared/constants/PathsAPI";
import { httpClient } from "../httpClient";

export interface SignInParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export async function signin(params: SignInParams) {
  const { data } = await httpClient.post<SigninResponse>(`${PATH_API.MICRO_AUTH}/sign-in`, params);

  return data;
}

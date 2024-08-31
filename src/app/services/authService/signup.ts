import { PATH_API } from "@/app/shared/constants/PathsAPI";
import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>(`${PATH_API.MICRO_AUTH}/sign-up`, params);

  return data;
}

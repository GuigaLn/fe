import { PATH_API } from "@/app/shared/constants/pathsAPI";
import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  data: {
    message: string;
  }
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>(`${PATH_API.MICRO_AUTH}/sign-up`, params);

  return data;
}

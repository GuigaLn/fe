import { API_PATHS } from "@/app/shared/constants/api-paths";
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
  const { data } = await httpClient.post<SigninResponse>(`${API_PATHS.MICRO_AUTH}/sign-in`, params);

  return data;
}

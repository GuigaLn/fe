import { API_PATHS } from "@/app/shared/constants/api-paths";
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
  const { data } = await httpClient.post<SignupResponse>(`${API_PATHS.MICRO_AUTH}/sign-up`, params);

  return data;
}

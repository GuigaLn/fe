import { API_PATHS } from "@/app/shared/constants/api-paths";
import { httpClient } from "../httpClient";
import { cookies } from "next/headers";

import { APP_PATHS } from "@/app/shared/constants/app-paths";
import { redirect } from "next/navigation";

export interface FindAllResponse {
  id: string;
  name: string;
  niche: string[];
  avatar: string | null;

  followerNumber: number;
  followingNumber: number;

  instagram: string;

  cep: string;
  uf: string;
  state: string;
  city: string;
  place: string;
  district: string;
  complement: string;
}

export async function findAll(): Promise<FindAllResponse[]> {
  try {
    const jwt = cookies().get("access_token");

    const { data } = await httpClient.get<FindAllResponse[]>(
      `${API_PATHS.API}/influencers`,
      {
        headers: {
          Authorization: `Bearer ${jwt?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error?.status === 401) {
      redirect(APP_PATHS.public.sign_in);
    }
    return [];
  }
}

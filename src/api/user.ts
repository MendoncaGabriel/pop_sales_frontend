import { api } from "@/lib/axios";
import { Company, User } from "@/types/api";

interface AuthResponse {
  user: User;
  company: Company;
}

export const userApi = {
  async getMyUser(): Promise<AuthResponse> {
    const { data } = await api.get<AuthResponse>(
      "/user",
    );
    return data;
  }
};
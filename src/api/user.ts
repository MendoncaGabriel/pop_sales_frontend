import { api } from "@/lib/axios";
import { Company, CreateUserRequest, CreateUserResponse, Employee, ListUsersByCompanyIdResponse, User } from "@/types/api";

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
  },

  async create(user: CreateUserRequest){
    const { data } = await api.post<CreateUserResponse>(
      "/auth/sign-up",
      user
    );
    return data;
  },

  async listByCompanyId(companyId: string): Promise<Employee[]> {
    const { data } = await api.get<ListUsersByCompanyIdResponse>(
      `/user/company/${companyId}`,
    );
    return data.users || [];
  },
};
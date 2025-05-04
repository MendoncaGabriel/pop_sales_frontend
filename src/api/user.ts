import { api } from "@/lib/axios";
import { Company, CreateUserRequest, CreateUserResponse, ListUsersByCompanyIdResponse, UpdateUserRequest, User } from "@/types/api";

interface AuthResponse {
  user: User;
  company: Company;
}

export const userApi = {
  async getMyUser(){
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

  async update(id: string, user: UpdateUserRequest){
    const { data } = await api.patch<UpdateUserRequest>(
      `/user/${id}`,
      user
    );
    return data;
  },

  async delete(id: string){
    console.log(id)
    const { data } = await api.delete<UpdateUserRequest>(
      `/user/${id}`
    );
    return data;
  },

  async listByCompanyId(companyId: string){
    const { data } = await api.get<ListUsersByCompanyIdResponse>(
      `/user/company/${companyId}`,
    );
    return data.users || [];
  },
};
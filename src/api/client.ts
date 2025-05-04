import { api } from "@/lib/axios";
import { Client, CreateClient } from "@/types/api";



interface CreateClientResponse {
	client: {
		id: string,
		createdAt: Date,
		updatedAt: Date,
    name: string,
    companyId: string,
    email: string,
    address: string | null,
    phoneNumber: string,
    responsiblePerson: string,
    zipCode: string,
		lon: string,
		lat: string,
	}
}


export const clientApi = {
  async create(client: CreateClient): Promise<CreateClientResponse> {
    const { data } = await api.post<CreateClientResponse>(
      "/client",
      client,
    );
    return data;
  },

  async listByCompanyId(companyId: string): Promise<{clients: Client[] }> {
    const { data } = await api.get<{clients: Client[] }>(
      `/client/company/${companyId}`,
    );
    return data;
  },

  async update(id: string, client: Client): Promise<Client> {
    const { data } = await api.patch<Client>(
      `/client/${id}`,
      client,
    );
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/client/${id}`);
  },
};
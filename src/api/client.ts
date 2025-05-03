import { api } from "@/lib/axios";

interface Client {
  name: string,
  companyId: string,
  email: string,
  address: string,
  phoneNumber: string,
  responsiblePerson: string,
  zipCode: string
}

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
  async create(client: Client): Promise<CreateClientResponse> {
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
  }
};
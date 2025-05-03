import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}


export const authApi = {
  async signIn(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/sign-in",
      credentials,
      { withCredentials: true }
    );
    return data;
  }
};
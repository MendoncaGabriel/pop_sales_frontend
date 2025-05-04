export interface User {
  id: string;
  name: string;
  email: string;
  type: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Company {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Client {
  name: string;
  id: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: string | null;
  zipCode: string | null;
  responsiblePerson: string | null;
  phoneNumber: string | null;
  address: string | null;
  lon: string | null;
  lat: string | null;
}

export interface CreateClientResponse {
  name: string;
  companyId: string;
  email: string;
  address: string;
  phoneNumber: string;
  responsiblePerson: string;
  zipCode: string;
}

export interface CreateClient {
  name: string;
  companyId: string;
  email: string;
  address: string;
  phoneNumber: string;
  responsiblePerson: string;
  zipCode: string;
}

export interface CreateEmployeeRequest {
  name: string,
  email: string,
  password: string,
  phone: string,
  companyId: string
  type: "MANAGER" | "EMPLOYEE" | "",
  status: "ACTIVE" | "INACTIVE" | ""
}

export interface CreateEmployeeResponse {
  user: {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    phone: string,
    status: "ACTIVE" | "INACTIVE"
  }
}

export interface ListUsersByCompanyIdResponse {
  users: {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    status: "ACTIVE" | "INACTIVE",
    phone: null,
    type: "MANAGER" | "EMPLOYEE" | "ADMIN"
  }[]
}

export interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
  phone: string,
  companyId: string
  type: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CreateUserResponse {
  user: User
}

export interface UpdateUserRequest {
  name: string,
	phone: string,
	email: string,
	status: "ACTIVE" | "INACTIVE"
  type: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
}
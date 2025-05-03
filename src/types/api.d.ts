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
  createdAt: Date;
  updatedAt: Date;
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

export  interface CreateClient {
  name: string;
  companyId: string;
  email: string;
  address: string;
  phoneNumber: string;
  responsiblePerson: string;
  zipCode: string;
}
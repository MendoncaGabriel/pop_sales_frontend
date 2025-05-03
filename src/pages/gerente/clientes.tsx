import { clientApi } from '@/api/client';
import { useAuthStore } from '@/store/useAuthStore';
import { Client, CreateClient } from '@/types/api';
import { useEffect, useState } from 'react';

interface FormCreateClientProps {
  formData: CreateClient;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<CreateClient>>;
}

function FormCreateClient({ formData, handleSubmit, setFormData }: FormCreateClientProps) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
          <input
            type="text"
            value={formData.responsiblePerson}
            onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Cadastrar Cliente
      </button>
    </form>
  )
}

function TableClients(
  { clients }:
    { clients: Client[]; }
) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{client.name}</td>
              <td className="px-6 py-4">{client.email}</td>
              <td className="px-6 py-4">{client.responsiblePerson}</td>
              <td className="px-6 py-4">{client.phoneNumber}</td>
              <td className="px-6 py-4">
                <button
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Clientes() {
  const { company } = useAuthStore();

  const [formData, setFormData] = useState<CreateClient>({
    name: '',
    companyId: '',
    email: '',
    address: '',
    phoneNumber: '',
    responsiblePerson: '',
    zipCode: ''
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (company) {
      setFormData(prev => ({ ...prev, companyId: company.id }));
    }
  }, [company]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getClients() {
    if (company) {
      await clientApi.listByCompanyId(company.id).then((result) => {
        setClients(result.clients as Client[]);
      })
    }
  }

  useEffect(() => {
    if (company?.id) {
      getClients();
    }
  }, [company?.id, getClients]);
  

  const handleSubmitCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clientApi.create(formData);
  
      setFormData({
        name: '',
        companyId: company?.id ?? "",
        email: '',
        address: '',
        phoneNumber: '',
        responsiblePerson: '',
        zipCode: ''
      });
  
      await getClients();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };
  

  return (
    <div className="p-6 m-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Clientes</h1>

      <FormCreateClient
        formData={formData}
        handleSubmit={handleSubmitCreateClient}
        setFormData={setFormData}
      />

      <TableClients clients={clients} />

    </div>
  );
}
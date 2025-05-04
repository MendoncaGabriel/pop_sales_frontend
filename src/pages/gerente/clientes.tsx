import { clientApi } from '@/api/client';
import { FormCreateClient } from '@/components/client/FormCreateClient';
import { FormUpdateClient } from '@/components/client/FormUpdateClient';
import { TableClients } from '@/components/client/TableClients';
import { useAuthStore } from '@/store/useAuthStore';
import { Client, CreateClient } from '@/types/api';
import { useEffect, useState } from 'react';

export default function Clientes() {
  const { company } = useAuthStore();

  const [createClient, setCreateClient] = useState<CreateClient>({
    name: '',
    companyId: '',
    email: '',
    address: '',
    phoneNumber: '',
    responsiblePerson: '',
    zipCode: ''
  });

  const [updateClient, setUpdateClient] = useState<Client>({
    name: '',
    companyId: '',
    email: '',
    address: '',
    phoneNumber: '',
    responsiblePerson: '',
    zipCode: '',
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    lat: "",
    lon: ""
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (company) {
      setCreateClient(prev => ({ ...prev, companyId: company.id }));
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
      await clientApi.create(createClient);

      setCreateClient({
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

  const handleSubmitUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await clientApi.update(updateClient.id, updateClient);
      console.log(result)

      setIsUpdate(false)
      await getClients();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const handleUpdateClient = async (client: unknown) => {
    setUpdateClient(client as Client);
    setIsUpdate(true)
  }

  useEffect(() => {
    if (!isUpdate) {
      setCreateClient({
        name: '',
        companyId: company?.id ?? "",
        email: '',
        address: '',
        phoneNumber: '',
        responsiblePerson: '',
        zipCode: ''
      })
    }
  }, [company?.id, isUpdate])

  const handleSubmitDeleteClient = async (client: Client) => {
    const result = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (result) {
      try {
        await clientApi.delete(client.id);
        await getClients();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  return (
    <div className="p-6 m-auto max-w-screen-xl">

      {isUpdate ? (
        <FormUpdateClient
          formData={updateClient}
          handleSubmit={handleSubmitUpdateClient}
          setFormData={setUpdateClient}
          setIsUpdate={setIsUpdate}
        />
      ) : (
        <FormCreateClient
          formData={createClient}
          handleSubmit={handleSubmitCreateClient}
          setFormData={setCreateClient}
        />
      )}

      <TableClients
        clients={clients}
        handleDeleteClient={handleSubmitDeleteClient}
        handleUpdateClient={handleUpdateClient}
      />
    </div>
  );
}
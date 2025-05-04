import { Client } from "@/types/api";
import { Button } from "../button";

export function TableClients(
  { 
    clients, 
    handleUpdateClient,
    handleDeleteClient
  }:
  { 
    clients: Client[]; 
    handleUpdateClient: (client: Client) => void;
    handleDeleteClient: (client: Client) => void;
  }
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
                <Button variant="text" onClick={() => handleUpdateClient(client)}>Editar</Button>
                <Button variant="text" onClick={() => handleDeleteClient(client)} className="text-red-500">Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

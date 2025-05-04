import { Client } from "@/types/api";
import { Button } from "../button";

interface FormCreateClientProps {
  formData: Client;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<Client>>;
  setIsUpdate: (data: boolean) => void;

}

export function FormUpdateClient(
  { formData, handleSubmit, setFormData, setIsUpdate }
    : FormCreateClientProps
) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Atualizar Cliente</h1>
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
              value={formData.email ?? ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input
              type="text"
              value={formData.address ?? ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={formData.phoneNumber ?? ""}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
            <input
              type="text"
              value={formData.responsiblePerson ?? ""}
              onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
            <input
              type="text"
              value={formData.zipCode ?? ""}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="space-x-4">
          <Button type="submit" className='mt-4' variant='blue'>Atualizar Cliente</Button>
          <Button  className='mt-4' variant='red' onClick={() => setIsUpdate(false)}>X</Button>
        </div>
      </form>
    </>
  )
}
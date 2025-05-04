import { CreateUserRequest } from "@/types/api";
import { Button } from "../button";

interface FormCreateEmployeeProps {
  formData: CreateUserRequest;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<CreateUserRequest>>;
}

export function FormCreateEmployee({ formData, handleSubmit, setFormData }: FormCreateEmployeeProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Cadastrar Colaborador</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              placeholder="Mínimo 4 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
              min={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as "MANAGER" | "EMPLOYEE" })}
              className="w-full p-2 border rounded"
            >
              <option value="EMPLOYEE" selected>Funcionário</option>
              <option value="MANAGER">Gerente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "ACTIVE" | "INACTIVE" })}
              className="w-full p-2 border rounded"
            >
              <option value="ACTIVE" selected>Ativo</option>
              <option value="INACTIVE">Inativo</option>
            </select>
          </div>
        </div>

          <Button type="submit" className='mt-4' variant='blue'>Cadastrar Colaborador</Button>
        
      </form>
    </>
  )
}
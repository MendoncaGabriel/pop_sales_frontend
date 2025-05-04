import { Employee } from "@/types/api";
import { Button } from "../button";

interface TableEmployeeProps {
  employees: Employee[];
  handleUpdateEmployee: (employee: Employee) => void;
  handleDeleteEmployee: (employee: Employee) => void;
}

function handleEmployeeType(type: string){
  if(type === "ADMIN"){
    return "Administrador"
  }else if(type === "EMPLOYEE"){
    return "Funcionário" 
  }else if(type === "MANAGER"){
    return "Gerente"
  }

  return "Não definido"
}

function handleStatus(status: string){
  if(status === "ACTIVE"){
    return "Ativo" 
  }else if(status === "INACTIVE"){
    return "Inativo" 
  }

  return "Não definido"
}

export function TableEmployee(
  {
    employees,
    handleUpdateEmployee,
    handleDeleteEmployee
  }: TableEmployeeProps
) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{handleStatus(employee.status)}</td>
              <td className="px-6 py-4">{employee.phone}</td>
              <td className="px-6 py-4">{handleEmployeeType(employee.type)}</td>
              <td className="px-6 py-4">
                <Button variant="text" onClick={() => handleUpdateEmployee(employee)}>Editar</Button>
                <Button variant="text" onClick={() => handleDeleteEmployee(employee)} className="text-red-500">Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { userApi } from "@/api/user";
import { FormCreateEmployee } from "@/components/employee/FormCreateEmployee";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateEmployeeRequest, Employee } from "@/types/api";
import { useEffect, useState } from "react";

export default function EmployeePage(){
  const { company } = useAuthStore();

  const [createEmployee, setCreateEmployee] = useState<CreateEmployeeRequest>({
    companyId: "",
    phone: "",
    email: "",
    name: "",
    password: "",
    status: "",
    type: ""
  });

  const [employees, setEmployees] = useState<Employee[]>([])


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function listEmployees() {
    if (company) {
      await userApi.listByCompanyId(company.id).then((result) => {
        setEmployees(result as Employee[]);
      })
    }
  }

  useEffect(() => {
    listEmployees();
  }, [company?.id, listEmployees])

  const handleSubmitCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (company) {
      createEmployee.companyId = company.id;
      await userApi.create(createEmployee).then(() => {
        listEmployees();
        setCreateEmployee({
          companyId: "",
          phone: "",
          email: "",
          name: "",
          password: "",
          status: "",
          type: ""
        })
      })
    }
  }

  return (
    <div className="p-6 m-auto max-w-screen-xl">
      <FormCreateEmployee 
        formData={createEmployee}
        setFormData={setCreateEmployee}
        handleSubmit={handleSubmitCreateEmployee}
      />

      <TableEmployee
        employees={employees}
        handleDeleteEmployee={() => {}}
        handleUpdateEmployee={() => {}}
      />
    </div>
  )
}
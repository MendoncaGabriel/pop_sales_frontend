import { userApi } from "@/api/user";
import { FormCreateEmployee } from "@/components/employee/FormCreateEmployee";
import { FormUpdateEmployee } from "@/components/employee/FormUpdateEmployee";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateUserRequest, User, UpdateUserRequest } from "@/types/api";
import { useEffect, useState } from "react";

export default function EmployeePage() {
  const { company } = useAuthStore();
  
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [userCreate, setUserCreate] = useState<CreateUserRequest>({
    companyId: "",
    email: "", 
    name: "",
    password: "",
    phone: "",
    status: "ACTIVE",
    type: "EMPLOYEE"
  });
  const [userUpdate, setUserUpdate] = useState<UpdateUserRequest>({
    email: "",
    name: "",
    phone: "",
    status: "ACTIVE",
    type: "EMPLOYEE"
  });
  const [userId, setUserId] = useState<string>()
  const [users, setUsers] = useState<User[]>();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function listEmployees() {
    if (company) {
      await userApi.listByCompanyId(company.id).then((result) => {
        setUsers(result);
      })
    }
  }

  useEffect(() => {
    listEmployees();
  }, [company?.id, listEmployees])

  const handleSubmitCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (company) {
      if(userCreate && company.id){
        await userApi.create({
          ...userCreate,
          companyId: company.id,
        })
      }
    }

    setUserCreate({
      companyId: "",
      email: "", 
      name: "",
      password: "",
      phone: "",
      status: "ACTIVE",
      type: "EMPLOYEE"
    })
  }

  const handleSubmitUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (company && userId) {
      if(userCreate && company.id){
        await userApi.update(userId, userUpdate)

        setUserUpdate({
          email: "",
          name: "",
          phone: "",
          status: "ACTIVE",
          type: "EMPLOYEE"
        })
        setUserId("")
        setIsUpdate(false)
      }
    }
  }

  const handleUpdateEmployeeTable = (user: User) => {
    setUserId(user.id)
    setUserUpdate(user as UpdateUserRequest)
    setIsUpdate(true)
  }

  const handleSubmitDeleteEmployee = async (user: User) => {
    const result = window.confirm('Tem certeza que deseja excluir este Colaborador?');
    if (result) {
      try {
        await userApi.delete(user.id);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  return (
    <div className="p-6 m-auto max-w-screen-xl">
      {isUpdate ? (
        <FormUpdateEmployee
          handleSubmit={handleSubmitUpdateEmployee}
          formData={userUpdate}
          setFormData={setUserUpdate}
          setIsUpdate={setIsUpdate}
        />
      ) : (
        <FormCreateEmployee
          formData={userCreate}
          setFormData={setUserCreate}
          handleSubmit={handleSubmitCreateEmployee}
        />
      )}
      <TableEmployee
        employees={users}
        handleDeleteEmployee={handleSubmitDeleteEmployee}
        handleUpdateEmployee={handleUpdateEmployeeTable}
      />
    </div>
  )
}
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userApi } from "@/api/user";
import { useAuthStore } from "@/store/useAuthStore";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;

    // Redireciona se não houver token
    if (!token && router.pathname !== "/auth/login") {
      router.push("/auth/login");
      return;
    }

    // Verificações de tipo de usuário com base na rota
    if (user && user.type) {
      const isAdmin = router.pathname.startsWith("/admin") && user.type !== "ADMIN";
      const isManager = router.pathname.startsWith("/gerente") && user.type !== "MANAGER";
      const isEmployee = router.pathname.startsWith("/funcionario") && user.type !== "EMPLOYEE";

      if (isAdmin || isManager || isEmployee) {
        alert("Você não tem acesso a essa página");
        router.push("/auth/login");
        return;
      }
    }

    setIsAuthorized(true);
  }, [router]);

  useEffect(() => {
    if (isAuthorized) {
      // Apenas busca os dados do usuário se estiver autorizado
      (async () => {
        try {
          const result = await userApi.getMyUser();
          setAuth(result.user, result.company);
        } catch (error) {
          console.error("Erro ao buscar usuário autenticado:", error);
          router.push("/auth/login");
        }
      })();
    }
  }, [isAuthorized]);

  if (!isAuthorized && router.pathname !== "/auth/login") {
    return null; // Pode colocar um loading aqui se quiser
  }

  return <Component {...pageProps} />;
}

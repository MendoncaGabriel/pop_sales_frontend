import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const token = localStorage.getItem("token");

    if (!token && router.pathname !== "/auth/login") {
      router.push("/auth/login");
      return;
    }

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
  }, [router, router.pathname]);

  if (!isAuthorized && router.pathname !== "/auth/login") {
    return null;
  }

  return <Component {...pageProps} />;
}

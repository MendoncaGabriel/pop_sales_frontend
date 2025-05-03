import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token =  localStorage.getItem('token');

    if (!token && router.pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [router]);

  return <Component {...pageProps} />;
}

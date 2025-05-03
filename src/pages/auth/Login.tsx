'use client';

import { useState } from "react";
import { useRouter } from "next/router";
import { authApi } from "@/api/auth";

export default function Login() {
  const [user, setUser] = useState({
    email: 'admin@admin.com',
    password: 'admin'
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const data = await authApi.signIn(user);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          router.push('/');
        }, 200);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser(prev => ({...prev, password: e.target.value}))}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

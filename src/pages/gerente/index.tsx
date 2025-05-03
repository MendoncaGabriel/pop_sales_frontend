import Link from 'next/link';

export default function HomeManager() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel do Gerente</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Colaboradores */}
          <Link href="/gerente/colaboradores">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Colaboradores</h2>
              <p className="text-gray-600">Gerencie a equipe, cadastre e edite colaboradores</p>
            </div>
          </Link>

          {/* Clientes */}
          <Link href="/gerente/clientes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Clientes</h2>
            <p className="text-gray-600">Cadastre e gerencie informações dos clientes</p>
          </Link>

          {/* Produtos */}
          <Link href="/gerente/produtos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Produtos</h2>
            <p className="text-gray-600">Gerencie o catálogo de produtos</p>
          </Link>

          {/* Roterização */}
          <Link href="/gerente/rotas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Roterização</h2>
            <p className="text-gray-600">Crie e gerencie rotas de vendas</p>
          </Link>

          {/* Relatórios */}
          <Link href="/gerente/relatorios" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Relatórios</h2>
            <p className="text-gray-600">Visualize relatórios e métricas</p>
          </Link>

          {/* Configurações */}
          <Link href="/gerente/configuracoes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Configurações</h2>
            <p className="text-gray-600">Ajuste as configurações do sistema</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
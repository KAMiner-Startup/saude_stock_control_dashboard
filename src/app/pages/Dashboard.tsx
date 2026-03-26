import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Package, AlertTriangle, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { getInsumosEstoqueBaixo, getLotesProximosVencimento, movimentacoes } from "../lib/data";

export function Dashboard() {
  const insumosEstoqueBaixo = getInsumosEstoqueBaixo();
  const lotesProximosVencimento = getLotesProximosVencimento(90);

  // Movimentações por mês (últimos 6 meses)
  const movimentacoesPorMes = [
    { mes: "Out", entradas: 45, saidas: 38, ajustes: 5 },
    { mes: "Nov", entradas: 52, saidas: 48, ajustes: 3 },
    { mes: "Dez", entradas: 48, saidas: 42, ajustes: 6 },
    { mes: "Jan", entradas: 65, saidas: 58, ajustes: 4 },
    { mes: "Fev", entradas: 58, saidas: 52, ajustes: 5 },
    { mes: "Mar", entradas: 72, saidas: 64, ajustes: 8 },
  ];

  // Tendência de consumo
  const tendenciaConsumo = [
    { mes: "Out", consumo: 28 },
    { mes: "Nov", consumo: 24 },
    { mes: "Dez", consumo: 22 },
    { mes: "Jan", consumo: 21 },
    { mes: "Fev", consumo: 19 },
    { mes: "Mar", consumo: 17 },
  ];

  const movimentacoesEsteMes = movimentacoes.filter((m) => {
    const data = new Date(m.data);
    const hoje = new Date();
    return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Estoque</h1>
        <p className="text-gray-600 mt-1">Visão consolidada do sistema de gestão de estoque hospitalar</p>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">MOVIMENTAÇÕES ESTE MÊS</span>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{movimentacoesEsteMes}</span>
            <span className="text-sm text-green-600 mb-1">+14%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">ALERTAS PENDENTES</span>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{insumosEstoqueBaixo.length + lotesProximosVencimento.length}</span>
            <span className="text-sm text-red-600 mb-1">-2</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">alertas pendentes</p>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">TAXA DE CONFORMIDADE</span>
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">94%</span>
            <span className="text-sm text-green-600 mb-1">+3%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">itens em conformidade</p>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">TEMPO MÉDIO DE REPOSIÇÃO</span>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">5d</span>
            <span className="text-sm text-green-600 mb-1">-1d</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs. mês anterior</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Movimentações por Mês</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">Últimos 6 meses</p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={movimentacoesPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="entradas" fill="#4F46E5" name="Entradas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" fill="#10B981" name="Saídas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ajustes" fill="#EF4444" name="Ajustes" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Tempo Médio de Reposição</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">Em dias — tendência de melhora</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tendenciaConsumo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip />
              <Line type="monotone" dataKey="consumo" stroke="#4F46E5" strokeWidth={2} dot={{ fill: "#4F46E5", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="font-semibold text-gray-900">Estoque Baixo</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Insumos com estoque abaixo do mínimo</p>

          <div className="space-y-3">
            {insumosEstoqueBaixo.slice(0, 5).map((insumo) => (
              <div key={insumo.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg shadow-default">
                <div>
                  <div className="font-medium text-gray-900">{insumo.nome}</div>
                  <div className="text-xs text-gray-500">{insumo.codigoInterno}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-600">{insumo.estoqueAtual} {insumo.unidadeMedida}</div>
                  <div className="text-xs text-gray-500">Mín: {insumo.estoqueMinimo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold text-gray-900">Alertas de Validade</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Lotes próximos do vencimento (90 dias)</p>

          <div className="space-y-3">
            {lotesProximosVencimento.slice(0, 5).map((lote) => {
              const diasRestantes = Math.ceil((new Date(lote.dataValidade).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={lote.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg shadow-default">
                  <div>
                    <div className="font-medium text-gray-900">Lote {lote.numeroLote}</div>
                    <div className="text-xs text-gray-500">Validade: {new Date(lote.dataValidade).toLocaleDateString("pt-BR")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">{diasRestantes} dias</div>
                    <div className="text-xs text-gray-500">{lote.quantidade} unidades</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Search, AlertTriangle, AlertCircle, Package, Calendar, MapPin } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { insumos, lotes, getInsumosEstoqueBaixo, getLotesProximosVencimento, getLotesVencidos, getInsumoNome, getFornecedorNome, getLocalNome, getCategoriaNome } from "../lib/data";

export function Estoque() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todos");

  const insumosEstoqueBaixo = getInsumosEstoqueBaixo();
  const lotesProximosVencimento = getLotesProximosVencimento(90);
  const lotesVencidos = getLotesVencidos();

  const filteredInsumos = insumos.filter((insumo) => {
    const matchSearch = insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        insumo.codigoInterno.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = filterCategoria === "todos" || insumo.categoriaId === filterCategoria;
    return matchSearch && matchCategoria;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monitoramento de Estoque</h1>
        <p className="text-gray-600 mt-1">Acompanhamento de saldos, alertas e validades</p>
      </div>

      {/* Cards de alertas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-red-900 uppercase">Estoque Crítico</span>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-900">{insumosEstoqueBaixo.length}</div>
          <p className="text-sm text-red-700 mt-2">Insumos abaixo do mínimo</p>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-orange-900 uppercase">Próximo ao Vencimento</span>
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-900">{lotesProximosVencimento.length}</div>
          <p className="text-sm text-orange-700 mt-2">Lotes nos próximos 90 dias</p>
        </div>

        <div className="bg-white rounded-lg shadow-default p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-900 uppercase">Total de Insumos</span>
            <Package className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{insumos.length}</div>
          <p className="text-sm text-gray-700 mt-2">Cadastrados no sistema</p>
        </div>
      </div>

      <Tabs defaultValue="saldos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="saldos">Saldos de Estoque</TabsTrigger>
          <TabsTrigger value="baixo">Estoque Baixo ({insumosEstoqueBaixo.length})</TabsTrigger>
          <TabsTrigger value="validade">Validade ({lotesProximosVencimento.length})</TabsTrigger>
          <TabsTrigger value="lotes">Controle de Lotes</TabsTrigger>
        </TabsList>

        <TabsContent value="saldos" className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-default p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar insumo..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  <SelectItem value="1">Medicamentos</SelectItem>
                  <SelectItem value="2">Material Cirúrgico</SelectItem>
                  <SelectItem value="3">EPI</SelectItem>
                  <SelectItem value="4">Descartáveis</SelectItem>
                  <SelectItem value="5">Material de Curativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-default overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Insumo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Saldo Atual</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque Mín.</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Disponibilidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInsumos.map((insumo) => {
                    const estoqueBaixo = insumo.estoqueAtual <= insumo.estoqueMinimo;
                    const percentual = (insumo.estoqueAtual / insumo.estoqueMinimo) * 100;
                    
                    return (
                      <tr key={insumo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{insumo.codigoInterno}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{insumo.nome}</div>
                              <div className="text-xs text-gray-500">{insumo.descricao}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{getCategoriaNome(insumo.categoriaId)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${estoqueBaixo ? "text-red-600" : "text-gray-900"}`}>
                            {insumo.estoqueAtual} {insumo.unidadeMedida}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{insumo.estoqueMinimo}</td>
                        <td className="px-6 py-4">
                          {estoqueBaixo ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Crítico
                            </span>
                          ) : percentual < 150 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Atenção
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${estoqueBaixo ? "bg-red-500" : percentual < 150 ? "bg-yellow-500" : "bg-green-500"}`}
                                style={{ width: `${Math.min(percentual, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 w-12">{Math.round(percentual)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="baixo" className="space-y-6">
          <div className="bg-white rounded-lg shadow-default p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Insumos com Estoque Abaixo do Mínimo</h3>
            <div className="space-y-3">
              {insumosEstoqueBaixo.map((insumo) => (
                  <div key={insumo.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg shadow-default">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-gray-900">{insumo.nome}</div>
                      <div className="text-sm text-gray-600">{insumo.codigoInterno} • {getCategoriaNome(insumo.categoriaId)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-600">{insumo.estoqueAtual} {insumo.unidadeMedida}</div>
                    <div className="text-xs text-gray-500">Mínimo: {insumo.estoqueMinimo}</div>
                    <div className="text-xs text-red-600 font-medium">
                      Déficit: {insumo.estoqueMinimo - insumo.estoqueAtual} {insumo.unidadeMedida}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="validade" className="space-y-6">
          <div className="bg-white rounded-lg shadow-default p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Lotes Próximos ao Vencimento (90 dias)</h3>
            <div className="space-y-3">
              {lotesProximosVencimento.map((lote) => {
                const diasRestantes = Math.ceil((new Date(lote.dataValidade).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const insumo = insumos.find((i) => i.id === lote.insumoId);
                
                return (
                  <div key={lote.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg shadow-default">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-900">{getInsumoNome(lote.insumoId)}</div>
                        <div className="text-sm text-gray-600">
                          Lote: {lote.numeroLote} • {getFornecedorNome(lote.fornecedorId)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {getLocalNome(lote.localArmazenamentoId)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-orange-600">{diasRestantes} dias</div>
                      <div className="text-xs text-gray-500">Validade: {new Date(lote.dataValidade).toLocaleDateString("pt-BR")}</div>
                      <div className="text-xs text-gray-600 font-medium mt-1">
                        {lote.quantidade} {insumo?.unidadeMedida}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {lotesVencidos.length > 0 && (
            <div className="bg-white rounded-lg border border-red-200 p-6">
              <h3 className="font-semibold text-red-900 mb-4">Lotes Vencidos - Ação Necessária</h3>
              <div className="space-y-3">
                {lotesVencidos.map((lote) => (
                  <div key={lote.id} className="flex items-center justify-between p-4 bg-red-100 rounded-lg border border-red-300">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-700" />
                      <div>
                        <div className="font-medium text-gray-900">{getInsumoNome(lote.insumoId)}</div>
                        <div className="text-sm text-gray-600">Lote: {lote.numeroLote}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-700">VENCIDO</div>
                      <div className="text-xs text-gray-500">{new Date(lote.dataValidade).toLocaleDateString("pt-BR")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="lotes" className="space-y-6">
          <div className="bg-white rounded-lg shadow-default overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Número do Lote</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Insumo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantidade</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fornecedor</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Local</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Validade</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lotes.map((lote) => {
                    const hoje = new Date();
                    const dataValidade = new Date(lote.dataValidade);
                    const diasRestantes = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                    const vencido = dataValidade < hoje;
                    const proximoVencimento = diasRestantes <= 90 && !vencido;
                    const insumo = insumos.find((i) => i.id === lote.insumoId);
                    
                    return (
                      <tr key={lote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{lote.numeroLote}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{getInsumoNome(lote.insumoId)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {lote.quantidade} {insumo?.unidadeMedida}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{getFornecedorNome(lote.fornecedorId)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            {getLocalNome(lote.localArmazenamentoId)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className={`text-sm ${vencido ? "text-red-600 font-semibold" : proximoVencimento ? "text-orange-600 font-semibold" : "text-gray-600"}`}>
                              {dataValidade.toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {vencido ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Vencido
                            </span>
                          ) : proximoVencimento ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {diasRestantes} dias
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Válido
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
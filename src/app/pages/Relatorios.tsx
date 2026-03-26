import { FileText, Download, Calendar, TrendingUp, Package, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";

export function Relatorios() {
  const handleGenerateReport = (reportType: string) => {
    toast.success(`Relatório de ${reportType} gerado com sucesso!`);
  };

  const relatorios = [
    {
      id: "saldo",
      titulo: "Saldo de Estoque",
      descricao: "Relatório completo de saldos atuais por insumo e localização",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "movimentacao",
      titulo: "Movimentação de Estoque",
      descricao: "Histórico detalhado de todas as movimentações em um período",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "validade",
      titulo: "Controle de Validade",
      descricao: "Lotes por data de vencimento e alertas de validade",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "consumo",
      titulo: "Consumo de Insumos",
      descricao: "Análise de consumo por período, setor e categoria",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "inventario",
      titulo: "Inventário",
      descricao: "Relatório para conferência física de estoque",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "fornecedores",
      titulo: "Fornecedores",
      descricao: "Relação de fornecedores e histórico de compras",
      icon: FileText,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Geração de relatórios gerenciais e operacionais</p>
      </div>

      {/* Relatórios Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatorios.map((relatorio) => {
          const Icon = relatorio.icon;
          
          return (
            <Card key={relatorio.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${relatorio.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{relatorio.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.descricao}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleGenerateReport(relatorio.titulo)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Relatório Personalizado */}
      <div className="bg-white rounded-lg shadow-default p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-gray-900">Relatório Personalizado</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Relatório</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saldo">Saldo de Estoque</SelectItem>
                <SelectItem value="movimentacao">Movimentação</SelectItem>
                <SelectItem value="validade">Validade</SelectItem>
                <SelectItem value="consumo">Consumo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodo">Período</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Última Semana</SelectItem>
                <SelectItem value="mes">Último Mês</SelectItem>
                <SelectItem value="trimestre">Último Trimestre</SelectItem>
                <SelectItem value="ano">Último Ano</SelectItem>
                <SelectItem value="personalizado">Período Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="formato">Formato</Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria (Opcional)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Categorias</SelectItem>
                <SelectItem value="1">Medicamentos</SelectItem>
                <SelectItem value="2">Material Cirúrgico</SelectItem>
                <SelectItem value="3">EPI</SelectItem>
                <SelectItem value="4">Descartáveis</SelectItem>
                <SelectItem value="5">Material de Curativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="local">Local (Opcional)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Locais</SelectItem>
                <SelectItem value="1">Almoxarifado Central</SelectItem>
                <SelectItem value="2">Farmácia</SelectItem>
                <SelectItem value="3">Centro Cirúrgico</SelectItem>
                <SelectItem value="4">UTI</SelectItem>
                <SelectItem value="5">Pronto Socorro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agrupamento">Agrupamento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="categoria">Por Categoria</SelectItem>
                <SelectItem value="local">Por Local</SelectItem>
                <SelectItem value="fornecedor">Por Fornecedor</SelectItem>
                <SelectItem value="data">Por Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => handleGenerateReport("Personalizado")}>
            <Download className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
          <Button variant="outline">
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Relatórios Recentes */}
      <div className="bg-white rounded-lg shadow-default p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Relatórios Gerados Recentemente</h3>
        <div className="space-y-3">
          {[
            { nome: "Saldo de Estoque - Março 2026", data: "12/03/2026 10:30", formato: "PDF" },
            { nome: "Movimentação - Fevereiro 2026", data: "01/03/2026 14:15", formato: "Excel" },
            { nome: "Controle de Validade", data: "28/02/2026 09:00", formato: "PDF" },
            { nome: "Consumo por Categoria - Q1 2026", data: "25/02/2026 16:45", formato: "Excel" },
          ].map((relatorio, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{relatorio.nome}</div>
                  <div className="text-xs text-gray-500">{relatorio.data}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{relatorio.formato}</span>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

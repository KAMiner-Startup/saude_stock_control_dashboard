import { useState } from "react";
import { Plus, Search, ArrowDownCircle, ArrowUpCircle, ArrowRightLeft, Wrench, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { movimentacoes, insumos, locaisArmazenamento, lotes, getInsumoNome, getLocalNome } from "../lib/data";
import { toast } from "sonner";

export function Movimentacoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida" | "transferencia" | "ajuste">("entrada");
  const [filterTipo, setFilterTipo] = useState<string>("todos");

  const filteredMovimentacoes = movimentacoes.filter((mov) => {
    const matchSearch = getInsumoNome(mov.insumoId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterTipo === "todos" || mov.tipo === filterTipo;
    return matchSearch && matchFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Movimentação registrada com sucesso!");
    setOpen(false);
  };

  const getMovimentacaoIcon = (tipo: string) => {
    switch (tipo) {
      case "entrada":
        return <ArrowDownCircle className="w-4 h-4 text-green-600" />;
      case "saida":
        return <ArrowUpCircle className="w-4 h-4 text-red-600" />;
      case "transferencia":
        return <ArrowRightLeft className="w-4 h-4 text-blue-600" />;
      case "ajuste":
        return <Wrench className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getMovimentacaoColor = (tipo: string) => {
    switch (tipo) {
      case "entrada":
        return "bg-green-100 text-green-800";
      case "saida":
        return "bg-red-100 text-red-800";
      case "transferencia":
        return "bg-blue-100 text-blue-800";
      case "ajuste":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movimentações de Estoque</h1>
          <p className="text-gray-600 mt-1">Controle de entradas, saídas e transferências</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Movimentação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Movimentação</DialogTitle>
              <DialogDescription>Selecione o tipo e preencha as informações da movimentação</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Tabs value={tipoMovimentacao} onValueChange={(v) => setTipoMovimentacao(v as any)} className="py-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="entrada">Entrada</TabsTrigger>
                  <TabsTrigger value="saida">Saída</TabsTrigger>
                  <TabsTrigger value="transferencia">Transferência</TabsTrigger>
                  <TabsTrigger value="ajuste">Ajuste</TabsTrigger>
                </TabsList>

                <TabsContent value="entrada" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insumo">Insumo *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o insumo" />
                        </SelectTrigger>
                        <SelectContent>
                          {insumos.map((insumo) => (
                            <SelectItem key={insumo.id} value={insumo.id}>
                              {insumo.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade *</Label>
                      <Input id="quantidade" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lote">Número do Lote *</Label>
                      <Input id="lote" placeholder="LOT-2024-001" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validade">Data de Validade *</Label>
                      <Input id="validade" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="local">Local de Destino *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {locaisArmazenamento.map((local) => (
                            <SelectItem key={local.id} value={local.id}>
                              {local.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compra">Compra</SelectItem>
                          <SelectItem value="doacao">Doação</SelectItem>
                          <SelectItem value="transferencia_interna">Transferência Interna</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="obs">Observações</Label>
                      <Textarea id="obs" placeholder="Informações adicionais" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="saida" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insumo">Insumo *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o insumo" />
                        </SelectTrigger>
                        <SelectContent>
                          {insumos.map((insumo) => (
                            <SelectItem key={insumo.id} value={insumo.id}>
                              {insumo.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade *</Label>
                      <Input id="quantidade" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lote_saida">Lote *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o lote" />
                        </SelectTrigger>
                        <SelectContent>
                          {lotes.map((lote) => (
                            <SelectItem key={lote.id} value={lote.id}>
                              {lote.numeroLote}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="local_origem">Local de Origem *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {locaisArmazenamento.map((local) => (
                            <SelectItem key={local.id} value={local.id}>
                              {local.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="motivo_saida">Motivo da Saída</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consumo">Consumo</SelectItem>
                          <SelectItem value="descarte">Descarte</SelectItem>
                          <SelectItem value="vencimento">Vencimento</SelectItem>
                          <SelectItem value="dano">Dano/Perda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="obs">Observações</Label>
                      <Textarea id="obs" placeholder="Informações adicionais" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transferencia" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insumo">Insumo *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o insumo" />
                        </SelectTrigger>
                        <SelectContent>
                          {insumos.map((insumo) => (
                            <SelectItem key={insumo.id} value={insumo.id}>
                              {insumo.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade *</Label>
                      <Input id="quantidade" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origem">Local de Origem *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {locaisArmazenamento.map((local) => (
                            <SelectItem key={local.id} value={local.id}>
                              {local.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destino">Local de Destino *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {locaisArmazenamento.map((local) => (
                            <SelectItem key={local.id} value={local.id}>
                              {local.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="obs">Observações</Label>
                      <Textarea id="obs" placeholder="Informações adicionais" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ajuste" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insumo">Insumo *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o insumo" />
                        </SelectTrigger>
                        <SelectContent>
                          {insumos.map((insumo) => (
                            <SelectItem key={insumo.id} value={insumo.id}>
                              {insumo.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Ajuste (+ ou -) *</Label>
                      <Input id="quantidade" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="local_ajuste">Local *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {locaisArmazenamento.map((local) => (
                            <SelectItem key={local.id} value={local.id}>
                              {local.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivo_ajuste">Motivo do Ajuste</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inventario">Ajuste de Inventário</SelectItem>
                          <SelectItem value="dano">Dano/Perda</SelectItem>
                          <SelectItem value="correcao">Correção de Lançamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="obs">Observações *</Label>
                      <Textarea id="obs" placeholder="Justificativa do ajuste" required />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Registrar Movimentação
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-default p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar movimentação..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="pl-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="saida">Saídas</SelectItem>
                <SelectItem value="transferencia">Transferências</SelectItem>
                <SelectItem value="ajuste">Ajustes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-default overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Insumo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovimentacoes.map((mov) => (
                <tr key={mov.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(mov.data).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getMovimentacaoIcon(mov.tipo)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMovimentacaoColor(mov.tipo)}`}>
                        {mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {getInsumoNome(mov.insumoId)}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {mov.quantidade > 0 ? "+" : ""}{mov.quantidade}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {mov.tipo === "transferencia" 
                      ? `${getLocalNome(mov.localOrigemId!)} → ${getLocalNome(mov.localDestinoId!)}`
                      : getLocalNome(mov.localOrigemId || mov.localDestinoId || "")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{mov.responsavel}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{mov.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Mostrando {filteredMovimentacoes.length} de {movimentacoes.length} movimentações
      </div>
    </div>
  );
}
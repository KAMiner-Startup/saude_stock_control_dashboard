import { useState } from "react";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { insumos, categorias, getCategoriaNome, type Insumo } from "../lib/data";
import { toast } from "sonner";

export function Insumos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);

  const filteredInsumos = insumos.filter(
    (insumo) =>
      insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insumo.codigoInterno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInsumo) {
      toast.success("Insumo atualizado com sucesso!");
    } else {
      toast.success("Insumo cadastrado com sucesso!");
    }
    setOpen(false);
    setEditingInsumo(null);
  };

  const handleEdit = (insumo: Insumo) => {
    setEditingInsumo(insumo);
    setOpen(true);
  };

  const handleDelete = (insumo: Insumo) => {
    toast.success(`Insumo "${insumo.nome}" excluído com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Insumos</h1>
          <p className="text-gray-600 mt-1">Cadastro e gerenciamento de insumos hospitalares</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="leading-none">Novo Insumo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingInsumo ? "Editar Insumo" : "Cadastrar Novo Insumo"}</DialogTitle>
              <DialogDescription>
                {editingInsumo ? "Atualize as informações do insumo" : "Preencha as informações do novo insumo"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input id="nome" defaultValue={editingInsumo?.nome} placeholder="Ex: Dipirona 500mg" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código Interno *</Label>
                  <Input id="codigo" defaultValue={editingInsumo?.codigoInterno} placeholder="Ex: MED-001" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input id="descricao" defaultValue={editingInsumo?.descricao} placeholder="Descrição do insumo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select defaultValue={editingInsumo?.categoriaId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unidade">Unidade de Medida *</Label>
                  <Select defaultValue={editingInsumo?.unidadeMedida}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unidade">Unidade</SelectItem>
                      <SelectItem value="comprimido">Comprimido</SelectItem>
                      <SelectItem value="frasco">Frasco</SelectItem>
                      <SelectItem value="caixa">Caixa</SelectItem>
                      <SelectItem value="pacote">Pacote</SelectItem>
                      <SelectItem value="par">Par</SelectItem>
                      <SelectItem value="litro">Litro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estoqueMinimo">Estoque Mínimo *</Label>
                  <Input id="estoqueMinimo" type="number" defaultValue={editingInsumo?.estoqueMinimo} placeholder="100" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estoqueAtual">Estoque Atual</Label>
                  <Input id="estoqueAtual" type="number" defaultValue={editingInsumo?.estoqueAtual} placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setOpen(false); setEditingInsumo(null); }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  {editingInsumo ? "Atualizar" : "Cadastrar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-default p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou código..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-default overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unidade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque Atual</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque Mín.</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInsumos.map((insumo) => {
                const estoqueBaixo = insumo.estoqueAtual <= insumo.estoqueMinimo;
                
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
                    <td className="px-6 py-4 text-sm text-gray-600">{insumo.unidadeMedida}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${estoqueBaixo ? "text-red-600" : "text-gray-900"}`}>
                        {insumo.estoqueAtual}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{insumo.estoqueMinimo}</td>
                    <td className="px-6 py-4">
                      {estoqueBaixo ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Baixo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="ghost" size="sm" className="flex items-center justify-center" onClick={() => handleEdit(insumo)}>
                          <Edit className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center justify-center" onClick={() => handleDelete(insumo)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Mostrando {filteredInsumos.length} de {insumos.length} insumos
      </div>
    </div>
  );
}
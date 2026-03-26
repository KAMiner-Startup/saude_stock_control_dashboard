import { useState } from "react";
import { Plus, Search, Edit, Trash2, Building2, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { fornecedores, type Fornecedor } from "../lib/data";
import { toast } from "sonner";

export function Fornecedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFornecedor) {
      toast.success("Fornecedor atualizado com sucesso!");
    } else {
      toast.success("Fornecedor cadastrado com sucesso!");
    }
    setOpen(false);
    setEditingFornecedor(null);
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    setOpen(true);
  };

  const handleDelete = (fornecedor: Fornecedor) => {
    toast.success(`Fornecedor "${fornecedor.razaoSocial}" excluído com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Fornecedores</h1>
          <p className="text-gray-600 mt-1">Cadastro e gerenciamento de fornecedores</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFornecedor ? "Editar Fornecedor" : "Cadastrar Novo Fornecedor"}</DialogTitle>
              <DialogDescription>
                {editingFornecedor ? "Atualize as informações do fornecedor" : "Preencha as informações do novo fornecedor"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" defaultValue={editingFornecedor?.cnpj} placeholder="00.000.000/0000-00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social *</Label>
                  <Input id="razaoSocial" defaultValue={editingFornecedor?.razaoSocial} placeholder="Nome da empresa" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contato">Nome do Contato</Label>
                  <Input id="contato" defaultValue={editingFornecedor?.contato} placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue={editingFornecedor?.telefone} placeholder="(00) 0000-0000" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue={editingFornecedor?.email} placeholder="contato@empresa.com" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Textarea id="endereco" defaultValue={editingFornecedor?.endereco} placeholder="Endereço completo" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setOpen(false); setEditingFornecedor(null); }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  {editingFornecedor ? "Atualizar" : "Cadastrar"}
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
            placeholder="Buscar por razão social ou CNPJ..."
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CNPJ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Razão Social</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFornecedores.map((fornecedor) => (
                <tr key={fornecedor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{fornecedor.cnpj}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{fornecedor.razaoSocial}</div>
                        <div className="text-xs text-gray-500">{fornecedor.endereco}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fornecedor.contato}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {fornecedor.telefone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3 text-gray-400" />
                      {fornecedor.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(fornecedor)}>
                      <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(fornecedor)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Mostrando {filteredFornecedores.length} de {fornecedores.length} fornecedores
      </div>
    </div>
  );
}
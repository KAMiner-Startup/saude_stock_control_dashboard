import { useState } from "react";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { categorias, type Categoria } from "../lib/data";
import { toast } from "sonner";

export function Categorias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategoria) {
      toast.success("Categoria atualizada com sucesso!");
    } else {
      toast.success("Categoria cadastrada com sucesso!");
    }
    setOpen(false);
    setEditingCategoria(null);
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setOpen(true);
  };

  const handleDelete = (categoria: Categoria) => {
    toast.success(`Categoria "${categoria.nome}" excluída com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorias de Insumos</h1>
          <p className="text-gray-600 mt-1">Gerenciar categorias de medicamentos e materiais</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategoria ? "Editar Categoria" : "Cadastrar Nova Categoria"}</DialogTitle>
              <DialogDescription>
                {editingCategoria ? "Atualize as informações da categoria" : "Preencha as informações da nova categoria"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input id="nome" defaultValue={editingCategoria?.nome} placeholder="Ex: Medicamentos" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input id="descricao" defaultValue={editingCategoria?.descricao} placeholder="Descrição da categoria" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cor">Cor de Identificação</Label>
                  <Input id="cor" type="color" defaultValue={editingCategoria?.cor || "#4F46E5"} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setOpen(false); setEditingCategoria(null); }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  {editingCategoria ? "Atualizar" : "Cadastrar"}
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
            placeholder="Buscar categoria..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategorias.map((categoria) => (
          <div key={categoria.id} className="bg-white rounded-lg shadow-default p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${categoria.cor}20` }}>
                  <Tag className="w-5 h-5" style={{ color: categoria.cor }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{categoria.nome}</h3>
                  <p className="text-sm text-gray-500 mt-1">{categoria.descricao}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: categoria.cor }}></div>
                <span className="text-xs text-gray-500">{categoria.cor}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(categoria)}>
                  <Edit className="w-4 h-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(categoria)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        Mostrando {filteredCategorias.length} de {categorias.length} categorias
      </div>
    </div>
  );
}
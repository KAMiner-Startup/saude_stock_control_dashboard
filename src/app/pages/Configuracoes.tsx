import { useState } from "react";
import { Plus, Search, Edit, Trash2, MapPin, Settings as SettingsIcon, Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { locaisArmazenamento, type LocalArmazenamento } from "../lib/data";
import { toast } from "sonner";

export function Configuracoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingLocal, setEditingLocal] = useState<LocalArmazenamento | null>(null);

  const filteredLocais = locaisArmazenamento.filter((local) =>
    local.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLocal) {
      toast.success("Local atualizado com sucesso!");
    } else {
      toast.success("Local cadastrado com sucesso!");
    }
    setOpen(false);
    setEditingLocal(null);
  };

  const handleEdit = (local: LocalArmazenamento) => {
    setEditingLocal(local);
    setOpen(true);
  };

  const handleDelete = (local: LocalArmazenamento) => {
    toast.success(`Local "${local.nome}" excluído com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-1">Gerenciar parâmetros e configurações do sistema</p>
      </div>

      <Tabs defaultValue="locais" className="space-y-6">
        <TabsList>
          <TabsTrigger value="locais">Locais de Armazenamento</TabsTrigger>
          <TabsTrigger value="alertas">Configuração de Alertas</TabsTrigger>
          <TabsTrigger value="parametros">Parâmetros Gerais</TabsTrigger>
        </TabsList>

        <TabsContent value="locais" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Cadastrar e gerenciar locais de armazenamento</p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Local
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingLocal ? "Editar Local" : "Cadastrar Novo Local"}</DialogTitle>
                  <DialogDescription>
                    {editingLocal ? "Atualize as informações do local" : "Preencha as informações do novo local"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome do Local *</Label>
                      <Input id="nome" defaultValue={editingLocal?.nome} placeholder="Ex: Almoxarifado Central" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo *</Label>
                      <Select defaultValue={editingLocal?.tipo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Almoxarifado">Almoxarifado</SelectItem>
                          <SelectItem value="Farmácia">Farmácia</SelectItem>
                          <SelectItem value="Setor Clínico">Setor Clínico</SelectItem>
                          <SelectItem value="Depósito">Depósito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea id="descricao" defaultValue={editingLocal?.descricao} placeholder="Descrição do local" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => { setOpen(false); setEditingLocal(null); }}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      {editingLocal ? "Atualizar" : "Cadastrar"}
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
                placeholder="Buscar local..."
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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLocais.map((local) => (
                    <tr key={local.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{local.nome}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {local.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{local.descricao}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(local)}>
                          <Edit className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(local)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-6">
          <div className="bg-white rounded-lg shadow-default p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Configuração de Alertas</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Alertas de Estoque Mínimo</div>
                  <div className="text-sm text-gray-600 mt-1">Notificar quando o estoque atingir o nível mínimo</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Alertas de Validade</div>
                  <div className="text-sm text-gray-600 mt-1">Notificar sobre lotes próximos ao vencimento</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="diasAlerta">Dias de Antecedência para Alerta de Validade</Label>
                <Input id="diasAlerta" type="number" defaultValue="90" />
                <p className="text-xs text-gray-500">Notificar quando faltarem X dias para o vencimento</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Alertas de Movimentação</div>
                  <div className="text-sm text-gray-600 mt-1">Notificar sobre movimentações importantes</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">E-mail de Alertas</div>
                  <div className="text-sm text-gray-600 mt-1">Enviar alertas por e-mail</div>
                </div>
                <Switch />
              </div>

              <div className="pt-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parametros" className="space-y-6">
          <div className="bg-white rounded-lg shadow-default p-6">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Parâmetros Gerais</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="hospital">Nome do Hospital</Label>
                <Input id="hospital" defaultValue="Hospital Municipal" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="responsavel">Responsável pelo Sistema</Label>
                <Input id="responsavel" defaultValue="Administrador Sistema" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email">E-mail de Contato</Label>
                <Input id="email" type="email" defaultValue="admin@hospital.com.br" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="america_sao_paulo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america_sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="america_manaus">América/Manaus (GMT-4)</SelectItem>
                    <SelectItem value="america_rio_branco">América/Rio Branco (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="idioma">Idioma do Sistema</Label>
                <Select defaultValue="pt_br">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt_br">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Modo Escuro</div>
                  <div className="text-sm text-gray-600 mt-1">Ativar tema escuro do sistema</div>
                </div>
                <Switch />
              </div>

              <div className="pt-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock data for the hospital inventory system

export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
}

export interface Fornecedor {
  id: string;
  cnpj: string;
  razaoSocial: string;
  contato: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface LocalArmazenamento {
  id: string;
  nome: string;
  descricao: string;
  tipo: string;
}

export interface Insumo {
  id: string;
  nome: string;
  descricao: string;
  codigoInterno: string;
  unidadeMedida: string;
  categoriaId: string;
  estoqueMinimo: number;
  estoqueAtual: number;
}

export interface Lote {
  id: string;
  insumoId: string;
  numeroLote: string;
  dataValidade: string;
  quantidade: number;
  fornecedorId: string;
  localArmazenamentoId: string;
}

export interface Movimentacao {
  id: string;
  insumoId: string;
  tipo: "entrada" | "saida" | "transferencia" | "ajuste";
  quantidade: number;
  loteId?: string;
  data: string;
  responsavel: string;
  localOrigemId?: string;
  localDestinoId?: string;
  motivo?: string;
  observacoes?: string;
}

// Mock data
export const categorias: Categoria[] = [
  { id: "1", nome: "Medicamentos", descricao: "Medicamentos e fármacos", cor: "#3B82F6" },
  { id: "2", nome: "Material Cirúrgico", descricao: "Instrumentos e materiais cirúrgicos", cor: "#8B5CF6" },
  { id: "3", nome: "EPI", descricao: "Equipamentos de Proteção Individual", cor: "#10B981" },
  { id: "4", nome: "Descartáveis", descricao: "Materiais descartáveis", cor: "#F59E0B" },
  { id: "5", nome: "Material de Curativo", descricao: "Gazes, ataduras e curativos", cor: "#EC4899" },
];

export const fornecedores: Fornecedor[] = [
  {
    id: "1",
    cnpj: "12.345.678/0001-90",
    razaoSocial: "Farmacêutica São Lucas Ltda",
    contato: "Maria Silva",
    telefone: "(11) 3456-7890",
    email: "contato@saolucas.com.br",
    endereco: "Av. Paulista, 1000 - São Paulo/SP",
  },
  {
    id: "2",
    cnpj: "98.765.432/0001-10",
    razaoSocial: "Distribuidora MedSupply",
    contato: "João Santos",
    telefone: "(11) 2345-6789",
    email: "vendas@medsupply.com.br",
    endereco: "Rua da Saúde, 500 - São Paulo/SP",
  },
  {
    id: "3",
    cnpj: "45.678.901/0001-23",
    razaoSocial: "EPI Total Equipamentos",
    contato: "Ana Costa",
    telefone: "(11) 4567-8901",
    email: "contato@epitotal.com.br",
    endereco: "Rua Industrial, 250 - Guarulhos/SP",
  },
];

export const locaisArmazenamento: LocalArmazenamento[] = [
  { id: "1", nome: "Almoxarifado Central", descricao: "Depósito principal", tipo: "Almoxarifado" },
  { id: "2", nome: "Farmácia", descricao: "Farmácia hospitalar", tipo: "Farmácia" },
  { id: "3", nome: "Centro Cirúrgico", descricao: "Estoque do centro cirúrgico", tipo: "Setor Clínico" },
  { id: "4", nome: "UTI", descricao: "Estoque da UTI", tipo: "Setor Clínico" },
  { id: "5", nome: "Pronto Socorro", descricao: "Estoque do PS", tipo: "Setor Clínico" },
];

export const insumos: Insumo[] = [
  {
    id: "1",
    nome: "Dipirona 500mg",
    descricao: "Analgésico e antitérmico",
    codigoInterno: "MED-001",
    unidadeMedida: "comprimido",
    categoriaId: "1",
    estoqueMinimo: 500,
    estoqueAtual: 1250,
  },
  {
    id: "2",
    nome: "Luva Cirúrgica Estéril",
    descricao: "Luva de látex estéril tamanho M",
    codigoInterno: "CIR-015",
    unidadeMedida: "par",
    categoriaId: "2",
    estoqueMinimo: 200,
    estoqueAtual: 180,
  },
  {
    id: "3",
    nome: "Máscara N95",
    descricao: "Máscara de proteção respiratória",
    codigoInterno: "EPI-008",
    unidadeMedida: "unidade",
    categoriaId: "3",
    estoqueMinimo: 300,
    estoqueAtual: 250,
  },
  {
    id: "4",
    nome: "Seringa 10ml",
    descricao: "Seringa descartável 10ml",
    codigoInterno: "DESC-022",
    unidadeMedida: "unidade",
    categoriaId: "4",
    estoqueMinimo: 1000,
    estoqueAtual: 1500,
  },
  {
    id: "5",
    nome: "Gaze Estéril",
    descricao: "Gaze estéril 7,5cm x 7,5cm",
    codigoInterno: "CUR-005",
    unidadeMedida: "pacote",
    categoriaId: "5",
    estoqueMinimo: 150,
    estoqueAtual: 120,
  },
  {
    id: "6",
    nome: "Paracetamol 750mg",
    descricao: "Analgésico e antitérmico",
    codigoInterno: "MED-002",
    unidadeMedida: "comprimido",
    categoriaId: "1",
    estoqueMinimo: 400,
    estoqueAtual: 850,
  },
  {
    id: "7",
    nome: "Álcool Gel 70%",
    descricao: "Álcool gel para higienização das mãos",
    codigoInterno: "EPI-012",
    unidadeMedida: "frasco",
    categoriaId: "3",
    estoqueMinimo: 100,
    estoqueAtual: 85,
  },
  {
    id: "8",
    nome: "Cateter Venoso Periférico",
    descricao: "Cateter 22G",
    codigoInterno: "DESC-045",
    unidadeMedida: "unidade",
    categoriaId: "4",
    estoqueMinimo: 200,
    estoqueAtual: 320,
  },
];

export const lotes: Lote[] = [
  {
    id: "1",
    insumoId: "1",
    numeroLote: "LOT-2024-001",
    dataValidade: "2026-08-15",
    quantidade: 500,
    fornecedorId: "1",
    localArmazenamentoId: "2",
  },
  {
    id: "2",
    insumoId: "1",
    numeroLote: "LOT-2024-045",
    dataValidade: "2026-12-20",
    quantidade: 750,
    fornecedorId: "1",
    localArmazenamentoId: "2",
  },
  {
    id: "3",
    insumoId: "2",
    numeroLote: "LOT-2025-012",
    dataValidade: "2026-06-10",
    quantidade: 180,
    fornecedorId: "2",
    localArmazenamentoId: "3",
  },
  {
    id: "4",
    insumoId: "3",
    numeroLote: "LOT-2025-089",
    dataValidade: "2027-03-25",
    quantidade: 250,
    fornecedorId: "3",
    localArmazenamentoId: "1",
  },
  {
    id: "5",
    insumoId: "7",
    numeroLote: "LOT-2025-156",
    dataValidade: "2026-04-15",
    quantidade: 85,
    fornecedorId: "3",
    localArmazenamentoId: "5",
  },
];

export const movimentacoes: Movimentacao[] = [
  {
    id: "1",
    insumoId: "1",
    tipo: "entrada",
    quantidade: 500,
    loteId: "1",
    data: "2026-02-15T10:30:00",
    responsavel: "Carlos Mendes",
    localDestinoId: "2",
    motivo: "Compra",
    observacoes: "Entrada regular de estoque",
  },
  {
    id: "2",
    insumoId: "3",
    tipo: "saida",
    quantidade: 50,
    loteId: "4",
    data: "2026-03-01T14:20:00",
    responsavel: "Ana Paula",
    localOrigemId: "1",
    motivo: "Consumo - UTI",
    observacoes: "Reposição de estoque da UTI",
  },
  {
    id: "3",
    insumoId: "2",
    tipo: "entrada",
    quantidade: 200,
    loteId: "3",
    data: "2026-02-20T09:15:00",
    responsavel: "Roberto Silva",
    localDestinoId: "3",
    motivo: "Compra",
  },
  {
    id: "4",
    insumoId: "4",
    tipo: "transferencia",
    quantidade: 100,
    data: "2026-03-05T11:00:00",
    responsavel: "Juliana Costa",
    localOrigemId: "1",
    localDestinoId: "5",
    motivo: "Transferência entre setores",
  },
  {
    id: "5",
    insumoId: "5",
    tipo: "ajuste",
    quantidade: -30,
    data: "2026-03-08T16:45:00",
    responsavel: "Fernando Alves",
    localOrigemId: "1",
    motivo: "Ajuste de inventário",
    observacoes: "Correção após contagem física",
  },
];

// Helper functions
export function getCategoriaNome(id: string): string {
  return categorias.find((c) => c.id === id)?.nome || "Não especificada";
}

export function getFornecedorNome(id: string): string {
  return fornecedores.find((f) => f.id === id)?.razaoSocial || "Não especificado";
}

export function getLocalNome(id: string): string {
  return locaisArmazenamento.find((l) => l.id === id)?.nome || "Não especificado";
}

export function getInsumoNome(id: string): string {
  return insumos.find((i) => i.id === id)?.nome || "Não especificado";
}

// Alert functions
export function getInsumosEstoqueBaixo(): Insumo[] {
  return insumos.filter((i) => i.estoqueAtual <= i.estoqueMinimo);
}

export function getLotesProximosVencimento(diasLimite: number = 90): Lote[] {
  const hoje = new Date();
  const dataLimite = new Date();
  dataLimite.setDate(hoje.getDate() + diasLimite);

  return lotes.filter((lote) => {
    const dataValidade = new Date(lote.dataValidade);
    return dataValidade <= dataLimite && dataValidade >= hoje;
  });
}

export function getLotesVencidos(): Lote[] {
  const hoje = new Date();
  return lotes.filter((lote) => {
    const dataValidade = new Date(lote.dataValidade);
    return dataValidade < hoje;
  });
}

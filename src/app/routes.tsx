import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./pages/Dashboard";
import { Insumos } from "./pages/Insumos";
import { Categorias } from "./pages/Categorias";
import { Fornecedores } from "./pages/Fornecedores";
import { Movimentacoes } from "./pages/Movimentacoes";
import { Estoque } from "./pages/Estoque";
import { Relatorios } from "./pages/Relatorios";
import { Configuracoes } from "./pages/Configuracoes";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "insumos", Component: Insumos },
      { path: "categorias", Component: Categorias },
      { path: "fornecedores", Component: Fornecedores },
      { path: "movimentacoes", Component: Movimentacoes },
      { path: "estoque", Component: Estoque },
      { path: "relatorios", Component: Relatorios },
      { path: "configuracoes", Component: Configuracoes },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: "/saude_stock_control_dashboard/"
});

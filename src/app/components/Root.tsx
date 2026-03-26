import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Bell,
  LayoutDashboard,
  Package,
  Tag,
  Users,
  FileText,
  Settings,
  TrendingUp,
  Warehouse,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Image from "../components/figma/ImageWithFallback";
import avatarImg from "../../assets/persona.jpeg";
import { Button } from "../components/ui/button";

export function Root() {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard, section: "PRINCIPAL" },
    { path: "/estoque", label: "Monitoramento de Estoque", icon: TrendingUp, section: "MONITORAMENTO" },
    { path: "/insumos", label: "Insumos", icon: Package, section: "GESTÃO" },
    { path: "/categorias", label: "Categorias", icon: Tag, section: "GESTÃO" },
    { path: "/fornecedores", label: "Fornecedores", icon: Users, section: "GESTÃO" },
    { path: "/movimentacoes", label: "Movimentações", icon: Warehouse, section: "GESTÃO" },
    { path: "/relatorios", label: "Relatórios", icon: FileText, section: "RELATÓRIOS" },
    { path: "/configuracoes", label: "Configurações", icon: Settings, section: "CONFIGURAÇÕES" },
  ];

  let currentSection = "";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-white transition-all duration-300 ease-in-out ${collapsed ? "w-[80px]" : "w-64"}`}
      >
        {/* Botão flutuante de toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3.5 top-24 z-50 h-7 w-7 rounded-full bg-card cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white flex items-center justify-center"
          style={{ boxShadow: "var(--shadow-float)", border: "1px solid oklch(0.92 0.006 247)" }}
          aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
        </button>
        <nav className="flex-1 overflow-y-auto p-4 pt-6">
          {navItems.map((item) => {
            const showSection = currentSection !== item.section;
            currentSection = item.section;
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.path}>
                {showSection && !collapsed && (
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                    {item.section}
                  </div>
                )}
                <Link
                  to={item.path}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 mb-1 ${
                    active
                      ? "bg-primary/8 text-primary font-semibold"
                      : "text-muted-foreground font-medium hover:bg-muted/70 hover:text-foreground"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`shrink-0 transition-colors ${collapsed ? "h-5 w-5" : "h-4 w-4"} ${
                      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    strokeWidth={1.25}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="px-3 py-3">
          {!collapsed && (
            <p className="text-[11px] text-muted-foreground/60 text-center">v1.0.0</p>
          )}
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
              {/* Logo com gradiente identidade */}
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--gradient-brand, linear-gradient(135deg, #6366f1 0%, #06b6d4 100%))",
                  boxShadow: "0 4px 12px oklch(0.38 0.19 264 / 0.30)"
                }}
              >
                <Package className="w-4 h-4 text-white" strokeWidth={1.25} />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-semibold leading-tight tracking-tight" style={{ color: "#0f172a" }}>
                  Sistema de Controle de Estoque
                </span>
                <span className="text-[11px] text-muted-foreground leading-tight">Dashboard Hospitalar</span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Notificações */}
            {(() => {
              // Exemplo: calcule alertasPendentes a partir de dados reais se possível
              const alertasPendentes = 3;
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted/80 cursor-pointer">
                      <Bell className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.25} />
                      {alertasPendentes > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold px-1">
                          {alertasPendentes > 9 ? "9+" : alertasPendentes}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notificações</span>
                      {alertasPendentes > 0 && (
                        <span className="text-xs text-muted-foreground">{alertasPendentes} novos</span>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <a href="/movimentacoes" className="flex flex-col items-start gap-1 p-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive" />
                            <span className="font-medium text-sm">Baixo estoque</span>
                          </div>
                          <span className="text-xs text-muted-foreground pl-4">Dipirona 500mg - há 2 horas</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <a href="/movimentacoes" className="flex flex-col items-start gap-1 p-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive" />
                            <span className="font-medium text-sm">Lote próximo ao vencimento</span>
                          </div>
                          <span className="text-xs text-muted-foreground pl-4">Lote 2024-001 - há 5 horas</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <a href="/movimentacoes" className="flex flex-col items-start gap-1 p-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="font-medium text-sm">Nova movimentação</span>
                          </div>
                          <span className="text-xs text-muted-foreground pl-4">Por João Silva - há 1 dia</span>
                        </a>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer justify-center">
                      <a href="/movimentacoes" className="text-primary text-sm font-medium">
                        Ver todas as movimentações
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })()}

            {/* Menu do Usuário */}
            {(() => {
              const nomeUsuario = "Administrador Sistema";
              const perfilUsuario = "Gestor Administrativo";
              const handleLogout = () => {
                window.location.href = "/saude_stock_control_dashboard/login";
              };
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2.5 px-2 rounded-full hover:bg-muted/80 cursor-pointer">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1.5px solid oklch(0.38 0.19 264 / 0.2)" }}>
                        <Image
                          src={avatarImg}
                          alt="Foto de perfil"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold leading-none text-foreground">{nomeUsuario}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{perfilUsuario}</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{nomeUsuario}</span>
                        <span className="text-xs font-normal text-muted-foreground">{perfilUsuario}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })()}
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
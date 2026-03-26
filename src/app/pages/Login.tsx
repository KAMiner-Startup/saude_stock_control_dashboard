import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Package } from "lucide-react";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulação de login
    setTimeout(() => {
      setLoading(false);
      // Redirecionar para o dashboard
      window.location.href = "/saude_stock_control_dashboard/";
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="login-bg" />
      <div className="login-bg-overlay" />
      <div className="login-content w-full flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 shadow-default flex flex-col items-center bg-white/90 backdrop-blur-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-2" style={{background: "var(--gradient-brand, linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)", boxShadow: "0 4px 12px oklch(0.38 0.19 264 / 0.30)"}}>
              <Package className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Estoque</h1>
            <span className="text-sm text-muted-foreground">Dashboard Hospitalar</span>
          </div>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <Input id="usuario" name="usuario" autoComplete="username" required placeholder="Digite seu usuário" />
            </div>
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <Input id="senha" name="senha" type="password" autoComplete="current-password" required placeholder="Digite sua senha" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

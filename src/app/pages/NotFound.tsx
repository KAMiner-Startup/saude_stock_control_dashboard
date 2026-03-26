import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">A página que você está procurando não existe.</p>
        <Link to="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Home className="w-4 h-4 mr-2" />
            Voltar para o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

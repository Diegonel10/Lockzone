import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, BarChart3, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Inicio', icon: BarChart3 },
    { path: '/apuestas-gratis', label: 'Apuestas Gratis', icon: Star },
    { path: '/apuestas-premium', label: 'Apuestas Premium', icon: Lock },
  ];

  return (
    <div className="flex min-h-screen flex-col sports-pattern">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BarChart3 className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-bold text-primary">Pronósticos Pro</span>
            </Link>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <nav className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  <link.icon className="inline-block h-4 w-4 mr-1 mb-0.5" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 md:hidden"
            >
              <nav className="flex flex-col space-y-4 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="inline-block h-4 w-4 mr-2" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-foreground/90 text-background/80">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <span className="text-lg font-bold">Pronósticos Pro</span>
              <p className="mt-2 text-sm text-background/70">
                Tus pronósticos deportivos diarios de confianza.
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider">Enlaces</span>
              <div className="mt-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                   <Link key={link.path} to={link.path} className="text-sm text-background/70 hover:text-background">
                    {link.label}
                   </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-background/20 pt-8 text-center">
            <p className="text-sm text-background/70">
              &copy; {new Date().getFullYear()} Pronósticos Pro. Todos los derechos reservados. Juega con responsabilidad.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
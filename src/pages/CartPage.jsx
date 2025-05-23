
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/CartItem';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

const CartPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const shippingCost = total > 50 ? 0 : 5.99;
  const totalWithShipping = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="flex justify-center mb-6">
            <ShoppingCart className="h-24 w-24 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has añadido productos a tu carrito. Explora nuestro catálogo para encontrar los mejores cortes de carne.
          </p>
          <Button asChild size="lg">
            <Link to="/productos">Ver Productos</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold">Productos en tu carrito</h2>
            </div>
            <AnimatePresence>
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
            <div className="p-4 border-t">
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearCart}
              >
                Vaciar carrito
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span>
                  {shippingCost === 0 
                    ? <span className="text-green-600">Gratis</span> 
                    : formatCurrency(shippingCost)}
                </span>
              </div>
              {shippingCost > 0 && (
                <div className="text-sm text-gray-500">
                  Envío gratis en pedidos superiores a {formatCurrency(50)}
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totalWithShipping)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mb-4"
              onClick={() => navigate('/checkout')}
            >
              Proceder al pago <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <Link to="/productos">
                <ShoppingBag className="mr-2 h-4 w-4" /> Seguir comprando
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 border-b border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img  
            className="h-full w-full object-cover object-center" 
            alt={item.name}
           src="https://images.unsplash.com/photo-1580139523366-36c0381704d4" />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatCurrency(item.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={handleDecrement}
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncrement}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeItem(item.id)}
          aria-label="Eliminar producto"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;

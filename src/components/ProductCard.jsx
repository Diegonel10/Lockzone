
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: product.weight
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="product-card"
    >
      <Link to={`/productos/${product.id}`}>
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative aspect-square overflow-hidden">
            <img  
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" 
              alt={`Imagen de ${product.name}`}
             src="https://images.unsplash.com/photo-1586718164347-e2ac79e64d6f" />
            {product.stock < 10 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                ¡Pocas unidades!
              </span>
            )}
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.weight}</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4 mr-1" /> Ver
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Añadir
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

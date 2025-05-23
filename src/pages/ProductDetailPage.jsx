
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getProductsByCategory } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
      
      // Get related products from the same category
      const related = getProductsByCategory(productData.category)
        .filter(p => p.id !== productData.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      navigate('/productos');
    }
  }, [id, navigate]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        weight: product.weight
      });
      
      // Show added animation
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center"
        onClick={() => navigate('/productos')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img  
            className="w-full h-auto object-cover" 
            alt={product.name}
           src="https://images.unsplash.com/photo-1586718164347-e2ac79e64d6f" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.weight}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-2">
              <span className="text-gray-700 mr-2">Categoría:</span>
              <span className="capitalize">{product.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Disponibilidad:</span>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? 'En stock' : 'Agotado'}
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="ml-2 text-sm text-red-500">
                  (Solo {product.stock} unidades disponibles)
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="mr-4">Cantidad:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full py-6 text-lg relative overflow-hidden"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdded}
            >
              {isAdded ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center"
                >
                  <Check className="mr-2 h-5 w-5" /> Añadido al carrito
                </motion.div>
              ) : (
                <span className="flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
                </span>
              )}
            </Button>
          </div>

          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Información de entrega</h3>
            <p className="text-sm text-gray-600">
              Entrega en 24 horas para pedidos realizados antes de las 18:00. Todos nuestros productos se envían en embalaje refrigerado para garantizar su frescura.
            </p>
          </Card>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

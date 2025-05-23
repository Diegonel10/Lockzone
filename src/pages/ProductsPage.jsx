
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectOption } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Nuestros Productos</h1>
        <p className="text-gray-600">
          Descubre nuestra selección de carnes premium, cuidadosamente seleccionadas para ofrecerte la mejor calidad.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="md:hidden">
            <Button onClick={toggleFilter} variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" /> Filtros
            </Button>
          </div>
          <div className={`md:flex gap-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mt-4 md:mt-0">
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <SelectOption value="all">Todas las categorías</SelectOption>
                {categories.map(category => (
                  <SelectOption key={category.id} value={category.id}>
                    {category.name}
                  </SelectOption>
                ))}
              </Select>
            </div>
            <div className="mt-4 md:mt-0">
              <Select value={sortBy} onChange={handleSortChange}>
                <SelectOption value="default">Ordenar por</SelectOption>
                <SelectOption value="price-asc">Precio: Menor a Mayor</SelectOption>
                <SelectOption value="price-desc">Precio: Mayor a Menor</SelectOption>
                <SelectOption value="name-asc">Nombre: A-Z</SelectOption>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No se encontraron productos</h2>
          <p className="text-gray-600 mb-4">
            Intenta con otra búsqueda o categoría diferente.
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}>
            Ver todos los productos
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductsPage;

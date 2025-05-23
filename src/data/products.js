
export const products = [
  {
    id: 1,
    name: "Bife de Chorizo Premium",
    description: "Corte jugoso y tierno, ideal para asar a la parrilla. Carne de res de primera calidad con excelente marmoleado.",
    price: 18.99,
    category: "res",
    image: "bife-chorizo.jpg",
    weight: "500g",
    popular: true,
    stock: 25
  },
  {
    id: 2,
    name: "Lomo Fino",
    description: "El corte más tierno de la res. Perfecto para preparar a la plancha o en medallones.",
    price: 22.99,
    category: "res",
    image: "lomo-fino.jpg",
    weight: "500g",
    popular: true,
    stock: 15
  },
  {
    id: 3,
    name: "Costillas de Cerdo",
    description: "Costillas de cerdo jugosas y sabrosas, ideales para asar a la parrilla o al horno.",
    price: 15.99,
    category: "cerdo",
    image: "costillas-cerdo.jpg",
    weight: "1kg",
    popular: true,
    stock: 20
  },
  {
    id: 4,
    name: "Pechuga de Pollo",
    description: "Pechuga de pollo fresca y sin piel. Versátil para múltiples preparaciones.",
    price: 9.99,
    category: "aves",
    image: "pechuga-pollo.jpg",
    weight: "800g",
    popular: false,
    stock: 30
  },
  {
    id: 5,
    name: "T-Bone Steak",
    description: "Corte clásico que combina lomo y bife en un solo corte con hueso en forma de T.",
    price: 24.99,
    category: "res",
    image: "tbone-steak.jpg",
    weight: "600g",
    popular: true,
    stock: 10
  },
  {
    id: 6,
    name: "Chuletas de Cordero",
    description: "Chuletas tiernas de cordero, perfectas para asar a la parrilla con hierbas aromáticas.",
    price: 19.99,
    category: "cordero",
    image: "chuletas-cordero.jpg",
    weight: "500g",
    popular: false,
    stock: 12
  },
  {
    id: 7,
    name: "Chorizo Parrillero",
    description: "Chorizo artesanal especiado, ideal para asados y parrilladas.",
    price: 12.99,
    category: "embutidos",
    image: "chorizo-parrillero.jpg",
    weight: "600g",
    popular: true,
    stock: 40
  },
  {
    id: 8,
    name: "Entraña",
    description: "Corte sabroso y jugoso, muy popular en asados. Textura única y sabor intenso.",
    price: 17.99,
    category: "res",
    image: "entrana.jpg",
    weight: "500g",
    popular: false,
    stock: 18
  },
  {
    id: 9,
    name: "Pollo Entero",
    description: "Pollo entero fresco, ideal para asar al horno o a la parrilla.",
    price: 14.99,
    category: "aves",
    image: "pollo-entero.jpg",
    weight: "1.8kg",
    popular: false,
    stock: 15
  },
  {
    id: 10,
    name: "Tomahawk Steak",
    description: "Impresionante corte con hueso largo, muy jugoso y con excelente sabor. La estrella de cualquier parrillada.",
    price: 39.99,
    category: "res",
    image: "tomahawk.jpg",
    weight: "1kg",
    popular: true,
    stock: 8
  },
  {
    id: 11,
    name: "Panceta de Cerdo",
    description: "Panceta fresca de cerdo, perfecta para asar o preparar al horno.",
    price: 13.99,
    category: "cerdo",
    image: "panceta-cerdo.jpg",
    weight: "700g",
    popular: false,
    stock: 22
  },
  {
    id: 12,
    name: "Picaña",
    description: "Corte brasileño muy jugoso, ideal para asar a la parrilla en piezas enteras.",
    price: 21.99,
    category: "res",
    image: "picana.jpg",
    weight: "800g",
    popular: true,
    stock: 14
  }
];

export const categories = [
  { id: "res", name: "Res" },
  { id: "cerdo", name: "Cerdo" },
  { id: "aves", name: "Aves" },
  { id: "cordero", name: "Cordero" },
  { id: "embutidos", name: "Embutidos" }
];

export function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') {
    return products;
  }
  return products.filter(product => product.category === categoryId);
}

export function getPopularProducts() {
  return products.filter(product => product.popular);
}

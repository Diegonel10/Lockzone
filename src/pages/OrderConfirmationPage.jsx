
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOrderById, formatCurrency } from '@/lib/utils';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (!orderId) {
      navigate('/');
      return;
    }
    
    const orderData = getOrderById(orderId);
    if (orderData) {
      setOrder(orderData);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Cargando información del pedido...</p>
      </div>
    );
  }

  // Format date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Estimate delivery date (24 hours later)
  const deliveryDate = new Date(orderDate);
  deliveryDate.setHours(deliveryDate.getHours() + (order.deliveryTime === 'express' ? 3 : 24));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDeliveryTime = deliveryDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-primary text-white p-6 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
          <p className="text-lg">
            Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalles del Pedido</h2>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                Pedido #{order.id}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium">Fecha del Pedido</span>
                </div>
                <p>{formattedDate}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium">Entrega Estimada</span>
                </div>
                <p>{formattedDeliveryDate} a las {formattedDeliveryTime}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Información de Contacto</span>
                </div>
                <p>{order.customer.firstName} {order.customer.lastName}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Dirección de Entrega</span>
                </div>
                <p>{order.customer.address}</p>
                <p>{order.customer.postalCode}, {order.customer.city}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Productos</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img  
                              className="h-10 w-10 rounded-md object-cover" 
                              alt={item.name}
                             src="https://images.unsplash.com/photo-1580139523366-36c0381704d4" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.weight}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="2" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      {formatCurrency(order.subtotal)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Envío
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      {order.shipping === 0 
                        ? <span className="text-green-600">Gratis</span> 
                        : formatCurrency(order.shipping)}
                    </td>
                  </tr>
                  {order.deliveryTime === 'express' && (
                    <tr>
                      <td colSpan="2" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                        Express (3h)
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(4.99)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="2" className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-bold text-primary">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">Estado del Pedido</span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <div>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    Confirmado
                  </span>
                </div>
                <div>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    En preparación
                  </span>
                </div>
                <div>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    En camino
                  </span>
                </div>
                <div>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    Entregado
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Recibirás un correo electrónico con los detalles de tu pedido y actualizaciones sobre el estado de entrega.
            </p>
            <Button asChild>
              <Link to="/productos">
                Seguir comprando <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;

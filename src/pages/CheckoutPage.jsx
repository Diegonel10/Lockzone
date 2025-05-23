
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectOption } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, generateOrderId, saveOrder } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    deliveryTime: 'standard',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const shippingCost = total > 50 ? 0 : 5.99;
  const totalWithShipping = total + shippingCost;

  // Redirect to products if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/productos');
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'El código postal es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Error en el formulario',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      try {
        const orderId = generateOrderId();
        const orderData = {
          id: orderId,
          date: new Date().toISOString(),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode
          },
          items: items,
          subtotal: total,
          shipping: shippingCost,
          total: totalWithShipping,
          paymentMethod: formData.paymentMethod,
          deliveryTime: formData.deliveryTime,
          notes: formData.notes,
          status: 'processing'
        };
        
        const success = saveOrder(orderData);
        
        if (success) {
          clearCart();
          navigate(`/confirmacion?orderId=${orderId}`);
        } else {
          throw new Error('Error al guardar el pedido');
        }
      } catch (error) {
        toast({
          title: 'Error al procesar el pedido',
          description: 'Ha ocurrido un error. Por favor intenta nuevamente.',
          variant: 'destructive'
        });
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Dirección de Entrega</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? 'border-red-500' : ''}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      formData.paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        formData.paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === 'card' && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                        <span>Tarjeta de Crédito/Débito</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      formData.paymentMethod === 'cash' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        formData.paymentMethod === 'cash' ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === 'cash' && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <span>Efectivo al recibir</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Opciones de Entrega</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      formData.deliveryTime === 'standard' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, deliveryTime: 'standard' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        formData.deliveryTime === 'standard' ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {formData.deliveryTime === 'standard' && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-gray-600" />
                        <div>
                          <span className="font-medium">Entrega Estándar (24h)</span>
                          <p className="text-sm text-gray-500">Recibe tu pedido en 24 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      formData.deliveryTime === 'express' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, deliveryTime: 'express' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        formData.deliveryTime === 'express' ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {formData.deliveryTime === 'express' && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-600" />
                        <div>
                          <span className="font-medium">Entrega Express (3h) +€4.99</span>
                          <p className="text-sm text-gray-500">Recibe tu pedido en 3 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales para la entrega, preferencias, etc."
                  className="h-24"
                />
              </div>

              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            
            <div className="mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div className="flex items-center">
                    <span className="font-medium">{item.quantity}x</span>
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
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
              {formData.deliveryTime === 'express' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Express (3h)</span>
                  <span>{formatCurrency(4.99)}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatCurrency(
                      totalWithShipping + (formData.deliveryTime === 'express' ? 4.99 : 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


import React from 'react';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = React.useState('');

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Lógica para aplicar cupom (a ser implementada)
      alert(`Cupom ${couponCode} aplicado com sucesso!`);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-6">
            Adicione produtos ao seu carrinho para continuar comprando.
          </p>
          <Button onClick={() => navigate('/')}>Continuar Comprando</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Produtos no Carrinho</CardTitle>
            </CardHeader>
            <CardContent>
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center py-4 border-b last:border-0">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                    <img
                      src={item.product.imageUrl || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {item.product.sku}</p>
                    <p className="text-sm">R$ {item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mr-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="mx-3 w-8 text-center">{item.quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="w-24 text-right mr-4">
                    <p className="font-medium">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Limpar Carrinho
              </Button>
              <Button onClick={() => navigate('/')}>
                Continuar Comprando
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>Calculado no checkout</span>
                </div>
                <div className="flex justify-between font-bold pt-4 border-t">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/checkout')}>
                Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cupom de Desconto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite o código"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={handleApplyCoupon}>Aplicar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

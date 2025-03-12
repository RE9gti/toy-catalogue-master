
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Cart } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const { toast } = useToast();

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calcular o total do carrinho
  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  // Adicionar item ao carrinho
  const addItem = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      
      let newItems = [...prevCart.items];
      
      if (existingItemIndex >= 0) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        toast({
          title: "Quantidade atualizada",
          description: `${product.name} agora tem ${newItems[existingItemIndex].quantity} unidades`,
        });
      } else {
        // Se o produto não estiver no carrinho, adicione-o
        newItems = [...newItems, { product, quantity }];
        toast({
          title: "Produto adicionado",
          description: `${product.name} foi adicionado ao carrinho`,
        });
      }
      
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  // Remover item do carrinho
  const removeItem = (productId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.items.find(item => item.product.id === productId);
      if (!itemToRemove) return prevCart;
      
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      
      toast({
        title: "Produto removido",
        description: `${itemToRemove.product.name} foi removido do carrinho`,
      });
      
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  // Atualizar quantidade de um item
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  // Limpar o carrinho
  const clearCart = () => {
    setCart({ items: [], total: 0 });
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho",
    });
  };

  return (
    <CartContext.Provider value={{
      items: cart.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total: cart.total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export default CartContext;

import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const data = await AsyncStorage.getItem('@GoMarketplace.products');

      if (data) {
        setProducts(state => [...state, ...JSON.parse(data)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      const tmpProducts = [...products];

      const productIndex = tmpProducts.findIndex(p => p.id === product.id);

      if (productIndex >= 0) {
        tmpProducts[productIndex].quantity += 1;
        setProducts([...tmpProducts]);
      } else {
        product.quantity = 1;
        setProducts([...products, product]);
      }

      await AsyncStorage.setItem(
        '@GoMarketplace.products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const tmpProducts = [...products];

      const productIndex = tmpProducts.findIndex(p => p.id === id);

      tmpProducts[productIndex].quantity += 1;

      setProducts([...tmpProducts]);

      await AsyncStorage.setItem(
        '@GoMarketplace.products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const tmpProducts = [...products];

      const productIndex = tmpProducts.findIndex(p => p.id === id);

      if (tmpProducts[productIndex].quantity > 1) {
        tmpProducts[productIndex].quantity -= 1;

        setProducts([...tmpProducts]);

        await AsyncStorage.setItem(
          '@GoMarketplace.products',
          JSON.stringify(products),
        );
      }
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };

import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    // TODO RETURN THE SUM OF THE PRICE FROM ALL ITEMS IN THE CART
    const sumOfPrices = products.reduce((total, current) => {
      const currentPrice = current.price;
      const currentQuantity = current.quantity;

      total += currentPrice * currentQuantity;

      return total;
    }, 0);

    return formatValue(sumOfPrices);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // TODO RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const totalProducts = products.reduce((total, current) => {
      const currentQuantity = current.quantity;

      total += currentQuantity;

      return total;
    }, 0);

    return totalProducts || 0;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;

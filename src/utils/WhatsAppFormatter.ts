import { CartItem } from '../types';

export const formatOrder = (cart: CartItem[], customerDetails: any): string => {
  const orderId = `VG-${Date.now().toString().slice(-6)}`;
  let msg = `*ORDER REQUEST: ${orderId}*%0a%0a`;
  
  msg += `*Customer Details:*%0a`;
  msg += `Name: ${customerDetails.name}%0a`;
  msg += `Address: ${customerDetails.address}%0a%0a`;
  
  msg += `*Order Summary:*%0a`;
  cart.forEach(item => {
    msg += `🧥 ${item.name} (${item.type}) x${item.quantity}%0a`;
  });
  
  return msg;
};
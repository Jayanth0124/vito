import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/Product/ProductCard';
import { products } from '../data/products';

const orderStages = [
  { key: 'placed', label: 'Order Placed', icon: '📦' },
  { key: 'packed', label: 'Packed', icon: '📦' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'outForDelivery', label: 'Out for Delivery', icon: '🚛' },
  { key: 'delivered', label: 'Delivered', icon: '🏠' },
];

const dummyOrder = {
  id: 'ORD123456',
  products: [
    { ...products[0], quantity: 1, size: 'M', color: 'Black' },
    { ...products[1], quantity: 2, size: 'L', color: 'Blue' },
  ],
  deliveryAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    country: 'USA',
  },
  paymentMethod: 'UPI',
  estimatedDelivery: 'Oct 10 - Oct 15',
  statusTimestamps: {
    placed: '2024-10-01 10:00 AM',
    packed: '2024-10-02 02:00 PM',
    shipped: '2024-10-03 09:00 AM',
    outForDelivery: '2024-10-05 08:00 AM',
    delivered: null,
  },
  currentStatus: 'outForDelivery',
};

const MyOrders: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState(dummyOrder.currentStatus);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Countdown timer for next status (dummy 3 hours)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStatus !== 'delivered') {
      let seconds = 3 * 60 * 60; // 3 hours
      setCountdown(seconds);
      timer = setInterval(() => {
        seconds -= 1;
        setCountdown(seconds);
        if (seconds <= 0) {
          clearInterval(timer);
          // Move to next status for demo
          const currentIndex = orderStages.findIndex(s => s.key === currentStatus);
          if (currentIndex < orderStages.length - 1) {
            setCurrentStatus(orderStages[currentIndex + 1].key);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStatus]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {/* Order Progress Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Progress</h2>
        <div className="flex flex-col md:flex-row md:space-x-6">
          {orderStages.map((stage, index) => {
            const isActive = orderStages.findIndex(s => s.key === currentStatus) >= index;
            const isCurrent = currentStatus === stage.key;
            const timestamp = dummyOrder.statusTimestamps[stage.key];
            return (
              <div key={stage.key} className="flex items-center mb-4 md:mb-0 md:flex-col md:flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {stage.icon}
                </div>
                <div className="mt-2 text-center">
                  <p className={`font-semibold ${isCurrent ? 'text-green-600' : 'text-gray-700'}`}>
                    {stage.label}
                  </p>
                  <p className="text-sm text-gray-500">{timestamp || 'Pending'}</p>
                  {isCurrent && countdown !== null && (
                    <p className="text-xs text-green-600 mt-1">
                      Next status in: {formatTime(countdown)}
                    </p>
                  )}
                </div>
                {index < orderStages.length - 1 && (
                  <div
                    className={`hidden md:block flex-1 h-1 mt-6 ${
                      isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Products</h3>
            <ul>
              {dummyOrder.products.map((product) => (
                <li key={product.id} className="flex items-center mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}, Size: {product.size}, Color: {product.color}
                    </p>
                    <p className="text-sm font-semibold">₹{product.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p>{dummyOrder.deliveryAddress.name}</p>
            <p>{dummyOrder.deliveryAddress.street}</p>
            <p>
              {dummyOrder.deliveryAddress.city}, {dummyOrder.deliveryAddress.state} {dummyOrder.deliveryAddress.zip}
            </p>
            <p>{dummyOrder.deliveryAddress.country}</p>

            <h3 className="font-semibold mt-6 mb-2">Payment Method</h3>
            <p>{dummyOrder.paymentMethod}</p>

            <h3 className="font-semibold mt-6 mb-2">Estimated Delivery</h3>
            <p className="inline-block px-3 py-1 rounded-full text-white bg-green-600">
              {dummyOrder.estimatedDelivery} (On Time)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

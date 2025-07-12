import React, { useEffect, useState } from 'react';

const mockOrder = {
  id: 'ORD123456',
  date: '2024-06-01',
  status: 'Out for Delivery',
  total: 99.99,
  items: [
    {
      id: 'p1',
      name: 'Product 1',
      quantity: 1,
      price: 49.99,
      image: '/src/images/D1.jpg',
    },
    {
      id: 'p2',
      name: 'Product 2',
      quantity: 2,
      price: 25.0,
      image: '/src/images/D2.jpg',
    },
  ],
  deliveryAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
  },
  paymentMethod: 'UPI',
  estimatedDelivery: 'June 5 - June 7',
  statusHistory: [
    { status: 'Order Placed', timestamp: '2024-06-01 10:00 AM' },
    { status: 'Packed', timestamp: '2024-06-02 02:00 PM' },
    { status: 'Shipped', timestamp: '2024-06-03 09:00 AM' },
    { status: 'Out for Delivery', timestamp: '2024-06-04 08:00 AM' },
  ],
};

const statusSteps = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const TrackOrder: React.FC = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(
    statusSteps.indexOf(mockOrder.status)
  );
  const [countdown, setCountdown] = useState('');
  const isDelayed = false; // Placeholder for status

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (currentStatusIndex < statusSteps.length - 1) {
      let seconds = 3 * 60 * 60;
      timer = setInterval(() => {
        seconds--;
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setCountdown(`${hrs}h ${mins}m ${secs}s`);
        if (seconds <= 0) {
          clearInterval(timer);
          setCurrentStatusIndex((prev) => Math.min(prev + 1, statusSteps.length - 1));
          setCountdown('');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStatusIndex]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Order #{mockOrder.id}</h1>

      {/* Progress Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Progress</h2>
        <div className="flex flex-col sm:flex-row sm:space-x-6">
          {statusSteps.map((step, index) => {
            const completed = index < currentStatusIndex;
            const current = index === currentStatusIndex;
            return (
              <div key={step} className="flex items-start sm:items-center mb-6 sm:mb-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${completed || current ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-400'}
                  `}
                >
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p className={`font-semibold ${completed || current ? 'text-green-700' : 'text-gray-500'}`}>
                    {step}
                  </p>
                  <p className="text-sm text-gray-400">
                    {mockOrder.statusHistory.find((s) => s.status === step)?.timestamp || ''}
                  </p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 border-t-2 mt-5 
                      ${completed ? 'border-green-600' : 'border-gray-300'}`}
                    style={{ marginLeft: '1rem', marginRight: '1rem' }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {countdown && (
          <p className="mt-2 text-sm text-gray-600">
            Next status update in: <span className="font-semibold">{countdown}</span>
          </p>
        )}
      </div>

      {/* Order Details */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Products</h3>
            <ul>
              {mockOrder.items.map((item) => (
                <li key={item.id} className="flex items-center mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-semibold">₹{item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p>{mockOrder.deliveryAddress.name}</p>
            <p>{mockOrder.deliveryAddress.street}</p>
            <p>
              {mockOrder.deliveryAddress.city}, {mockOrder.deliveryAddress.state} {mockOrder.deliveryAddress.zip}
            </p>
            <p>{mockOrder.deliveryAddress.country}</p>

            <h3 className="font-semibold mt-6 mb-2">Payment Method</h3>
            <p>{mockOrder.paymentMethod}</p>

            <h3 className="font-semibold mt-6 mb-2">Estimated Delivery</h3>
            <p
              className={`inline-block px-3 py-1 rounded-full text-white ${
                isDelayed ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {mockOrder.estimatedDelivery} {isDelayed ? '(Delayed)' : '(On Time)'}
            </p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          Map Placeholder (Google Maps or Mapbox)
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() => alert('Download Invoice feature coming soon!')}
        >
          Download Invoice
        </button>
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          onClick={() => alert('Cancel Order feature coming soon!')}
        >
          Cancel Order
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
          onClick={() => alert('Return/Replace feature coming soon!')}
        >
          Return/Replace
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => alert('Contact Support feature coming soon!')}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;

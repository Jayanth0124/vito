import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductCard } from '../components/Product/ProductCard';

const ThankYou: React.FC = () => {
  const { state } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Simple estimated delivery timeline
  const estimatedDelivery = '3-5 business days';

  // Sample coupon code
  const couponCode = 'THANKYOU10';

  // Recommended products (top 4 featured excluding ordered items)
  const recommendedProducts = products
    .filter(p => !state.items.some(item => item.product.id === p.id))
    .filter(p => p.featured)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Simple confetti animation using CSS */}
          <div className="confetti"></div>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg mb-2">Your order has been successfully placed. We appreciate your business.</p>
        <p className="text-md mb-6">Estimated Delivery: <strong>{estimatedDelivery}</strong></p>
        <Link
          to="/track-order"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-6"
        >
          Track Your Order
        </Link>
        <p className="mb-6 text-green-700 font-semibold">
          Use coupon code <span className="bg-green-100 px-2 py-1 rounded">{couponCode}</span> on your next purchase!
        </p>
      </div>

      {/* Order Summary Preview */}
      <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {state.items.length === 0 ? (
          <p>No items found in your order.</p>
        ) : (
          <ul className="space-y-4">
            {state.items.map((item, index) => (
              <li key={`${item.product.id}-${index}`} className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}, Color: {item.color}</p>
                  <p className="text-sm font-semibold">Qty: {item.quantity}</p>
                </div>
                <p className="ml-auto font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommended Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Support & Help */}
      <div className="text-center text-gray-700">
        <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
        <p>Contact our support team at <a href="mailto:support@vitoginglies.com" className="text-blue-600 underline">support@vitoginglies.com</a> or call 1-800-123-4567.</p>
      </div>

      <style>{`
        .confetti {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: url('https://cdn.jsdelivr.net/gh/catdad/canvas-confetti@master/demo/confetti.png');
          animation: confetti-fall 5s linear forwards;
        }
        @keyframes confetti-fall {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default ThankYou;

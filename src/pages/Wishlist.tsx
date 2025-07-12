import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/Product/ProductCard';

const Wishlist: React.FC = () => {
  const { state, dispatch } = useWishlist();

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <Link to="/shop" className="text-blue-600 hover:underline">
          Browse products to add to your wishlist
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: '64px' }}></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartFlyout from '../UI/CartFlyout';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../firebase';
import { useWishlist } from '../../context/WishlistContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const { state: cartState } = useCart();
  const cartItems = cartState.items;
  const { state: wishlistState } = useWishlist();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                <img
                  src="/src/images/logo.jpg"
                  alt="Vito Ginglies Logo"
                  className="w-8 h-8 object-contain"
                />
                <span>Vito Ginglies</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Link to="/shop" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                  Shop
                </Link>
                <Link to="/my-orders" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                  My Orders
                </Link>
                {/* Add Wishlist link */}
                <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition">
                  <Heart className="w-5 h-5 mr-1" />
                  Wishlist
                  {wishlistState.items.length > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {wishlistState.items.length}
                    </span>
                  )}
                </Link>
              </nav>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                  <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                    {user.email}
                  </Link>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <CartFlyout isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

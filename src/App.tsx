import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/UI/ScrollToTop';
import ScrollRestoration from './components/UI/ScrollRestoration';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

const MyOrders = React.lazy(() => import('./pages/MyOrders'));
const Login = React.lazy(() => import('./pages/Login'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const TrackOrder = React.lazy(() => import('./pages/TrackOrder'));

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="thank-you" element={<ThankYou />} />
                  <Route path="my-orders" element={<MyOrders />} />
                  <Route path="login" element={<Login />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="track-order" element={<TrackOrder />} />
                </Route>
              </Routes>
            </Suspense>
            <ScrollToTop />
            <ScrollRestoration />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;

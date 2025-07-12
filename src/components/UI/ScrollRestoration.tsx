import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll to top with offset for fixed header (64px)
    window.scrollTo({
      top: 64,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return null;
};

export default ScrollRestoration;

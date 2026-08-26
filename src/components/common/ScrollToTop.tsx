import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls window and any overflow containers to top (0,0) whenever the route location changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top of window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Also reset scroll position for any scrollable panels/containers
    const scrollableElements = document.querySelectorAll('.overflow-y-auto, .overflow-auto');
    scrollableElements.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}

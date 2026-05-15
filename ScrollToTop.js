import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { disableBrowserScrollRestoration, scrollToPageTop } from '../utils/scroll';

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    disableBrowserScrollRestoration();
  }, []);

  useLayoutEffect(() => {
    scrollToPageTop();
  }, [location.pathname, location.search, location.hash]);

  return null;
}

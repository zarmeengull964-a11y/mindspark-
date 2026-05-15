// Single source of truth for page-level scrolling.
// React Router route changes and same-page course topic changes both use this helper.
export function disableBrowserScrollRestoration() {
  if (typeof window === 'undefined') return;
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

export function scrollToPageTop() {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;
  const previousHtmlBehavior = html.style.scrollBehavior;
  const previousBodyBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = 'auto';
  body.style.scrollBehavior = 'auto';

  const reset = () => {
    const scrollingElement = document.scrollingElement || html;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    scrollingElement.scrollTop = 0;
    scrollingElement.scrollLeft = 0;
    html.scrollTop = 0;
    html.scrollLeft = 0;
    body.scrollTop = 0;
    body.scrollLeft = 0;

    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
      root.scrollLeft = 0;
    }
  };

  reset();
  requestAnimationFrame(() => {
    reset();
    html.style.scrollBehavior = previousHtmlBehavior;
    body.style.scrollBehavior = previousBodyBehavior;
  });
}

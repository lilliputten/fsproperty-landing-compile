import './LazyImages.styles.scss';

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const wh = window.innerHeight || document.documentElement.clientHeight;
  // const ww = window.innerWidth || document.documentElement.clientWidth;
  const {
    // prettier-ignore
    top,
    bottom,
    // left,
    // right,
    // x,
    // y,
    // width,
    // height,
  } = rect;
  // NOTE: Checking only vertical position
  const isVisible = bottom >= 0 && top <= wh;
  // console.log('[isElementInViewport:isElementInViewport]', isVisible, rect);
  return isVisible;
}

function initLazyImageNode(node: HTMLElement) {
  const isVisible = isElementInViewport(node);
  // const dataLazyImage = node.getAttribute('data-lazy-image');
  // const dataOriginalImage = node.getAttribute('dataOriginalImage');
  const { dataset } = node;
  const { lazyMode, originalImage } = dataset;
  /* console.log('[LazyImages:initLazyImageNode]', {
   *   isVisible,
   *   lazyMode,
   *   originalImage,
   *   node,
   * });
   */
  if (!isVisible) {
    return false;
  }
  if (lazyMode === 'background') {
    const backgroundImage = `url('${originalImage}')`;
    if (node.style.backgroundImage === backgroundImage) {
      return false;
    }
    node.style.backgroundImage = `url('${originalImage}')`;
  } else {
    if (node.getAttribute('src') === originalImage) {
      return false;
    }
    node.setAttribute('src', originalImage);
  }
  // Remove blur filter
  node.style.filter = 'none';
  return true;
}

const observer = new IntersectionObserver((entries, observer) => {
  /* console.log('[LazyImages:observer]', {
   *   entries,
   *   observer,
   * });
   */
  entries.forEach(({ target }) => {
    if (initLazyImageNode(target as HTMLElement)) {
      observer.unobserve(target);
    }
  });
});

export function initLazyImages() {
  const nodes = document.querySelectorAll('.LazyImage');
  /* console.log('[LazyImages:initLazyImages]', {
   *   nodes,
   * });
   */
  nodes.forEach((node: HTMLDivElement) => {
    observer.observe(node); // , { attributes: true });
  });
}

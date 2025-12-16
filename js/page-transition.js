// GSAP Page Transition Animation - Enhanced with multiple styles
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Page transition overlay (Cover style - ③)
let transitionCover = null;

// Create transition cover
function createTransitionCover() {
  if (transitionCover) return transitionCover;

  transitionCover = document.createElement('div');
  transitionCover.className = 'page-transition-cover';
  transitionCover.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    z-index: 9999;
    transform: translateY(-100%);
    pointer-events: none;
  `;
  document.body.appendChild(transitionCover);
  return transitionCover;
}

// Page transition out (Cover style - ③)
function transitionOut() {
  if (prefersReducedMotion) return Promise.resolve();

  const cover = createTransitionCover();

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    // Cover slides down
    tl.to(cover, {
      y: 0,
      duration: 0.5,
      ease: 'power2.in',
    });
  });
}

// Page transition in (Cover + Fade + Slide - ① + ③)
function transitionIn() {
  if (prefersReducedMotion) {
    if (transitionCover) {
      transitionCover.remove();
      transitionCover = null;
    }
    return;
  }

  const cover = createTransitionCover();
  const page = document.body;

  // Ensure cover starts from top
  gsap.set(cover, { y: '-100%' });

  // Check if this is a page transition (not initial load)
  const isPageTransition = sessionStorage.getItem('pageTransitioning') === 'true';

  if (isPageTransition) {
    // For page transitions, set page to hidden initially
    gsap.set(page, { opacity: 0, y: 24 });
  } else {
    // For initial load, page should be visible
    gsap.set(page, { opacity: 1, y: 0 });
  }

  const tl = gsap.timeline({
    onComplete: () => {
      if (cover && cover.parentNode) {
        cover.remove();
        transitionCover = null;
      }

      // Apply fade + slide to page content only on page transitions
      if (isPageTransition) {
        gsap.fromTo(
          page,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }

      sessionStorage.removeItem('pageTransitioning');
    },
  });

  // Cover slides up
  tl.to(cover, {
    y: '-100%',
    duration: 0.5,
    ease: 'power2.out',
    delay: isPageTransition ? 0.2 : 0.1,
  });
}

// Handle all internal links
function initPageTransitions() {
  const links = document.querySelectorAll('a[href]');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    // Skip external links, anchors, and empty hrefs
    if (!href ||
        href.startsWith('http') ||
        href.startsWith('https') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')) {
      return;
    }

    // Only handle HTML pages
    if (!href.endsWith('.html') && !href.includes('.html')) {
      if (href.includes('/') && !href.includes('.')) {
        return;
      }
    }

    link.addEventListener('click', async (e) => {
      e.preventDefault();

      const targetUrl = link.getAttribute('href');

      // Mark that we're transitioning
      sessionStorage.setItem('pageTransitioning', 'true');

      // Transition out
      await transitionOut();

      // Navigate
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 100);
    });
  });
}

// Initialize page transition in on load
function initPageLoad() {
  // Create cover and set initial state (hidden at top)
  const cover = createTransitionCover();
  if (cover) {
    gsap.set(cover, { y: '-100%' });
  }

  // Transition in after a short delay
  setTimeout(() => {
    transitionIn();
  }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
    initPageLoad();
  });
} else {
  initPageTransitions();
  initPageLoad();
}

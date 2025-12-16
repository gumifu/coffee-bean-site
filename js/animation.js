// GSAP Animations - Enhanced with multiple styles
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero text fade-in animation (Fade + Slide - ①)
function initHeroAnimation() {
  const heroText = document.querySelector('.hero-text h1, .hero-text p');
  if (!heroText || prefersReducedMotion) return;

  gsap.fromTo(
    heroText,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.3,
    }
  );

  // Hero actions
  const heroActions = document.querySelector('.hero-actions');
  if (heroActions) {
    gsap.fromTo(
      heroActions,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.5,
      }
    );
  }
}

// Scroll-triggered animations for content sections (ScrollTrigger - ⑤)
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Content sections with fade + slide
  const sections = document.querySelectorAll('.content-section-page, .content-layout, .section-gray');

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Content rows
  const contentRows = document.querySelectorAll('.content-row');
  contentRows.forEach((row) => {
    gsap.fromTo(
      row,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// Stagger animation for cards and items (Stagger - ④)
function initStaggerAnimations() {
  if (prefersReducedMotion) return;

  // Bean cards
  const beanCards = document.querySelectorAll('.bean-card');
  if (beanCards.length > 0) {
    gsap.fromTo(
      beanCards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: beanCards[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Feature list items
  const featureItems = document.querySelectorAll('.feature-list li, .feature-list-page li');
  featureItems.forEach((list) => {
    const items = list.parentElement.querySelectorAll('li');
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });

  // Cards row
  const cardsRow = document.querySelector('.cards-row');
  if (cardsRow) {
    const cards = cardsRow.querySelectorAll('.bean-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRow,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}

// Step-by-step reveal animation for brewing page (Stagger - ④)
function initStepAnimations() {
  if (prefersReducedMotion) return;

  const steps = document.querySelectorAll('.steps-list li');

  if (steps.length > 0) {
    gsap.fromTo(
      steps,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: steps[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}

// Table row animation (Stagger - ④)
function initTableAnimations() {
  if (prefersReducedMotion) return;

  const rows = document.querySelectorAll('.comparison-table tbody tr');

  if (rows.length > 0) {
    gsap.fromTo(
      rows,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rows[0],
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}

// Mask animation for section headers (Mask - ②)
function initMaskAnimations() {
  if (prefersReducedMotion) return;

  const sectionHeaders = document.querySelectorAll('.section-header, .section-header-center');

  sectionHeaders.forEach((header) => {
    const mask = document.createElement('div');
    mask.className = 'mask-element';
    mask.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-neutral-darkest);
      transform-origin: left;
      z-index: -1;
    `;

    // Create wrapper if needed
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; display: inline-block;';
    header.parentNode.insertBefore(wrapper, header);
    wrapper.appendChild(header);
    wrapper.appendChild(mask);

    gsap.fromTo(
      mask,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// FAQ items animation (Stagger - ④)
function initFAQAnimations() {
  if (prefersReducedMotion) return;

  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    gsap.fromTo(
      faqItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqItems[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}

// Initialize all animations
function initAnimations() {
  initHeroAnimation();
  initScrollAnimations();
  initStaggerAnimations();
  initStepAnimations();
  initTableAnimations();
  initMaskAnimations();
  initFAQAnimations();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

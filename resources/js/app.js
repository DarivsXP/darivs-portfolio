import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isNarrow = window.matchMedia('(max-width: 900px)').matches;
const enableFx = !isCoarsePointer && !isNarrow;

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Page loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        const finish = () => {
            loader.classList.add('is-done');
            document.body.classList.add('is-loaded');
        };
        window.addEventListener('load', () => setTimeout(finish, 400), { once: true });
        setTimeout(finish, 1500);
    }

    // Sticky header (native scroll — no Lenis)
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Mobile nav
    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle?.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    initHeroSplit();

    initReveals();

    initTypewriter();
    initProjectCards();

    document.querySelectorAll('.project-demo-img').forEach(img => {
        img.addEventListener('error', () => {
            const fallback = img.dataset.fallback;
            if (fallback && !img.src.endsWith(fallback.split('/').pop())) {
                img.src = fallback;
                img.style.objectFit = 'cover';
            }
        }, { once: true });
    });

    if (enableFx) {
        initMagnetic();
        initCursor();
    } else {
        document.getElementById('cursor-glow')?.remove();
        document.getElementById('cursor-dot')?.remove();
    }

    // Active nav (single batch update)
    const sections = document.querySelectorAll('section[id]');
    const navItems = navLinks?.querySelectorAll('a[href^="#"]');
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 55%',
            end: 'bottom 45%',
            onToggle: (self) => {
                if (self.isActive && navItems?.length) {
                    const id = section.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                    });
                }
            },
        });
    });
});

function initReveals() {
    const elements = gsap.utils.toArray('.reveal');
    if (!elements.length) return;

    const reveal = (el) => {
        if (el.classList.contains('visible')) return;

        const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;

        gsap.fromTo(el,
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                delay,
                overwrite: true,
                onStart: () => el.classList.add('visible'),
                onComplete: () => gsap.set(el, { clearProps: 'opacity,transform' }),
            },
        );
    };

    const showIfInView = () => {
        elements.forEach((el) => {
            if (el.classList.contains('visible')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                gsap.set(el, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
                el.classList.add('visible');
            }
        });
    };

    elements.forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            once: true,
            onEnter: () => reveal(el),
        });
    });

    showIfInView();
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        showIfInView();
    }, { once: true });
}

function initHeroSplit() {
    document.querySelectorAll('[data-split]').forEach((line) => {
        const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach((node) => {
            const text = node.textContent;
            const frag = document.createDocumentFragment();
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'hero-char';
                span.style.setProperty('--ci', i);
                span.textContent = char === ' ' ? '\u00a0' : char;
                frag.appendChild(span);
            });
            node.parentNode.replaceChild(frag, node);
        });
    });

    gsap.from('.hero-char', {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.55,
        ease: 'power2.out',
        delay: 0.3,
    });

    gsap.from('.animate-in', {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.15,
    });
}

function initTypewriter() {
    const typedEl = document.getElementById('hero-typed');
    if (!typedEl) return;

    let roles = [];
    try {
        roles = JSON.parse(typedEl.dataset.roles || '[]');
    } catch {
        roles = ['Full-Stack Developer'];
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const current = roles[roleIndex] || '';
        if (!deleting) {
            charIndex++;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
            setTimeout(tick, 55 + Math.random() * 40);
        } else {
            charIndex--;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 30);
        }
    };

    setTimeout(tick, 1200);
}

function initProjectCards() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-showcase');
    if (!cards.length) return;

    gsap.from(cards, {
        scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false,
    });
}

function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        const strength = btn.classList.contains('magnetic-strong') ? 0.28 : 0.16;
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * strength;
            const y = (e.clientY - rect.top - rect.height / 2) * strength;
            btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }, { passive: true });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initCursor() {
    const glow = document.getElementById('cursor-glow');
    const dot = document.getElementById('cursor-dot');
    if (!glow && !dot) return;

    let mx = 0;
    let my = 0;
    let gx = 0;
    let gy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    }, { passive: true });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const tick = () => {
        gx += (mx - gx) * 0.12;
        gy += (my - gy) * 0.12;
        if (glow) {
            glow.style.transform = `translate3d(${gx - 160}px, ${gy - 160}px, 0)`;
        }
        if (dot) {
            dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
        }
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

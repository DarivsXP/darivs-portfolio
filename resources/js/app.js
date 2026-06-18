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

    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: 'power2.out',
            delay: parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0,
            onStart: () => el.classList.add('visible'),
        });
    });

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

    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        initGalaxy(canvas, isNarrow ? 24 : 52, !isNarrow);
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

function initGalaxy(canvas, count, drawLines) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w = 0;
    let h = 0;
    const linkDist = 115;
    let running = true;
    let frame = 0;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.4 + 0.5,
            a: Math.random() * 0.35 + 0.25,
        }));
    };

    const draw = () => {
        if (!running) return;
        frame++;
        ctx.clearRect(0, 0, w, h);

        if (drawLines && frame % 2 === 0) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < linkDist * linkDist) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / linkDist) * 0.14;
                        ctx.strokeStyle = `rgba(200, 170, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.fillStyle = `rgba(240, 200, 160, ${p.a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    };

    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) requestAnimationFrame(draw);
    });

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
}

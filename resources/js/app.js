import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const mainContent = document.getElementById('main-content');

    const motionEnabled = true;

    // Page loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('is-done');
                document.body.classList.add('is-loaded');
            }, 500);
        });
        setTimeout(() => {
            loader.classList.add('is-done');
            document.body.classList.add('is-loaded');
        }, 2000);
    }

    // Lenis smooth scroll + GSAP sync
    const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Scroll velocity skew on main content
    if (mainContent) {
        const skewTarget = { value: 0 };
        lenis.on('scroll', ({ velocity }) => {
            const target = Math.max(-4, Math.min(4, velocity * 0.004));
            gsap.to(skewTarget, {
                value: target,
                duration: 0.4,
                ease: 'power2.out',
                onUpdate: () => {
                    mainContent.style.transform = `skewY(${skewTarget.value}deg)`;
                },
            });
        });
    }

    // Sticky header
    lenis.on('scroll', ({ scroll }) => {
        header?.classList.toggle('scrolled', scroll > 40);
    });

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

    // Hero character split animation
    initHeroSplit();

    // GSAP scroll reveals (exclude project cards — they have their own animation)
    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0,
            onStart: () => el.classList.add('visible'),
        });
    });

    // Stack banner marquee
    initStackBanner();

    // Hero typewriter
    initTypewriter();

    // Project cards entrance
    initProjectCards();

    // Project image fallback
    document.querySelectorAll('.project-demo-img').forEach(img => {
        img.addEventListener('error', () => {
            const fallback = img.dataset.fallback;
            if (fallback && !img.src.endsWith(fallback.split('/').pop())) {
                img.src = fallback;
                img.style.objectFit = 'cover';
            }
        }, { once: true });
    });

    // 3D tilt on project cards
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
                rotateY: x * 10,
                rotateX: -y * 10,
                y: -6,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 900,
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        });
    });

    // Magnetic elements
    document.querySelectorAll('.magnetic').forEach(btn => {
        const strength = btn.classList.contains('magnetic-strong') ? 0.35 : 0.2;
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
        });
    });

    // Cursor glow + dot
    const glow = document.getElementById('cursor-glow');
    const dot = document.getElementById('cursor-dot');
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            if (glow) {
                gsap.to(glow, { left: e.clientX, top: e.clientY, duration: 0.6, ease: 'power2.out' });
            }
            if (dot) {
                gsap.to(dot, { left: e.clientX, top: e.clientY, duration: 0.15, ease: 'power2.out' });
            }
        });

        document.querySelectorAll('a, button, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    } else {
        glow?.remove();
        dot?.remove();
    }

    // Particles
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        initConstellation(canvas);
    }

    // Parallax orbs
    gsap.utils.toArray('.ambient-orb, .hero-aurora').forEach((orb, i) => {
        gsap.to(orb, {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: 80 + i * 40,
            ease: 'none',
        });
    });

    // Active nav
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

    window.addEventListener('resize', () => ScrollTrigger.refresh());
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
        y: 28,
        rotateX: -40,
        stagger: 0.025,
        duration: 0.7,
        ease: 'back.out(1.4)',
        delay: 0.35,
    });

    gsap.from('.animate-in:not(.hero-name)', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
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

    setTimeout(tick, 1400);
}

function initStackBanner() {
    const banner = document.getElementById('stack-banner');
    const track = document.getElementById('stack-banner-track');
    if (!banner || !track) return;

    let offset = 0;
    let paused = false;
    const speed = 0.35;

    banner.addEventListener('mouseenter', () => { paused = true; });
    banner.addEventListener('mouseleave', () => { paused = false; });

    const loop = () => {
        if (!paused) {
            offset -= speed;
            const half = track.scrollWidth / 2;
            if (half > 0 && offset <= -half) {
                offset += half;
            }
            track.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
}

function initProjectCards() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-showcase');
    if (!cards.length) return;

    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

    gsap.from(cards, {
        scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 48,
        scale: 0.94,
        stagger: 0.18,
        duration: 0.85,
        ease: 'power3.out',
        immediateRender: false,
    });
}

function initConstellation(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    const count = 90;
    const linkDist = 130;

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    const init = () => {
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 1.8 + 0.6,
            a: Math.random() * 0.5 + 0.3,
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < linkDist) {
                    const alpha = (1 - dist / linkDist) * 0.18;
                    ctx.strokeStyle = `rgba(240, 184, 138, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            grad.addColorStop(0, `rgba(240, 184, 138, ${p.a})`);
            grad.addColorStop(1, 'rgba(240, 184, 138, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); });
}

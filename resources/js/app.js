document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Page loader
    const loader = document.getElementById('page-loader');
    if (loader && !prefersReducedMotion) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('is-done');
                document.body.classList.add('is-loaded');
            }, 600);
        });
        setTimeout(() => {
            loader.classList.add('is-done');
            document.body.classList.add('is-loaded');
        }, 2500);
    } else {
        loader?.classList.add('is-done');
        document.body.classList.add('is-loaded');
    }

    // Sticky header
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

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal');
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // Hero typewriter
    const typedEl = document.getElementById('hero-typed');
    if (typedEl && !prefersReducedMotion) {
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
    } else if (typedEl) {
        try {
            const roles = JSON.parse(typedEl.dataset.roles || '[]');
            typedEl.textContent = roles[0] || 'Full-Stack Developer';
        } catch {
            typedEl.textContent = 'Full-Stack Developer';
        }
    }

    // Infinite tech carousels
    document.querySelectorAll('.tech-carousel').forEach(carousel => {
        initInfiniteCarousel(carousel, prefersReducedMotion);
    });

    // 3D ring pause on hover
    const techRing = document.getElementById('tech-ring');
    if (techRing && !prefersReducedMotion) {
        const stage = techRing.querySelector('.tech-ring-stage');
        techRing.addEventListener('mouseenter', () => stage?.classList.add('is-paused'));
        techRing.addEventListener('mouseleave', () => stage?.classList.remove('is-paused'));
    }

    // Project image fallback
    document.querySelectorAll('.project-demo-img').forEach(img => {
        img.addEventListener('error', () => {
            const fallback = img.dataset.fallback;
            if (fallback && img.src !== fallback) {
                img.src = fallback;
            }
        }, { once: true });
    });

    // 3D tilt on project cards
    if (!prefersReducedMotion) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Magnetic buttons
    if (!prefersReducedMotion) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // Cursor glow + dot
    const glow = document.getElementById('cursor-glow');
    const dot = document.getElementById('cursor-dot');
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            if (glow) {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            }
            if (dot) {
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
            }
        });

        document.querySelectorAll('a, button, .tilt-card, .tech-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    } else {
        glow?.remove();
        dot?.remove();
    }

    // Constellation particle canvas
    const canvas = document.getElementById('particle-canvas');
    if (canvas && !prefersReducedMotion) {
        initConstellation(canvas);
    }

    // Parallax on hero orbs
    if (!prefersReducedMotion) {
        const orbs = document.querySelectorAll('.ambient-orb, .hero-aurora');
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            orbs.forEach((orb, i) => {
                orb.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`;
            });
        }, { passive: true });
    }

    // Active nav
    const sections = document.querySelectorAll('section[id]');
    const navItems = navLinks?.querySelectorAll('a[href^="#"]');
    if (sections.length && navItems?.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navItems.forEach(item => {
                            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            },
            { threshold: 0.35, rootMargin: '-80px 0px -50% 0px' }
        );
        sections.forEach(section => sectionObserver.observe(section));
    }
});

function initInfiniteCarousel(root, reducedMotion) {
    const track = root.querySelector('.tech-carousel-track');
    if (!track) return;

    const speed = parseFloat(root.dataset.speed || '0.5');
    const direction = parseInt(root.dataset.direction || '1', 10);

    const items = [...track.children];
    items.forEach(item => track.appendChild(item.cloneNode(true)));

    let position = 0;
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;

    const halfWidth = () => track.scrollWidth / 2;

    requestAnimationFrame(() => {
        if (direction === -1) position = -halfWidth();
    });

    const onPointerDown = (e) => {
        dragging = true;
        paused = true;
        dragStartX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragStartPos = position;
        velocity = 0;
        track.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!dragging) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const delta = x - dragStartX;
        position = dragStartPos + delta;
    };

    const onPointerUp = () => {
        dragging = false;
        setTimeout(() => { paused = false; }, 800);
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointerleave', onPointerUp);
    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { if (!dragging) paused = false; });

    if (reducedMotion) {
        track.style.transform = 'translateX(0)';
        return;
    }

    const animate = () => {
        if (!dragging && !paused) {
            position -= speed * direction;
        }
        const half = halfWidth();
        if (half > 0) {
            if (direction === 1 && position <= -half) position += half;
            if (direction === -1 && position >= 0) position -= half;
        }
        track.style.transform = `translate3d(${position}px, 0, 0)`;
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
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

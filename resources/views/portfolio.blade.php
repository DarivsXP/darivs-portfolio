<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="V Cyril Darivs Egipto — Junior Full-Stack Developer building Laravel, Vue.js, React, and Python web applications.">
    <title>V Cyril Darivs Egipto — Junior Full-Stack Developer</title>
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="theme-color" content="#0a0a0f">
    <meta property="og:title" content="V Cyril Darivs Egipto — Junior Full-Stack Developer">
    <meta property="og:description" content="Junior Full-Stack Developer building Laravel, Vue.js, React, and Python web applications.">
    <meta property="og:type" content="website">
    <link rel="icon" href="/logo.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="portfolio-body portfolio-body--motion antialiased">

    <div class="page-loader" id="page-loader" aria-hidden="true">
        <div class="page-loader-inner">
            <span class="page-loader-logo">Cyril<span>.</span></span>
            <div class="page-loader-bar"><span></span></div>
        </div>
    </div>

    <div class="starfield" aria-hidden="true"></div>
    <div class="cursor-glow" id="cursor-glow" aria-hidden="true"></div>
    <div class="cursor-dot" id="cursor-dot" aria-hidden="true"></div>

    <div class="ambient-bg" aria-hidden="true">
        <div class="ambient-orb ambient-orb--1"></div>
        <div class="ambient-orb ambient-orb--2"></div>
        <div class="ambient-orb ambient-orb--3"></div>
    </div>

    <header class="site-header" id="site-header">
        <nav class="nav-container">
            <a href="#hero" class="nav-logo">Cyril<span class="nav-logo-dot">.</span></a>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links" id="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#projects">Work</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                    <a href="{{ asset(config('portfolio.cv_path')) }}" class="nav-cta" download>
                        Download CV
                    </a>
                </li>
            </ul>
        </nav>
    </header>

    <main id="main-content">

        {{-- Hero --}}
        <section id="hero" class="section hero hero--immersive">
            <div class="hero-bg" aria-hidden="true">
                <div class="hero-grid"></div>
                <div class="hero-aurora hero-aurora--1"></div>
                <div class="hero-aurora hero-aurora--2"></div>
                <div class="hero-noise"></div>
            </div>

            <div class="container hero-layout">
                <div class="hero-content">
                    <p class="hero-eyebrow animate-in" style="--i:0">
                        <span class="hero-status-dot"></span>
                        Junior Full-Stack Developer
                    </p>
                    <h1 class="hero-name" id="hero-name">
                        <span class="hero-name-line" data-split>V Cyril</span>
                        <span class="hero-name-line" data-split>Darivs <em class="hero-name-accent">Egipto</em></span>
                    </h1>
                    <p class="hero-lead animate-in" style="--i:2">
                        I design and ship full-stack web applications — from REST APIs and dashboards to AI-powered products.
                    </p>
                    <p class="hero-typed-wrap animate-in" style="--i:2">
                        <span class="hero-typed-label">Currently building as a</span>
                        <span class="hero-typed" id="hero-typed" data-roles="{{ json_encode(config('portfolio.hero_roles')) }}"></span>
                        <span class="hero-typed-cursor" aria-hidden="true">|</span>
                    </p>
                    <div class="hero-actions animate-in" style="--i:3">
                        <a href="#projects" class="btn btn-primary magnetic">
                            <span class="btn-shine"></span>
                            View projects
                        </a>
                        <a href="{{ asset(config('portfolio.cv_path')) }}" class="btn btn-ghost magnetic" download>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download CV
                        </a>
                    </div>
                    <div class="hero-chips animate-in" style="--i:4">
                        <span>Philippines</span>
                        <span>B.S. Computer Science</span>
                        <span class="hero-chip--glow">Open to work</span>
                    </div>
                </div>

                <div class="hero-visual animate-in" style="--i:2" aria-hidden="true">
                    <div class="hero-orbit-system">
                        <div class="orbit-ring orbit-ring--1"></div>
                        <div class="orbit-ring orbit-ring--2"></div>
                        <div class="orbit-ring orbit-ring--3"></div>
                        <div class="orbit-core">
                            <span class="orbit-bracket orbit-bracket--l">{</span>
                            <span class="orbit-bracket orbit-bracket--r">}</span>
                        </div>
                        <div class="orbit-satellites-spin">
                            @foreach (array_slice(config('portfolio.skills'), 0, 6) as $i => $skill)
                                <div class="orbit-arm" style="--angle: {{ $i * 60 }}deg">
                                    <span class="orbit-satellite" style="--sat-color: {{ $skill['color'] }}">{{ $skill['name'] }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>

            <a href="#about" class="hero-scroll-hint animate-in" style="--i:5" aria-label="Scroll down">
                <span>Scroll</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
        </section>

        {{-- About (brief) --}}
        <section id="about" class="section section--compact">
            <div class="container narrow">
                <div class="about-brief reveal">
                    <span class="section-label">About</span>
                    <p class="about-brief-text">
                        Junior full-stack developer focused on building reliable, user-facing software.
                        I've worked on Laravel + Vue.js platforms at <strong>RevDojo</strong>, delivered freelance
                        projects across PHP, Python, C, and C++, and shipped full-stack apps like
                        <strong>VertexShop</strong> and <strong>ErgoVision</strong>.
                        More detail on my experience and stack is in my CV.
                    </p>
                    <a href="{{ asset(config('portfolio.cv_path')) }}" class="btn btn-ghost magnetic" download>
                        Get the full resume →
                    </a>
                </div>
            </div>
        </section>

        {{-- Stack banner (single instance, auto-scroll) --}}
        <section id="stack" class="stack-banner-section" aria-label="Tech stack">
            <div class="container section-header stack-banner-header">
                <span class="section-label">Stack</span>
                <h2 class="section-title section-title--sm">Technologies I work with</h2>
            </div>

            <div class="stack-banner" id="stack-banner">
                <div class="stack-banner-viewport">
                    <div class="stack-banner-track" id="stack-banner-track">
                        <div class="stack-banner-group">
                            @foreach (config('portfolio.skills') as $i => $skill)
                                <span class="stack-chip" style="--chip-color: {{ $skill['color'] }}; --chip-i: {{ $i }}">
                                    <span class="stack-chip-dot" style="background: {{ $skill['color'] }}"></span>
                                    {{ $skill['name'] }}
                                </span>
                            @endforeach
                        </div>
                        <div class="stack-banner-group" aria-hidden="true">
                            @foreach (config('portfolio.skills') as $i => $skill)
                                <span class="stack-chip" style="--chip-color: {{ $skill['color'] }}; --chip-i: {{ $i }}">
                                    <span class="stack-chip-dot" style="background: {{ $skill['color'] }}"></span>
                                    {{ $skill['name'] }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Projects --}}
        <section id="projects" class="section section--compact projects-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-label">Projects</span>
                    <h2 class="section-title section-title--sm">Selected work</h2>
                </div>

                <div class="project-showcase-grid" id="projects-grid">
                    @foreach (config('portfolio.projects') as $index => $project)
                        @php
                            $imageSlug = pathinfo($project['image'], PATHINFO_FILENAME);
                            $imageFallback = asset('images/projects/'.$imageSlug.'.svg');
                            $imageFit = $project['image_fit'] ?? 'cover';
                            $imagePosition = $project['image_position'] ?? 'center';
                        @endphp
                        <article
                            class="project-showcase project-showcase--{{ $project['accent'] }}{{ ($project['featured'] ?? false) ? ' project-showcase--featured' : '' }}"
                            style="--delay: {{ $index * 0.1 }}s"
                        >
                            <div class="project-showcase-inner">
                                <div class="project-media">
                                    <picture>
                                        <source srcset="{{ asset($project['image']) }}" type="image/png">
                                        <img
                                            src="{{ asset($project['image']) }}"
                                            alt="{{ $project['name'] }} preview"
                                            class="project-demo-img"
                                            data-fallback="{{ $imageFallback }}"
                                            style="object-fit: {{ $imageFit }}; object-position: {{ $imagePosition }};"
                                            loading="lazy"
                                            width="1200"
                                            height="675"
                                        >
                                    </picture>
                                    <div class="project-media-shine" aria-hidden="true"></div>
                                    <div class="project-media-meta">
                                        <span class="project-tagline">{{ $project['tagline'] }}</span>
                                    </div>
                                </div>
                                <div class="project-body">
                                    <h3 class="project-title">{{ $project['name'] }}</h3>
                                    @if (! empty($project['subtitle']))
                                        <p class="project-subtitle">{{ $project['subtitle'] }}</p>
                                    @endif
                                    <p class="project-desc">{{ $project['description'] }}</p>
                                    <div class="project-tech">
                                        <span class="project-tech-label">Technologies used</span>
                                        <div class="tag-row">
                                        @foreach ($project['tags'] as $tag)
                                            <span class="tag">{{ $tag }}</span>
                                        @endforeach
                                        </div>
                                    </div>
                                    <div class="project-links">
                                        @if ($project['live'])
                                            <a href="{{ $project['live'] }}" target="_blank" rel="noopener" class="project-link project-link--live">
                                                Live demo ↗
                                            </a>
                                        @endif
                                        @if (! empty($project['github']))
                                            <a href="{{ $project['github'] }}" target="_blank" rel="noopener" class="project-link">
                                                GitHub ↗
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </article>
                    @endforeach
                </div>
            </div>
        </section>

        {{-- Contact --}}
        <section id="contact" class="section section--compact contact--compact">
            <div class="container narrow">
                <div class="section-header contact-header">
                    <span class="section-label">Contact</span>
                    <h2 class="section-title section-title--sm">Let's build something.</h2>
                </div>
                <div class="contact-minimal">
                    <div class="contact-row">
                        <a href="mailto:darivsxp@gmail.com" class="contact-pill magnetic magnetic-strong">darivsxp@gmail.com</a>
                        <a href="tel:+639763575830" class="contact-pill magnetic magnetic-strong">+63 976 357 5830</a>
                        <a href="https://linkedin.com/in/v-cyril" target="_blank" rel="noopener" class="contact-pill magnetic magnetic-strong">LinkedIn</a>
                        <a href="https://github.com/v-cyril" target="_blank" rel="noopener" class="contact-pill magnetic magnetic-strong">GitHub</a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer class="site-footer site-footer--compact">
        <div class="container">
            <p>© {{ date('Y') }} V Cyril Darivs Egipto · Built with Laravel</p>
        </div>
    </footer>

</body>
</html>

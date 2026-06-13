<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="V Cyril Darivs Egipto — Junior Full-Stack Developer experienced in PHP, Laravel, Vue.js, React, Python, and RESTful APIs.">
    <title>V Cyril Darivs Egipto — Junior Full-Stack Developer</title>
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="theme-color" content="#0c0f14">
    <!-- Open Graph / Social -->
    <meta property="og:title" content="V Cyril Darivs Egipto — Junior Full-Stack Developer">
    <meta property="og:description" content="Junior Full-Stack Developer experienced in PHP, Laravel, Vue.js, React, Python, and RESTful APIs.">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/favicon.ico">
        <script type="application/ld+json">
        {!! json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'Person',
                'name' => 'V Cyril Darivs Egipto',
                'url' => url('/'),
                'sameAs' => [
                        'https://linkedin.com/in/v-cyril'
                ],
                'jobTitle' => 'Junior Full-Stack Developer',
                'description' => 'Junior Full-Stack Developer experienced in PHP, Laravel, Vue.js, React, Python, and RESTful APIs.'
        ], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) !!}
        </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="portfolio-body antialiased">

    {{-- Ambient background --}}
    <div class="ambient-bg" aria-hidden="true">
        <div class="ambient-orb ambient-orb--1"></div>
        <div class="ambient-orb ambient-orb--2"></div>
        <div class="ambient-orb ambient-orb--3"></div>
    </div>

    {{-- Navigation --}}
    <header class="site-header" id="site-header">
        <nav class="nav-container">
            <a href="#hero" class="nav-logo">V Cyril<span class="nav-logo-dot">.</span></a>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links" id="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="/shop">VertexShop</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact" class="nav-cta">Say hello</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-content">

        {{-- Hero --}}
        <section id="hero" class="section hero">
            <div class="container">
                <div class="hero-content reveal">
                    <p class="hero-greeting">Hey there 👋</p>
                    <h1 class="hero-name">V Cyril Darivs Egipto</h1>
                    <p class="hero-title">
                        Junior Full-Stack Developer building
                        <span class="hero-highlight">scalable web applications</span>.
                    </p>
                    <p class="hero-subtitle">
                        Experienced in PHP, Laravel, Vue.js, React, Python, and RESTful APIs. I develop and
                        maintain web applications, troubleshoot technical issues, and collaborate effectively
                        in remote development environments.
                    </p>
                    <div class="hero-actions">
                        <a href="#projects" class="btn btn-primary">See my work</a>
                        <a href="#contact" class="btn btn-ghost">Get in touch</a>
                    </div>
                    <div class="hero-meta">
                        <span>📍 Philippines</span>
                        <span class="meta-divider">·</span>
                        <span>🎓 B.S. Computer Science</span>
                        <span class="meta-divider">·</span>
                        <span>💼 Open to opportunities</span>
                    </div>
                </div>
                <div class="hero-visual reveal reveal-delay-1" aria-hidden="true">
                    <div class="code-window">
                        <div class="code-window-bar">
                            <span class="dot dot-red"></span>
                            <span class="dot dot-yellow"></span>
                            <span class="dot dot-green"></span>
                            <span class="code-window-title">cyril.php</span>
                        </div>
                        <pre class="code-window-body"><code><span class="code-keyword">class</span> <span class="code-class">Developer</span> {
  <span class="code-keyword">public</span> <span class="code-var">$name</span> = <span class="code-string">'V Cyril Darivs Egipto'</span>;
  <span class="code-keyword">public</span> <span class="code-var">$stack</span> = [
    <span class="code-string">'Laravel'</span>, <span class="code-string">'Vue.js'</span>,
    <span class="code-string">'React'</span>, <span class="code-string">'Python'</span>
  ];
  <span class="code-keyword">public function</span> <span class="code-fn">build</span>() {
    <span class="code-keyword">return</span> <span class="code-string">'something useful'</span>;
  }
}</code></pre>
                    </div>
                </div>
            </div>
        </section>

        {{-- About --}}
        <section id="about" class="section about">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">About me</span>
                    <h2 class="section-title">A developer who started on the support floor</h2>
                </div>
                <div class="about-grid">
                    <div class="about-text reveal">
                        <p>
                            My path into development wasn't the typical route. I spent over three years
                            at <strong>Strikingly</strong> helping real customers fix real problems. Domain DNS headaches,
                            Email issues, SEO issues, and various website issues. That taught me something no tutorial
                            can: how to think like a user when something breaks.
                        </p>
                        <p>
                            These days I'm writing code instead of support tickets. I've built freelance projects
                            in C, Java, and C++, and developed AI-powered applications like ErgoVision and SnapFolia
                            while studying software development.
                        </p>
                        <p>
                            I also worked as a Junior Developer at <strong>RevDojo</strong>, where I worked on their
                            automotive LMS, debugging issues, maintaining existing codebases, and implementing fixes
                            for real-world client requirements.
                        </p>
                        <p>
                            I'm drawn to the intersection of web development and machine learning, building tools
                            that feel intuitive on the surface but do something clever underneath.
                        </p>
                    </div>
                    <div class="about-stats reveal reveal-delay-1">
                        <div class="stat-card">
                            <span class="stat-number">4+</span>
                            <span class="stat-label">Years in tech</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">12+</span>
                            <span class="stat-label">Freelance projects delivered</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">3+</span>
                            <span class="stat-label">Years in Technical Support</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">96%</span>
                            <span class="stat-label">Customer satisfaction (Strikingly)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Experience --}}
        <section id="experience" class="section experience">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Experience</span>
                    <h2 class="section-title">Where I've been</h2>
                </div>
                <div class="timeline">

                    <article class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <div>
                                    <h3 class="timeline-role">Junior Developer</h3>
                                    <p class="timeline-company">RevDojo · Florida, USA</p>
                                </div>
                                <time class="timeline-date">Sep 2025 – May 2026</time>
                            </div>
                            <p class="timeline-desc">
                                RevDojo provides comprehensive solutions for automotive businesses, including
                                learning management systems, sales training, and IT services.
                            </p>
                            <ul class="timeline-highlights">
                                <li>Diagnosed and resolved full-stack application issues using PHP, Laravel, Vue.js, MySQL, Git, and RESTful APIs</li>
                                <li>Maintained and enhanced LMS functionality used by automotive industry clients</li>
                                <li>Investigated user-reported defects, reproduced issues, and implemented solutions to improve platform stability</li>
                                <li>Collaborated with developers to deploy bug fixes, feature enhancements, and production updates through Git-based workflows</li>
                                <li>Assisted with backend API troubleshooting and database-related issue resolution</li>
                                <li>Participated in quality assurance testing to identify and prevent production issues before deployment</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag">PHP</span><span class="tag">Laravel</span><span class="tag">Vue.js</span>
                                <span class="tag">MySQL</span><span class="tag">Git</span><span class="tag">REST APIs</span>
                            </div>
                        </div>
                    </article>

                    <article class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <div>
                                    <h3 class="timeline-role">Technical Support Representative</h3>
                                    <p class="timeline-company">Strikingly · California, United States</p>
                                </div>
                                <time class="timeline-date">Aug 2022 – Sep 2025</time>
                            </div>
                            <p class="timeline-desc">
                                Strikingly is a global website-building platform that helps individuals and businesses
                                create professional, mobile-optimized websites through intuitive design tools.
                            </p>
                            <ul class="timeline-highlights">
                                <li>Provided technical support through live chat and email, handling over 80 customer interactions daily</li>
                                <li>Maintained a customer satisfaction rating above 96% while supporting a global customer base</li>
                                <li>Diagnosed and resolved issues involving DNS, SSL certificates, domain configuration, website publishing, and SEO</li>
                                <li>Investigated technical problems, identified root causes, and guided customers through effective solutions</li>
                                <li>Collaborated with engineering teams by escalating and documenting complex platform issues</li>
                                <li>Created troubleshooting documentation that improved consistency and efficiency within support operations</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag">Technical Support</span><span class="tag">DNS</span>
                                <span class="tag">SSL</span><span class="tag">SEO</span><span class="tag">CMS</span>
                            </div>
                        </div>
                    </article>

                    <article class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <div>
                                    <h3 class="timeline-role">Freelance Programmer</h3>
                                    <p class="timeline-company">UvoCorp · Ukraine</p>
                                </div>
                                <time class="timeline-date">Feb 2024 – Sep 2024</time>
                            </div>
                            <p class="timeline-desc">
                                UvoCorp is a global online platform that connects clients seeking specialized academic
                                and technical assistance with a pool of expert freelance professionals.
                            </p>
                            <ul class="timeline-highlights">
                                <li>Delivered 12+ programming projects involving PHP, Python, C, and C++ while consistently meeting deadlines</li>
                                <li>Developed custom software solutions based on client specifications across multiple technologies and project scopes</li>
                                <li>Built a Linux-style file system simulation in C using pointers, structures, and dynamic memory allocation</li>
                                <li>Developed an academic record management application using C++ and object-oriented programming principles</li>
                                <li>Produced clean, maintainable, and well-documented code to support long-term usability and scalability</li>
                                <li>Collaborated directly with clients to gather requirements, troubleshoot issues, and deliver reliable technical solutions</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag">PHP</span><span class="tag">Python</span>
                                <span class="tag">C</span><span class="tag">C++</span>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </section>

        {{-- Featured Projects --}}
        <section id="projects" class="section projects">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Featured work</span>
                    <h2 class="section-title">Projects I'm proud of</h2>
                </div>

                <div class="projects-grid">

                    {{-- VertexShop --}}
                    <article class="project-card project-card--featured reveal">
                        <div class="project-card-glow project-card-glow--ergo"></div>
                        <div class="project-card-inner">
                            <div class="project-card-top">
                                <span class="project-year">2026</span>
                                <a href="/shop" class="project-link" aria-label="Visit VertexShop">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                </a>
                            </div>
                            <div class="project-icon project-icon--ergo">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            </div>
                            <h3 class="project-title">VertexShop</h3>
                            <p class="project-desc">
                                Full-stack e-commerce platform with secure authentication, product management,
                                shopping cart, and order processing — featuring a Vue.js storefront and admin dashboard.
                            </p>
                            <ul class="project-features">
                                <li>RESTful APIs connecting Vue.js frontend and Laravel backend</li>
                                <li>Inventory management and order tracking systems</li>
                                <li>Git-based version control and scalable development practices</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag tag--accent">Laravel</span><span class="tag tag--accent">Vue.js</span>
                                <span class="tag tag--accent">MySQL</span><span class="tag tag--accent">Sanctum</span>
                                <span class="tag tag--accent">Tailwind CSS</span>
                            </div>
                            <a href="/shop" class="btn btn-project">
                                Explore VertexShop →
                            </a>
                        </div>
                    </article>

                    {{-- ErgoVision --}}
                    <article class="project-card project-card--featured reveal reveal-delay-1">
                        <div class="project-card-glow project-card-glow--ergo"></div>
                        <div class="project-card-inner">
                            <div class="project-card-top">
                                <span class="project-year">2026</span>
                                <a href="https://ergovision.online" target="_blank" rel="noopener" class="project-link" aria-label="Visit ErgoVision">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                </a>
                            </div>
                            <div class="project-icon project-icon--ergo">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l4-4"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                            <h3 class="project-title">ErgoVision</h3>
                            <p class="project-desc">
                                AI-powered posture detection system that analyzes posture in real time and
                                provides ergonomic recommendations through a responsive Laravel + Vue.js dashboard.
                            </p>
                            <ul class="project-features">
                                <li>Real-time posture detection via webcam and MediaPipe</li>
                                <li>Random Forest classifier for ergonomic scoring</li>
                                <li>API communication between ML services and the web platform</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag tag--accent">Python</span><span class="tag tag--accent">MediaPipe</span>
                                <span class="tag tag--accent">Random Forest</span><span class="tag tag--accent">Laravel</span>
                                <span class="tag tag--accent">Vue.js</span>
                            </div>
                            <a href="https://ergovision.online" target="_blank" rel="noopener" class="btn btn-project">
                                Visit ergovision.online →
                            </a>
                        </div>
                    </article>

                    {{-- Snapfolia --}}
                    <article class="project-card project-card--featured reveal reveal-delay-2">
                        <div class="project-card-glow project-card-glow--snap"></div>
                        <div class="project-card-inner">
                            <div class="project-card-top">
                                <span class="project-year">2025</span>
                            </div>
                            <div class="project-icon project-icon--snap">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22c-2-4-8-6-8-12a8 8 0 0 1 16 0c0 6-6 8-8 12z"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
                            </div>
                            <h3 class="project-title">Snapfolia</h3>
                            <p class="project-desc">
                                Co-developed a web and mobile application that identifies plant species from
                                leaf images using custom-trained machine learning models and large-scale datasets.
                            </p>
                            <ul class="project-features">
                                <li>ML model training and integration for image classification</li>
                                <li>Cross-platform web and mobile experience</li>
                                <li>Git-based collaboration, deployment, and testing workflows</li>
                            </ul>
                            <div class="tag-row">
                                <span class="tag tag--green">Python</span><span class="tag tag--green">Laravel</span>
                                <span class="tag tag--green">React</span><span class="tag tag--green">Machine Learning</span>
                                <span class="tag tag--green">Mobile</span>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </section>

        {{-- Skills --}}
        <section id="skills" class="section skills">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Skills</span>
                    <h2 class="section-title">What I work with</h2>
                </div>
                <div class="skills-grid">
                    <div class="skills-group reveal">
                        <h3 class="skills-group-title">Languages &amp; frameworks</h3>
                        <div class="skills-cloud">
                            @foreach (['PHP', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'Laravel', 'Vue.js', 'React', 'Node.js', 'Tailwind CSS', 'Bootstrap'] as $skill)
                                <span class="skill-pill">{{ $skill }}</span>
                            @endforeach
                        </div>
                    </div>
                    <div class="skills-group reveal reveal-delay-1">
                        <h3 class="skills-group-title">Tools, databases &amp; concepts</h3>
                        <div class="skills-cloud">
                            @foreach (['MySQL', 'PostgreSQL', 'RESTful APIs', 'Git', 'GitHub', 'Vite', 'Docker', 'Firebase', 'Postman', 'MVC', 'OOP', 'CI/CD', 'Authentication & Authorization'] as $skill)
                                <span class="skill-pill skill-pill--soft">{{ $skill }}</span>
                            @endforeach
                        </div>
                    </div>
                </div>

                {{-- Education --}}
                <div class="education-card reveal">
                    <div class="education-icon">🎓</div>
                    <div>
                        <h3 class="education-degree">Bachelor of Science in Computer Science</h3>
                        <p class="education-school">First Asia Institute of Technology and Humanities · Tanauan City, Batangas</p>
                        <p class="education-date">Sep 2022 – May 2026</p>
                    </div>
                </div>
            </div>
        </section>

        {{-- Contact --}}
        <section id="contact" class="section contact">
            <div class="container">
                <div class="contact-card reveal">
                    <div class="contact-content">
                        <span class="section-label">Contact</span>
                        <h2 class="section-title">Let's build something together</h2>
                        <p class="contact-text">
                            Whether you have a role in mind, a project idea, or want to connect —
                            reach me at darivsxp@gmail.com or cyrilegipto.space.
                        </p>
                        <div class="contact-links">
                            <a href="mailto:darivsxp@gmail.com" class="contact-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                darivsxp@gmail.com
                            </a>
                            <a href="tel:+639763575830" class="contact-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                +63 976 357 5830
                            </a>
                            <a href="https://linkedin.com/in/v-cyril" target="_blank" rel="noopener" class="contact-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                linkedin.com/v-cyril
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer class="site-footer">
        <div class="container">
            <p>Built with Laravel &amp; a lot of coffee · © 2026 V Cyril Darivs Egipto</p>
        </div>
    </footer>

</body>
</html>

<?php

return [
    'cv_path' => 'cv/V-Cyril-Darivs-Egipto-Resume.pdf',

    'projects' => [
        [
            'name' => 'VertexShop',
            'year' => '2026',
            'tagline' => 'E-commerce platform',
            'description' => 'Full-stack e-commerce platform with authentication, product catalog, cart, wishlist, mock checkout, order tracking, and an admin dashboard. REST APIs with optimized, mobile-responsive interfaces.',
            'tags' => ['Laravel', 'Vue.js', 'MySQL', 'Sanctum', 'Tailwind'],
            'accent' => 'violet',
            'image' => 'images/projects/vertexshop.png',
            'featured' => true,
            'live' => null,
            'github' => 'https://github.com/DarivsXP/VertexShop',
        ],
        [
            'name' => 'ErgoVision',
            'year' => '2026',
            'tagline' => 'AI posture detection',
            'description' => 'Real-time ergonomic analysis with MediaPipe, ML scoring, and a responsive Laravel + Vue dashboard.',
            'tags' => ['Python', 'MediaPipe', 'Laravel', 'Vue.js'],
            'accent' => 'teal',
            'image' => 'images/projects/ergovision.png',
            'image_fit' => 'contain',
            'image_position' => 'top center',
            'featured' => true,
            'live' => 'https://ergovision.online',
            'github' => 'https://github.com/v-cyril/ergovision',
        ],
    ],

    'skills' => [
        ['name' => 'PHP', 'color' => '#8b5cf6'],
        ['name' => 'Laravel', 'color' => '#f87171'],
        ['name' => 'Vue.js', 'color' => '#34d399'],
        ['name' => 'React', 'color' => '#38bdf8'],
        ['name' => 'Python', 'color' => '#fbbf24'],
        ['name' => 'JavaScript', 'color' => '#facc15'],
        ['name' => 'TypeScript', 'color' => '#60a5fa'],
        ['name' => 'MySQL', 'color' => '#2dd4bf'],
        ['name' => 'PostgreSQL', 'color' => '#818cf8'],
        ['name' => 'REST APIs', 'color' => '#fb923c'],
        ['name' => 'Git', 'color' => '#f472b6'],
        ['name' => 'GitHub', 'color' => '#a78bfa'],
        ['name' => 'Docker', 'color' => '#22d3ee'],
        ['name' => 'Tailwind CSS', 'color' => '#5eead4'],
        ['name' => 'Vite', 'color' => '#c084fc'],
        ['name' => 'Sanctum', 'color' => '#f0b88a'],
        ['name' => 'CI/CD', 'color' => '#4ade80'],
        ['name' => 'OOP', 'color' => '#94a3b8'],
        ['name' => 'MVC', 'color' => '#e879f9'],
    ],

    'hero_roles' => [
        'Full-Stack Developer',
        'Laravel Engineer',
        'Vue.js Builder',
        'API Architect',
        'Python Developer',
    ],
];

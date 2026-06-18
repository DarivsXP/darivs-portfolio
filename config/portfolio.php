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
            'featured' => true,
            'live' => 'https://ergovision.online',
            'github' => 'https://github.com/v-cyril/ergovision',
        ],
    ],

    'skills' => [
        'PHP', 'Laravel', 'Vue.js', 'React', 'Python', 'JavaScript', 'TypeScript',
        'MySQL', 'PostgreSQL', 'REST APIs', 'Git', 'GitHub', 'Docker',
        'Tailwind CSS', 'Vite', 'Sanctum', 'CI/CD', 'OOP', 'MVC',
    ],
];

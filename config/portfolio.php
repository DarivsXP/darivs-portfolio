<?php

return [
    'cv_path' => 'cv/V-Cyril-Darivs-Egipto-Resume.pdf',

    'projects' => [
        [
            'name' => 'VertexShop',
            'tagline' => 'E-commerce platform',
            'description' => 'A full-stack e-commerce platform with user authentication, product catalog, cart, wishlist, mock checkout, and order tracking. Includes an admin dashboard for inventory and orders, REST APIs with Laravel Sanctum, and a responsive Vue.js storefront.',
            'tags' => ['Laravel', 'Vue.js', 'MySQL', 'Sanctum', 'REST API', 'Tailwind CSS'],
            'accent' => 'violet',
            'image' => 'images/projects/vertexshop.png',
            'featured' => true,
            'live' => 'https://vertexshop.cyrilegipto.space',
            'github' => 'https://github.com/DarivsXP/VertexShop',
        ],
        [
            'name' => 'ErgoVision',
            'tagline' => 'AI posture correction',
            'subtitle' => 'Angle-based scoring and adaptive feedback',
            'description' => 'An AI-powered posture correction system that uses MediaPipe pose estimation to track body angles in real time. Scores ergonomic alignment with an angle-based engine and delivers adaptive feedback to help users fix desk posture — backed by a Laravel + Vue.js dashboard, Python ML pipeline, and MySQL database.',
            'tags' => ['Python', 'MediaPipe', 'OpenCV', 'Laravel', 'Vue.js', 'MySQL', 'REST API', 'Tailwind CSS'],
            'accent' => 'teal',
            'image' => 'images/projects/ergovision.png',
            'image_fit' => 'contain',
            'image_position' => 'top center',
            'featured' => true,
            'live' => 'https://www.ergovision.online',
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

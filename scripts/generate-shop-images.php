<?php

$items = [
    ['categories', 'apparel', 'Apparel', '#6366f1', '#8b5cf6'],
    ['categories', 'desk-setup', 'Desk Setup', '#0ea5e9', '#06b6d4'],
    ['categories', 'books-learning', 'Books', '#10b981', '#34d399'],
    ['categories', 'accessories', 'Accessories', '#f59e0b', '#f97316'],
    ['products', 'laravel-hoodie', 'Laravel Hoodie', '#ef4444', '#f97316'],
    ['products', 'vue-js-keyboard', 'Vue Keyboard', '#22c55e', '#14b8a6'],
    ['products', 'api-architecture-mug', 'API Mug', '#3b82f6', '#6366f1'],
    ['products', 'clean-code-field-guide', 'Clean Code', '#8b5cf6', '#a855f7'],
    ['products', 'git-sticker-pack', 'Git Stickers', '#ec4899', '#f43f5e'],
    ['products', 'mechanical-keycap-set', 'Keycaps', '#64748b', '#334155'],
    ['products', 'full-stack-dev-tee', 'Dev Tee', '#06b6d4', '#0ea5e9'],
    ['products', 'mysql-query-notebook', 'MySQL Notebook', '#f59e0b', '#eab308'],
    ['products', 'usb-c-hub-pro', 'USB-C Hub', '#14b8a6', '#0891b2'],
    ['products', 'tailwind-css-cap', 'Tailwind Cap', '#38bdf8', '#2563eb'],
    ['products', 'docker-blueprint-poster', 'Docker Poster', '#2563eb', '#1d4ed8'],
    ['products', 'rest-api-cheat-sheet', 'REST API Sheet', '#10b981', '#059669'],
];

foreach ($items as [$dir, $slug, $label, $c1, $c2]) {
    $path = __DIR__."/public/images/shop/{$dir}";
    if (! is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $safeLabel = htmlspecialchars($label, ENT_QUOTES);
    $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="{$safeLabel}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{$c1}"/>
      <stop offset="100%" stop-color="{$c2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="220" y="160" width="360" height="280" rx="24" fill="rgba(255,255,255,0.12)"/>
  <text x="400" y="320" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-size="34" font-weight="700">{$safeLabel}</text>
  <text x="400" y="370" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="system-ui,sans-serif" font-size="18">VertexShop Demo</text>
</svg>
SVG;

    file_put_contents("{$path}/{$slug}.svg", $svg);
}

echo "Generated ".count($items)." images\n";

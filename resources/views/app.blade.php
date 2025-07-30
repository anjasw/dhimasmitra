<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- <title inertia>{{ config('app.name', 'Laravel') }}</title> --}}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> 
    <link rel="shortcut icon" href="/storage/assets/img/logo.png" type="image/x-icon">
    <!-- Material Symbols Outlined -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <!-- Rounded -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
    <!-- Sharp -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp" rel="stylesheet" /> --}}
    <!-- Preload font stylesheet -->
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp" />

    <!-- Non-blocking font stylesheet -->
    <link 
        href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" 
        rel="stylesheet" 
        media="print" 
        onload="this.media='all'"
    />
    <noscript>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    </noscript>
    <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
        rel="stylesheet" 
        media="print" 
        onload="this.media='all'"
    />
    <noscript>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    </noscript>
    <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" 
        rel="stylesheet" 
        media="print" 
        onload="this.media='all'"
    />
    <noscript>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
    </noscript>
    <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp" 
        rel="stylesheet" 
        media="print" 
        onload="this.media='all'"
    />
    <noscript>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp" rel="stylesheet" />
    </noscript>
    
    <link rel="preload" as="image" href="/assets/bg-hero.jpg" />
    <link rel="preload" as="image" href="/assets/carousel-1.jpg" />
    <link rel="preload" as="image" href="/assets/carousel-2.jpg" />
    <link rel="preload" as="image" href="/assets/carousel-3.jpg" />
    <link rel="shortcut icon" href="/logo-dhimasgroup.png" type="image/x-icon">
    <!-- Scripts -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
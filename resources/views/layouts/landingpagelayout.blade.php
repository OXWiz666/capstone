<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barangay Calumpang Health Center</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body>
    @include('landing.header')
    
    <div class="w-full min-h-screen pt-20">

        @yield('content')
        

        
    </div>
    @include('Landing.Footer')
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
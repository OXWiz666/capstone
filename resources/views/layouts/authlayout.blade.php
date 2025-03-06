<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barangay Calumpang Health Center</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="//unpkg.com/alpinejs" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @stack('styles')
</head>
<body class="bg-gray-900 text-white">
    <div class="min-h-screen flex flex-col md:flex-row overflow-hidden">
        <!-- Left side - Background image and branding for larger screens -->
        <div class="hidden md:flex md:w-1/2 bg-primary-900 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-900/85">
                <div
                    class="absolute inset-0 opacity-40"
                    style="background-image: url('https://i.ibb.co/wFSCZYdV/471634916-609791331562667-4920390300131702624-n.jpg'); background-size: cover; background-position: center; filter: blur(8px);"
                ></div>
            </div>

            <div class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                <div class="text-center">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=barangay-calumpang-large"
                        alt="Barangay Calumpang Logo"
                        class="w-32 h-32 mx-auto mb-8"
                    />
                    <h1 class="text-4xl font-bold mb-4">Barangay Calumpang</h1>
                    <h2 class="text-2xl font-semibold mb-6">
                        Rural Health Unit
                    </h2>
                    <p class="text-lg max-w-md mx-auto">
                        Providing efficient healthcare services to our community through
                        digital transformation.
                    </p>
                </div>

                <div class="mt-auto pt-12">
                    <p class="text-sm opacity-80">
                        © {{ date('Y') }} Barangay Calumpang Health Center. All rights reserved.
                    </p>
                </div>
            </div>
        </div>


        <!-- Right side - Authentication container -->
        <div class="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-100 text-gray-900">
           @yield('content')
        </div>

        <!-- Mobile-only footer -->
        <div class="md:hidden text-center p-4 text-xs text-gray-400 bg-gray-800">
            <p>© {{ date('Y') }} Barangay Calumpang Health Center</p>
            <p class="mt-1">All rights reserved</p>
        </div>


    </div>
    <script>
        window.alert_toast = function(title,text,icon = 'success'){
            Swal.fire({
                title: title,
                text: text,
                icon: icon
            });
        }
        
    </script>
    @stack('scripts')
</body>
</html>

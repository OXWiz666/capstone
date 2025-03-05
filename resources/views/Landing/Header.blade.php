<header class="w-full h-16 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
    <div class="container mx-auto h-full flex items-center justify-between px-4">
        {{-- Logo --}}
        <div class="flex items-center">
            <img
                src="https://i.ibb.co/bjPTPJDW/344753576-269776018821308-8152932488548493632-n-removebg-preview.png"
                alt="Barangay Calumpang Health Center"
                class="h-8 w-auto"
            />
            <span class="ml-2 font-semibold text-base hidden sm:inline">
                Calumpang Health Center
            </span>
        </div>

        {{-- Desktop Navigation --}}
        <div class="hidden md:block">
            <nav>
                <ul class="flex space-x-1">
                    <li>
                        <a href="{{ route('home') }}" 
                           class="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Home
                        </a>
                    </li>
                    
                    {{-- Services Dropdown --}}
                    <li class="relative group">
                        <button class="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Services
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-3 w-3"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <div class="absolute left-0 mt-2 w-[400px] hidden group-hover:block">
                            <div class="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-4">
                                <a href="{{ route('appointments') }}" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div class="text-sm font-medium leading-none">Appointments</div>
                                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        Schedule your visit to the health center
                                    </p>
                                </a>
                                <a href="{{ route('services.records') }}" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div class="text-sm font-medium leading-none">Medical Records</div>
                                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        Access your health records securely
                                    </p>
                                </a>
                                <a href="{{ route('services.vaccinations') }}" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div class="text-sm font-medium leading-none">Vaccinations</div>
                                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        View vaccination schedules and availability
                                    </p>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a href="{{ route('about') }}" 
                           class="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('contact') }}" 
                           class="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        {{-- Login Button --}}
        <div class="flex items-center gap-3">
            <a href="{{ route('login') }}" 
               class="hidden md:flex items-center gap-1.5 px-3 py-1.5 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Login</span>
            </a>

            {{-- Mobile Menu Button --}}
            <button 
                type="button"
                class="md:hidden p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
                onclick="toggleMobileMenu()"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>
    </div>

    {{-- Mobile Navigation Menu --}}
    <div id="mobileMenu" class="hidden md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-md">
        <nav class="container mx-auto py-4 px-4">
            <ul class="space-y-4">
                <li>
                    <a href="{{ route('home') }}" class="block py-2 text-gray-800 hover:text-primary">
                        Home
                    </a>
                </li>
                <li>
                    <a href="{{ route('services') }}" class="block py-2 text-gray-800 hover:text-primary">
                        Services
                    </a>
                    <ul class="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                        <li>
                            <a href="{{ route('appointments') }}" class="block py-1 text-gray-600 hover:text-primary text-sm">
                                Appointments
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('services.records') }}" class="block py-1 text-gray-600 hover:text-primary text-sm">
                                Medical Records
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('services.vaccinations') }}" class="block py-1 text-gray-600 hover:text-primary text-sm">
                                Vaccinations
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route('about') }}" class="block py-2 text-gray-800 hover:text-primary">
                        About
                    </a>
                </li>
                <li>
                    <a href="{{ route('contact') }}" class="block py-2 text-gray-800 hover:text-primary">
                        Contact
                    </a>
                </li>
                <li>
                    <a href="{{ route('login') }}" 
                       class="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Login</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</header>

<script>
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    }
</script>
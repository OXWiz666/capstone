<!-- Add Alpine.js if not already included in your layout -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<style>

    /* Enhanced dropdown animations */
    .dropdown-enter {
        opacity: 0;
        transform: translateY(-10px);
    }

    .dropdown-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dropdown-leave {
        opacity: 1;
        transform: translateY(0);
    }

    .dropdown-leave-active {
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Hover animations */
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: #000;
        transition: width 0.3s ease, left 0.3s ease;
    }

    .nav-link:hover::after {
        width: 100%;
        left: 0;
    }

    /* Smooth header shadow */
    .header-shadow {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.3s ease;
    }

    .header-shadow:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
</style>

<header class="w-full h-16 bg-white border-b border-gray-200 header-shadow fixed top-0 left-0 z-50">
    <div class="container mx-auto h-full flex items-center justify-between px-4">
        {{-- Logo --}}
        <a href="{{ route('home') }}" class="flex items-center group">
            <img src="https://i.ibb.co/bjPTPJDW/344753576-269776018821308-8152932488548493632-n-removebg-preview.png"
                alt="Barangay Calumpang Health Center"
                class="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span
                class="ml-2 font-semibold text-base hidden sm:inline text-gray-800 group-hover:text-black transition-colors duration-300">
                Calumpang Rural Health Unit
            </span>
        </a>

        {{-- Desktop Navigation --}}
        <div class="hidden md:flex flex-1 justify-center">
            <nav>
                <ul class="flex space-x-6">
                    <li>
                        <a href="{{ route('home') }}"
                            class="nav-link group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative">
                            Home
                        </a>
                    </li>

                    {{-- Services Dropdown --}}
                    <li x-data="{ open: false }" class="relative">
                        <button @click="open = !open" @mouseenter="open = true" @mouseleave="open = false" @keydown.escape.window="open = false"
                            class="nav-link group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative"
                            :class="{ 'bg-gray-100 text-gray-900': open }">
                            <span>Services</span>
                            <svg class="ml-1 h-4 w-4 transition-transform duration-300" :class="{ 'rotate-180': open }"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <div x-show="open" @mouseenter="open = true" @mouseleave="open = false"
                            x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-1"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-1"
                            class="absolute left-0 mt-2 w-72 origin-top-right rounded-xl bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                            style="display: none;">
                            <div class="space-y-2">
                                <a href="#"
                                    class="group flex items-center rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-1">
                                    <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <div>
                                        <p
                                            class="text-sm font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
                                            Appointments</p>
                                        <p
                                            class="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                            Schedule your visit to the health center</p>
                                    </div>
                                </a>

                                <a href="#"
                                    class="group flex items-center rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-1">
                                    <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fill-rule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <div>
                                        <p
                                            class="text-sm font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
                                            Medical Records</p>
                                        <p
                                            class="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                            Access your health records securely</p>
                                    </div>
                                </a>

                                <a href="{{ route('services.vaccinations') }}"
                                    class="group flex items-center rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-1">
                                    <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <div>
                                        <p
                                            class="text-sm font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
                                            Vaccinations</p>
                                        <p
                                            class="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                            View vaccination schedules and availability</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a href="{{ route('about') }}"
                            class="nav-link group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('contact') }}"
                            class="nav-link group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative">
                            Contact
                        </a>
                    </li>
                    <li>
                        {{-- {{ route('faq') }} --}}
                        <a href="#"
                            class="nav-link group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative">
                            FAQ
                        </a>
                    </li>
                </ul>
            </nav>
        </div>


        @guest
            {{-- Login Button --}}
            <div class="flex items-center gap-3">
                <a href="{{ route('login') }}"
                    class="hidden md:flex items-center gap-1.5 px-4 py-2 border rounded-lg text-gray-700 hover:text-black hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm group hover:shadow-md">
                    <svg class="h-4 w-4 text-gray-600 group-hover:text-black transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>Login</span>
                </a>


                <button type="button" class="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    x-data="{ open: false }" @click="open = !open" aria-label="Toggle menu">
                    <svg class="h-5 w-5 text-gray-600 hover:text-black transition-colors duration-300"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        @endguest

        @auth
            <li x-data="{ open: false }" class="relative list-none">
                <button @click="open = !open" @click.away="open = false" @keydown.escape.window="open = false"
                    class="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 relative"
                    :class="{ 'bg-gray-100 text-gray-900': open }">
                    <span>{{ Auth::user()->fullname }}</span>
                    <svg class="ml-1 h-4 w-4 transition-transform duration-300" :class="{ 'rotate-180': open }"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <div x-show="open" x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 translate-y-1" x-transition:enter-end="opacity-100 translate-y-0"
                    x-transition:leave="transition ease-in duration-200"
                    x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-1">
                    <div class="absolute mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                        <div class="p-2">
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300">
                                    Profile
                                </a>
                            <a href="{{ route('logout') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                                @csrf
                            </form>
                        </div>
                    </div>
                </div>
            </li>
        @endauth
    </div>
</header>

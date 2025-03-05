<section class="w-full h-screen bg-white relative overflow-hidden -mt-5">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-x10 z-10"></div>
        <img
            src="https://i.ibb.co/bcGtyyK/background-rhu.png"
            alt="Barangay Calumpang Health Center"
            class="w-full h-full object-cover filter blur-[100px]"
        />
    </div>

    <!-- Content Container -->
    <div class="relative z-20 container mx-auto px-6 md:px-20 h-full flex flex-col justify-center items-start">
        <div class="max-w-xl text-white">
            <h1 class="text-3xl md:text-4xl font-bold mb-3 leading-tight text-white">
                Welcome to Barangay<br>Calumpang Health Center
            </h1>
            <p class="text-sm md:text-base mb-6 text-white/90 leading-relaxed max-w-lg">
                Your community healthcare partner providing accessible and quality medical services for all residents. Our digital healthcare system makes it easier than ever to manage your health needs.
            </p>
            <a
                href="{{ $onCtaClick ?? '/appointments' }}"
                class="inline-flex items-center justify-center whitespace-nowrap transition-all hover:scale-105 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 shadow-md h-9 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md px-5 py-2 text-sm"
            >
                Schedule an Appointment
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>

    <!-- Gradient Overlay at Bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
</section>
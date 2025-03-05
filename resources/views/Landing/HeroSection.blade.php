<section class="w-full h-[1200px] bg-white relative overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <img
            src="{{ $imageUrl ?? 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' }}"
            alt="Barangay Calumpang Health Center"
            class="w-full h-full object-cover"
        />
    </div>

    <!-- Content Container -->
    <div class="relative z-20 container mx-auto px-25 h-full flex flex-col justify-center items-start">
        <div class="max-w-2xl text-white">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                Welcome to Barangay<br>Calumpang Health Center
            </h1>
            <p class="text-lg md:text-xl mb-8 text-gray-100">
                Your community healthcare staff is providing accessible and quality medical services for all residents. Our digital healthcare system makes it easier than ever to manage your health needs.
            </p>
            <a
                href="{{ $onCtaClick ?? '/appointments' }}"
                class="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3 text-base"
            >
                {{ $ctaText ?? 'Schedule an Appointment' }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-5 w-5 tempo-7cf4150f-150c-5829-9029-0bb3f6535101">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </a>
        </div>
    </div>

    <!-- Optional decorative element -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent z-10"></div>
</section>
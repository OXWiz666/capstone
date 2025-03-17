<section class="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
    <div class="container mx-auto max-w-5xl">
        <div class="text-center mb-12 animate-fadeIn">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{{ $title }}</h2>
            <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">{{ $subtitle }}</p>
            <div class="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach ($services as $service)
            <div class="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-200 flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 text-primary mb-6 transition-all duration-300 hover:bg-gray-200 hover:text-primary shadow-md border border-primary/20">
                    @if ($service['icon'] === 'calendar')
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    @elseif ($service['icon'] === 'file-text')
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    @elseif ($service['icon'] === 'clock')
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    @endif
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800">{{ $service['title'] }}</h3>
                <p class="text-gray-600 mb-6 leading-relaxed flex-grow">{{ $service['description'] }}</p>
                <div class="mt-auto">
                    <a href="#" class="group inline-flex items-center px-5 py-2.5 text-sm font-medium text-primary bg-white border border-primary rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300">
                        {{ $service['ctaText'] }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

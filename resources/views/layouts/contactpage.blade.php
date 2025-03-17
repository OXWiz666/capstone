<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
    <!-- Include Tailwind CSS (or your preferred CSS framework) -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Header -->
    @include('Landing.header')

    <main class="flex-grow pt-20">
        <div class="container mx-auto px-4 py-12">
            <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                Contact Us
            </h1>

            <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mb-10 border border-gray-200">
                <div class="md:flex">
                    <!-- Contact Information -->
                    <div class="md:w-1/3 bg-gray-900 text-white p-8">
                        <h2 class="text-2xl font-semibold mb-6 text-gray-100">Get in Touch</h2>
                        <p class="mb-8 text-gray-300">
                            Have questions about our services or need assistance? Reach
                            out to us through any of the following channels.
                        </p>

                        <div class="space-y-6">
                            <div class="flex items-start">
                                <svg class="mr-4 h-6 w-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <div>
                                    <h3 class="font-medium text-gray-100">Address</h3>
                                    <p class="text-gray-300">
                                        Calumpang, General Santos, Soccsksargen, Philippines
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <svg class="mr-4 h-6 w-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <div>
                                    <h3 class="font-medium text-gray-100">Phone</h3>
                                    <p class="text-gray-300">
                                        (083) 554-0146
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <svg class="mr-4 h-6 w-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <div>
                                    <h3 class="font-medium text-gray-100">Email</h3>
                                    <p class="text-gray-300">
                                        calumpangrhu@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <svg class="mr-4 h-6 w-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h3 class="font-medium text-gray-100">Operating Hours</h3>
                                    <p class="text-gray-300">
                                        Monday - Friday: 8:00 AM - 5:00 PM
                                    </p>
                                    <p class="text-gray-300">
                                        Saturday: 8:00 AM - 12:00 PM
                                    </p>
                                    <p class="text-gray-300">
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="md:w-2/3 p-8 bg-white shadow-md rounded-lg">
                        <h2 class="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
                            Send Us a Message
                        </h2>
                        <form action="{{ route('contact.submit') }}" method="POST" class="space-y-6">
                            @csrf
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" required 
                                        class="w-full px-4 py-3 text-sm border border-gray-800 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-0 transition-colors"
                                        autocomplete="name">
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="juan@example.com" required 
                                        class="w-full px-4 py-3 text-sm border border-gray-800 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-0 transition-colors"
                                        autocomplete="email">
                                </div>
                            </div>

                            <div>
                                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input type="text" id="subject" name="subject" placeholder="How can we help you?" required 
                                    class="w-full px-4 py-3 text-sm border border-gray-800 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-0 transition-colors">
                            </div>

                            <div>
                                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Please provide details about your inquiry..." required 
                                    class="w-full px-4 py-3 text-sm border border-gray-800 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-0 resize-none transition-colors"></textarea>
                            </div>

                            <button type="submit" 
                                class="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-0 transition-all duration-300 flex items-center justify-center gap-2">
                                <svg class="h-5 w-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Map Section -->
            <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-10">
                <h2 class="text-2xl font-semibold p-6 border-b border-gray-200 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary mr-2 animate-pulse-slow">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Our Location
                    <div class="ml-3 h-1 w-16 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
                </h2>
                <div class="w-full h-[500px] md:h-[600px] lg:h-[700px] relative group transition-all duration-500 ease-in-out transform hover:scale-[1.005]">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6284443055966!2d125.16923!3d6.0967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79ef7e2b25c07%3A0x745350b9a55d91ce!2sCalumpang%2C%20General%20Santos%20City%2C%20South%20Cotabato!5e0!3m2!1sen!2sph!4v1656123456789!5m2!1sen!2sph"  
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Barangay Calumpang General Santos City"
                        class="w-full h-full filter contrast-[1.05] saturate-[1.05] group-hover:contrast-[1.1] group-hover:saturate-[1.1] transition-all duration-700 shadow-inner"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                    ></iframe>
                </div>
                <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                    <span class="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Open 8:00 AM - 5:00 PM (Monday to Friday)
                    </span>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    @include('Landing.footer')
</body>
</html>
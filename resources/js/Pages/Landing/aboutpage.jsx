import { Head } from '@inertiajs/react';
import LandingLayout from "@/Layouts/LandingLayout";

const AboutPage = () => {
    return (
        <LandingLayout className="bg-gray-50">
            <Head title="About Calumpang RHU" />
            <main className="overflow-hidden">
                {/* Hero Section - Enhanced with better gradient and typography */}
                <div className="relative h-[300px] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://i.ibb.co/wFSCZYdV/471634916-609791331562667-4920390300131702624-n.jpg"
                            className="w-full h-full object-cover filter blur-sm"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                    <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 tracking-tight animate-fade-in-down font-montserrat text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                            About Calumpang Rural Health Unit
                        </h1>
                        <p className="text-sm md:text-base text-center max-w-3xl mx-auto text-white font-inter leading-relaxed justify-center animate-fade-in-up drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        ​The Calumpang Rural Health Unit (RHU) in Barangay Calumpang, General Santos City, was established in 1985. 
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-20">
                    {/* Mission Section - Improved with better card design */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20 transform transition-all hover:shadow-2xl duration-300 animate-fade-in border border-gray-200">
                        <div className="md:flex items-stretch">
                            <div className="md:w-2/5 relative overflow-hidden">
                                <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                                    alt="Healthcare professionals" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                            </div>
                            <div className="p-10 md:w-3/5 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-700 text-white font-semibold text-sm mb-6 animate-bounce shadow-sm">
                                    Our Mission
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-right font-montserrat">
                                    Compassionate Care for All
                                </h2>
                                <p className="text-gray-600 leading-relaxed animate-fade-in-left font-inter text-lg">
                                    To provide accessible, quality healthcare services to all
                                    residents of Barangay Calumpang through innovative digital
                                    solutions and compassionate care, ensuring the well-being of
                                    our community. We believe that everyone deserves access to
                                    quality healthcare regardless of their background or
                                    circumstances.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* History and Team Section - Grid layout with improved cards */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300 animate-fade-in border border-gray-200">
                            <div className="md:flex flex-col h-full">
                                <div className="h-64 relative overflow-hidden">
                                    <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                                        alt="History of healthcare" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                                </div>
                                <div className="p-10 flex flex-col justify-center flex-grow">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-gray-700 text-white font-semibold text-sm mb-6 shadow-sm">
                                        Our History
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
                                        Serving Since 1985
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed font-inter">
                                    Originally a small clinic, it has since evolved into a comprehensive healthcare facility that integrates traditional care with modern digital solutions.
                                    In 2022, the RHU launched a digital health management system to better serve the growing community.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300 animate-fade-in border border-gray-200">
                            <div className="md:flex flex-col h-full">
                                <div className="h-64 relative overflow-hidden">
                                    <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                        src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80"
                                        alt="Healthcare team" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                                </div>
                                <div className="p-10 flex flex-col justify-center flex-grow">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-gray-700 text-white font-semibold text-sm mb-6 shadow-sm">
                                        Our Team
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
                                        Dedicated Professionals
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed font-inter">
                                        Our team consists of licensed physicians, nurses, midwives, and
                                        community health workers committed to providing the highest
                                        standard of care. All our medical professionals undergo regular
                                        training to stay updated with the latest healthcare practices.
                                        We also have a technical team maintaining our digital health
                                        management system for a seamless user experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Facilities Section - Updated with modern card design */}
                    <div className="mb-20 animate-fade-in">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-gray-700 text-white font-semibold text-sm mb-4 shadow-sm">
                                Our Facilities
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 font-montserrat">
                                State-of-the-Art Healthcare Facilities
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto font-inter text-lg">
                                Equipped with modern amenities to provide comprehensive
                                healthcare services to our community
                            </p>
                            <div className="flex justify-center mt-6">
                                <div className="h-1 w-24 bg-gray-500 rounded-full"></div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:translateY(-5px) animate-fade-in-up delay-200 border border-gray-200">
                                <div className="h-56 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80"
                                        alt="Consultation Room" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-bold text-xl mb-4 text-gray-800 font-montserrat">
                                        Consultation Rooms
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-inter">
                                        Private, comfortable rooms for patient consultations with
                                        our healthcare providers, ensuring confidentiality and
                                        personalized care.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:translateY(-5px) animate-fade-in-up delay-300 border border-gray-200">
                                <div className="h-56 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80"
                                        alt="Treatment Area" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-bold text-xl mb-4 text-gray-800 font-montserrat">
                                        Treatment Area
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-inter">
                                        Fully equipped for minor procedures, vaccinations, and
                                        emergency care with modern medical equipment and trained
                                        staff.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:translateY(-5px) animate-fade-in-up delay-400 border border-gray-200">
                                <div className="h-56 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80" 
                                        alt="Digital Access Point" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-bold text-xl mb-4 text-gray-800 font-montserrat">
                                        Digital Access Point
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-inter">
                                        Computer stations for residents to access their digital
                                        health records, book appointments, and learn about health
                                        services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Vision Section - Enhanced with better design */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20 transform transition-all hover:shadow-2xl duration-300 animate-fade-in">
                        <div className="md:flex items-stretch">
                            <div className="md:w-2/5 relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" 
                                    alt="Vision" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110 opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent"></div>
                            </div>
                            <div className="p-10 md:w-3/5 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-600 text-white font-semibold text-sm mb-6 shadow-sm">
                                    Our Vision
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 font-montserrat">
                                    Shaping the Future of Healthcare
                                </h2>
                                <p className="text-gray-600 leading-relaxed font-inter text-lg">
                                    We aim to become a model for digital healthcare integration at the
                                    barangay level, demonstrating how technology can enhance
                                    healthcare delivery in local communities. Our goal is to continuously
                                    improve our services and expand our digital capabilities to better
                                    serve the residents of Barangay Calumpang and set a standard for
                                    community healthcare centers across the region.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery - Enhanced with better styling */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        <div className="rounded-2xl overflow-hidden h-56 md:h-72 shadow-lg transform hover:scale-105 transition-all duration-500 animate-fade-in">
                            <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"
                                alt="Health center"
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
                        </div>
                        <div className="rounded-2xl overflow-hidden h-56 md:h-72 shadow-lg transform hover:scale-105 transition-all duration-500 animate-fade-in animation-delay-200">
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                                alt="Medical consultation"
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
                        </div>
                        <div className="rounded-2xl overflow-hidden h-56 md:h-72 shadow-lg transform hover:scale-105 transition-all duration-500 animate-fade-in animation-delay-400">
                            <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80"
                                alt="Healthcare worker"
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
                        </div>
                        <div className="rounded-2xl overflow-hidden h-56 md:h-72 shadow-lg transform hover:scale-105 transition-all duration-500 animate-fade-in animation-delay-600">
                            <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80"
                                alt="Community outreach"
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
                        </div>
                    </div>

                    {/* Call to Action - Enhanced with better design */}
                    <div className="bg-gray-50 rounded-2xl shadow-xl p-12 text-center max-w-4xl mx-auto border border-gray-200">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6 font-montserrat">
                            Visit Our Health Center Today
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg font-inter">
                            Experience our compassionate care and modern facilities firsthand.
                            Our team is ready to assist you with all your healthcare needs.
                        </p>
                        <a href="/contact"
                            className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            Contact Us
                        </a>
                    </div>
                </div>
            </main>
        </LandingLayout>
    );
};

export default AboutPage;

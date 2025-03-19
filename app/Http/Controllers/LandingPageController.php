<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class LandingpageController extends Controller
{
    public function index(): View
    {
        $heroData = [
            'title' => 'Welcome to Barangay Calumpang Health Center',
            'description' => 'Your community healthcare partner providing accessible and quality medical services for all residents. Our digital healthcare system makes it easier than ever to manage your health needs.',
            'ctaText' => 'Schedule an Appointment',
            'imageUrl' => 'https://i.ibb.co/wFSCZYdV/471634916-609791331562667-4920390300131702624-n.jpg',
        ];

        $servicesData = [
            'title' => 'Our Digital Healthcare Services',
            'subtitle' => 'Discover the range of digital services available to Barangay Calumpang residents through our health center management system.',
            'services' => [
                [
                    'icon' => 'calendar',
                    'title' => 'Online Appointment Booking',
                    'description' => 'Schedule medical consultations, check-ups, and other health services online without the need to visit the health center in person.',
                    'ctaText' => 'Book Now',
                ],
                [
                    'icon' => 'file-text',
                    'title' => 'Medical Records Access',
                    'description' => 'Securely access your personal medical history, test results, prescriptions, and treatment plans through our digital platform.',
                    'ctaText' => 'Access Records',
                ],
                [
                    'icon' => 'clock',
                    'title' => 'Vaccination Schedules',
                    'description' => 'View upcoming vaccination campaigns, register for immunizations, and receive reminders for your family\'s vaccination appointments.',
                    'ctaText' => 'View Schedule',
                ],
            ],
        ];

        $benefitsData = [
            'title' => 'Benefits of Our Digital Healthcare System',
            'subtitle' => 'Discover how our system improves healthcare access for Barangay Calumpang residents',
            'benefits' => [
                [
                    'icon' => 'clock',
                    'title' => 'Reduced Waiting Times',
                    'description' => 'Schedule appointments online and minimize your waiting time at the health center.',
                ],
                [
                    'icon' => 'shield',
                    'title' => 'Secure Medical Records',
                    'description' => 'Access your medical history securely anytime, ensuring continuity of care.',
                ],
                [
                    'icon' => 'heart',
                    'title' => 'Better Health Outcomes',
                    'description' => 'Regular reminders and health monitoring lead to improved overall community health.',
                ],
                [
                    'icon' => 'check',
                    'title' => 'Easy Access to Services',
                    'description' => 'Get healthcare services from the comfort of your home through our digital platform.',
                ],
            ],
        ];

        $testimonialsData = [
            'title' => 'What Our Community Says',
            'subtitle' => 'Hear from residents who have experienced our digital healthcare services',
            'testimonials' => [
                [
                    'name' => 'Maria Santos',
                    'role' => 'Barangay Resident',
                    'quote' => 'The online appointment system has saved me so much time. I no longer have to wait in long lines at the health center.',
                    'imageUrl' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
                ],
                [
                    'name' => 'Juan Dela Cruz',
                    'role' => 'Senior Citizen',
                    'quote' => 'As a senior citizen, I appreciate how easy it is to access my medical records online. The staff also helped me learn how to use the system.',
                    'imageUrl' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
                ],
                [
                    'name' => 'Ana Reyes',
                    'role' => 'Mother of Three',
                    'quote' => 'Scheduling vaccinations for my children has never been easier. I get reminders and can see their complete vaccination history.',
                    'imageUrl' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
                ],
                [
                    'name' => 'Pedro Lim',
                    'role' => 'Community Health Worker',
                    'quote' => 'This system has transformed how we deliver healthcare services. We can now reach more residents and provide better follow-up care.',
                    'imageUrl' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
                ],
            ],
        ];


        $contactData = [
            'title' => 'Contact Us',
            'subtitle' => 'Get in touch with Barangay Calumpang Health Center',
            'address' => '123 Health Center Road, Barangay Calumpang, General Santos City',
            'phone' => '+63 (33) 123-4567',
            'email' => 'calumpang.health@example.com',
            'mapUrl' => 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        ];

        return view('Landing.Home', [
            'heroData' => $heroData,
            'servicesData' => $servicesData,
            'benefitsData' => $benefitsData,
            'testimonialsData' => $testimonialsData,
            'contactData' => $contactData,
            'socialLinks' => [
                ['platform' => 'Facebook', 'url' => 'https://facebook.com'],
                ['platform' => 'Twitter', 'url' => 'https://twitter.com'],
                ['platform' => 'Instagram', 'url' => 'https://instagram.com'],
            ],
            'quickLinks' => [
                ['title' => 'Home', 'url' => '/'],
                ['title' => 'Services', 'url' => '/#services'],
                ['title' => 'Appointments', 'url' => '/appointments'],
                ['title' => 'About Us', 'url' => '/about'],
                ['title' => 'Contact', 'url' => '/#contact'],
                ['title' => 'Privacy Policy', 'url' => '/privacy'],
                ['title' => 'Terms of Service', 'url' => '/terms'],
                ['title' => 'FAQ', 'url' => '/faq'],
            ],
            'contactInfo' => [
                'address' => '123 Health Center Road, Barangay Calumpang',
                'phone' => '+63 (123) 456-7890',
                'email' => 'info@calumpanghealthcenter.gov.ph',
            ],
        ]);
    }

    public function contact(): View
    {
        return view('Landing.pages.contact');
    }

    public function about(): View
    {
        return view('Landing.pages.about');
    }
    public function faq(): View
    {
        return view('Landing.pages.faq');
    }
}

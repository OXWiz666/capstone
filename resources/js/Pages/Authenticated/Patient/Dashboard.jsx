import Header from "@/components/tempo/components/landing/Header"
import HeroSection from "@/components/tempo/components/landing/HeroSection"
import ServiceSection from "@/components/tempo/components/landing/ServicesSection"
import BenefitSection from "@/components/tempo/components/landing/BenefitsSection"
import TestimonialsSection from "@/components/tempo/components/landing/TestimonialsSection"
import ContactSection from "@/components/tempo/components/landing/ContactSection"
import Footer from "@/components/tempo/components/landing/Footer"
import { usePage } from "@inertiajs/react"


export default function Dashboard(){
    return (
        <div>
            <Header
            isLoggedIn={usePage().props?.auth?.user}/>
            <HeroSection/>
            <ServiceSection/>
            <BenefitSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <Footer/>
        </div>
    )
}

import Header from "@/components/tempo/components/landing/Header";
import Footer from "@/components/tempo/components/landing/Footer";
import { usePage } from "@inertiajs/react";
export default function LandingLayout({ children, className, footer = false }) {
    return (
        <div className={className}>
            <Header isLoggedIn={usePage().props?.auth?.user} />
            {children}
            {/* <HeroSection/>
            <ServiceSection/>
            <BenefitSection/>
            <TestimonialsSection/>
            <ContactSection/>*/}
            {footer && <Footer />}
        </div>
    );
}

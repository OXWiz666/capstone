import Header from "@/components/tempo/components/landing/Header"
import { usePage } from "@inertiajs/react"
export default function LandingLayout({children,className}){


    return (
         <div
         className={className}>
            <Header
            isLoggedIn={usePage().props?.auth?.user}/>
            {children}
            {/* <HeroSection/>
            <ServiceSection/>
            <BenefitSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <Footer/> */}
        </div>
    )

}

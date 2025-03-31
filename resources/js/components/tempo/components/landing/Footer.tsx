import React from "react";
import { Button } from "../ui/button";
import {
  ChevronUp,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface FooterProps {
  logoSrc?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  contactInfo?: {
    address: string;
    phone: string;
    email: string;
  };
  quickLinks?: {
    title: string;
    url: string;
  }[];
}

const Footer = ({
  logoSrc = "/vite.svg",
  socialLinks = [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "Instagram", url: "https://instagram.com" },
  ],
  contactInfo = {
    address: "123 Health Center Road, Barangay Calumpang",
    phone: "+63 (123) 456-7890",
    email: "info@calumpanghealthcenter.gov.ph",
  },
  quickLinks = [
    { title: "Home", url: "/" },
    { title: "Services", url: "/#services" },
    { title: "Appointments", url: "/appointments" },
    { title: "About Us", url: "/about" },
    { title: "Contact", url: "/#contact" },
    { title: "Privacy Policy", url: "/privacy" },
    { title: "Terms of Service", url: "/terms" },
    { title: "FAQ", url: "/faq" },
  ],
}: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
          {/* Logo and description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <img
                src={logoSrc}
                alt="Barangay Calumpang Health Center"
                className="h-10 w-10 mr-3"
              />
              <h3 className="text-xl font-bold">Calumpang Health Center</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Providing quality healthcare services to the residents of Barangay
              Calumpang through our innovative digital health management system.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label={link.platform}
                >
                  {link.platform === "Facebook" && <Facebook size={20} />}
                  {link.platform === "Twitter" && <Twitter size={20} />}
                  {link.platform === "Instagram" && <Instagram size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-slate-300 hover:text-white transition-colors py-1"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-300 mt-0.5" />
                <span className="text-slate-300">{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-slate-300" />
                <span className="text-slate-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-300" />
                <span className="text-slate-300">{contactInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Barangay Calumpang Health Center. All
            rights reserved.
          </p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

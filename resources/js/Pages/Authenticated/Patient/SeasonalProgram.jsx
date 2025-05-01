import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card";
import { Button } from "@/components/tempo/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tempo/components/ui/tabs";
import { Badge } from "@/components/tempo/components/ui/badge";
import { Separator } from "@/components/tempo/components/ui/separator";
import { Progress } from "@/components/tempo/components/ui/progress";
import { format } from "date-fns";
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    Syringe,
    AlertCircle,
    CheckCircle2,
    Filter,
    Brain,
    Heart,
    Activity,
    Stethoscope,
} from "lucide-react";
import LandingLayout from "@/Layouts/LandingLayout";
import CustomCalendar from "@/components/CustomCalendar";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SeasonalProgramDashboard = () => {
    const { auth } = usePage().props;
    const isAuthenticated = auth && auth.user;
    
    // State for program registration modal
    const [registrationModal, setRegistrationModal] = useState({
        isOpen: false,
        program: null
    });
    
    // Helper function to handle program registration
    const handleProgramJoin = (program) => {
        if (isAuthenticated) {
            // Show registration modal with the selected program
            setRegistrationModal({
                isOpen: true,
                program: program
            });
        } else {
            window.location.href = "/login";
        }
    };
    
    // Close registration modal
    const closeRegistrationModal = () => {
        setRegistrationModal({
            ...registrationModal,
            isOpen: false
        });
    };
    
    // Handle registration form submission
    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        // For now, we'll just show a success message and close the modal
        alert("Registration successful! You have joined the program.");
        closeRegistrationModal();
    };
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeTab, setActiveTab] = useState("schedules");
    
    // Ensure guests can't access the records tab
    useEffect(() => {
        if (!isAuthenticated && activeTab === "records") {
            setActiveTab("schedules");
        }
        
        // Add global click handler to intercept appointment links
        const handleClick = (e) => {
            // Find if the click is on or inside a button that leads to /appointments
            const button = e.target.closest('button');
            if (button) {
                const onClick = button.onclick;
                if (onClick && onClick.toString().includes('/appointments')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Find the closest program card to get program details
                    const programCard = button.closest('.program-card');
                    let program = null;
                    
                    if (programCard && programCard.dataset.programId) {
                        // Find the program in our data
                        program = programSchedules.find(p => p.id === programCard.dataset.programId);
                    } else {
                        // Default program info if we can't find the specific one
                        program = {
                            name: "Health Program",
                            date: new Date(),
                            time: "TBD",
                            location: "Barangay Calumpang Health Center"
                        };
                    }
                    
                    handleProgramJoin(program);
                    return false;
                }
            }
        };
        
        document.addEventListener('click', handleClick, true);
        
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [isAuthenticated, activeTab]);
    const [programFilter, setProgramFilter] = useState(null);

    // Sample data for program schedules
    const programSchedules = [
        {
            id: "vs1",
            name: "COVID-19 Vaccination",
            date: new Date(2023, 6, 15),
            time: "9:00 AM - 12:00 PM",
            location: "Barangay Calumpang Health Center - Main Hall",
            ageGroup: "18+ years",
            availableSlots: 45,
            totalSlots: 100,
            status: "upcoming",
            type: "vaccination",
        },
        {
            id: "vs2",
            name: "Flu Vaccination",
            date: new Date(2023, 6, 18),
            time: "1:00 PM - 4:00 PM",
            location: "Barangay Calumpang Health Center - Room 2",
            ageGroup: "All ages",
            availableSlots: 30,
            totalSlots: 50,
            status: "upcoming",
            type: "vaccination",
        },
        {
            id: "mh1",
            name: "Mental Health Awareness Workshop",
            date: new Date(2023, 6, 20),
            time: "2:00 PM - 4:00 PM",
            location: "Barangay Calumpang Health Center - Conference Room",
            ageGroup: "16+ years",
            availableSlots: 25,
            totalSlots: 30,
            status: "upcoming",
            type: "mental-health",
        },
        {
            id: "mh2",
            name: "Stress Management Session",
            date: new Date(2023, 6, 22),
            time: "10:00 AM - 12:00 PM",
            location: "Barangay Calumpang Health Center - Activity Area",
            ageGroup: "18+ years",
            availableSlots: 15,
            totalSlots: 25,
            status: "upcoming",
            type: "mental-health",
        },
        {
            id: "mt1",
            name: "Prenatal Care Seminar",
            date: new Date(2023, 6, 17),
            time: "9:00 AM - 11:00 AM",
            location: "Barangay Calumpang Health Center - Maternal Care Room",
            ageGroup: "Expectant Mothers",
            availableSlots: 20,
            totalSlots: 30,
            status: "upcoming",
            type: "maternal",
        },
        {
            id: "vs4",
            name: "Hepatitis B Vaccination",
            date: new Date(2023, 6, 10),
            time: "9:00 AM - 12:00 PM",
            location: "Barangay Calumpang Health Center - Main Hall",
            ageGroup: "All ages",
            availableSlots: 0,
            totalSlots: 40,
            status: "completed",
            type: "vaccination",
        },
        {
            id: "gen1",
            name: "Blood Pressure Screening",
            date: new Date(2023, 6, 16),
            time: "8:00 AM - 4:00 PM",
            location: "Barangay Calumpang Health Center - Screening Area",
            ageGroup: "40+ years",
            availableSlots: 50,
            totalSlots: 100,
            status: "upcoming",
            type: "general",
        },
    ];

    // Sample data for personal program records
    const programRecords = [
        {
            id: "vr1",
            name: "COVID-19 Vaccine (Pfizer)",
            date: new Date(2023, 3, 15),
            programType: "Pfizer-BioNTech Vaccination",
            sessionNumber: 1,
            nextSessionDate: new Date(2023, 4, 6),
            conductedBy: "Dr. Maria Santos",
            status: "completed",
            type: "vaccination",
        },
        {
            id: "vr2",
            name: "COVID-19 Vaccine (Pfizer)",
            date: new Date(2023, 4, 6),
            programType: "Pfizer-BioNTech Vaccination",
            sessionNumber: 2,
            conductedBy: "Dr. Juan Reyes",
            status: "completed",
            type: "vaccination",
        },
        {
            id: "mhr1",
            name: "Mental Health Consultation",
            date: new Date(2023, 5, 10),
            programType: "Initial Assessment",
            conductedBy: "Dr. Elena Cruz, Psychologist",
            status: "completed",
            type: "mental-health",
        },
        {
            id: "mhr2",
            name: "Stress Management Workshop",
            date: new Date(2023, 6, 22),
            programType: "Group Therapy Session",
            conductedBy: "Dr. Elena Cruz, Psychologist",
            status: "scheduled",
            type: "mental-health",
        },
        {
            id: "vr3",
            name: "Flu Vaccine",
            date: new Date(2023, 6, 18),
            programType: "Seasonal Influenza Vaccination",
            sessionNumber: 1,
            conductedBy: "Nurse Ana Lim",
            status: "scheduled",
            type: "vaccination",
        },
    ];

    // Filter schedules based on selected date and program type
    const filteredSchedules = programSchedules.filter((schedule) => {
        const dateMatches =
            !selectedDate ||
            (schedule.date.getDate() === selectedDate.getDate() &&
                schedule.date.getMonth() === selectedDate.getMonth() &&
                schedule.date.getFullYear() === selectedDate.getFullYear());

        const typeMatches = !programFilter || schedule.type === programFilter;

        return dateMatches && typeMatches;
    });

    // Get dates with schedules for calendar highlighting
    const scheduleDates = programSchedules.map((schedule) => schedule.date);

    useEffect(() => {
        console.log("scheds: ", scheduleDates[0]);
    }, [scheduleDates]);
    // Get program type icon
    const getProgramTypeIcon = (type, className = "h-4 w-4 mr-1") => {
        switch (type) {
            case "vaccination":
                return <Syringe className={className} />;
            case "mental-health":
                return <Brain className={className} />;
            case "maternal":
                return <Heart className={className} />;
            case "general":
                return <Activity className={className} />;
            default:
                return <Stethoscope className={className} />;
        }
    };

    // Get program type label
    const getProgramTypeLabel = (type) => {
        switch (type) {
            case "vaccination":
                return "Vaccination";
            case "mental-health":
                return "Mental Health";
            case "maternal":
                return "Maternal Care";
            case "general":
                return "General Health";
            default:
                return "Other";
        }
    };

    const cardRef = useRef();

    const [downloading, setIsDownloading] = useState(false);
    const downloadRec = () => {
        const input = cardRef.current;

        setIsDownloading(true);
        html2canvas(input, {
            scale: 2, // Higher quality
            logging: false,
            useCORS: true,
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("program-records.pdf");
            })
            .finally(() => {
                setIsDownloading(false);
            });
    };

    // Program Registration Modal Component
    const ProgramRegistrationModal = () => {
        if (!registrationModal.isOpen) return null;
        
        const program = registrationModal.program;
        
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                    onClick={closeRegistrationModal}
                ></div>
                
                {/* Modal */}
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-auto max-h-[90vh] transform transition-all animate-fadeIn">
                    {/* Header */}
                    <div className="bg-gray-900 border-b border-gray-800 px-6 py-5 flex justify-between items-center rounded-t-lg">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m0 0V5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>Register for {program?.name || 'Health Program'}</span>
                        </h3>
                        <button 
                            onClick={closeRegistrationModal}
                            className="text-white hover:text-gray-200 rounded-full p-1.5 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Form Content */}
                    <form onSubmit={handleRegistrationSubmit} className="p-8">
                        <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                            <h4 className="font-semibold text-lg mb-2">{program?.name || 'Health Program'}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{program?.date ? format(program.date, 'MMMM d, yyyy') : 'Date TBD'}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{program?.time || 'Time TBD'}</span>
                                </div>
                                <div className="flex items-center col-span-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{program?.location || 'Location TBD'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstname" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.firstname || ''}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="middlename" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                                    <input 
                                        type="text" 
                                        id="middlename" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.middlename || ''}
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastname" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.lastname || ''}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="suffix" className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                                    <input 
                                        type="text" 
                                        id="suffix" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.suffix || ''}
                                        placeholder="Jr., Sr., III, etc."
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                                    <select 
                                        id="gender" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.gender || ''}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input 
                                        type="number" 
                                        id="age" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.age || ''}
                                        min="0"
                                        max="120"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                <input 
                                    type="text" 
                                    id="contact" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue={auth?.user?.contactno || ''}
                                    placeholder="e.g., 09123456789"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue={auth?.user?.email || ''}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea 
                                    id="address" 
                                    rows="2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your complete address"
                                    required
                                ></textarea>
                            </div>
                                 
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the program terms and conditions
                                </label>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={closeRegistrationModal}
                                className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Register Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <LandingLayout>
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Schedule Calendar for Seasonal Programs
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage schedules and records for Mental Health Programs
                        and other seasonal services
                    </p>
                </div>

                <Tabs
                    defaultValue="schedules"
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList className={`grid w-full md:w-auto ${isAuthenticated ? 'grid-cols-2' : 'grid-cols-1'} mb-8`}>
                        <TabsTrigger value="schedules">
                            Program Schedules
                        </TabsTrigger>
                        {isAuthenticated && (
                            <TabsTrigger value="records">
                                My Program Records
                            </TabsTrigger>
                        )}
                    </TabsList>

                    <TabsContent value="schedules" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Calendar Section */}
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Program Calendar
                                    </CardTitle>
                                    <CardDescription>
                                        Select a date to view available program
                                        schedules
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <CustomCalendar
                                            selectedDate={selectedDate}
                                            onDateSelect={setSelectedDate}
                                            hasPrograms={scheduleDates}
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
                                            <span className="text-sm text-gray-600">
                                                Has Programs
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                            <span className="text-sm text-gray-600">
                                                Selected
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium mb-2">
                                            Filter by Program Type
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge
                                                variant={
                                                    programFilter === null
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter(null)
                                                }
                                            >
                                                All Programs
                                            </Badge>
                                            <Badge
                                                variant={
                                                    programFilter ===
                                                    "vaccination"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter(
                                                        "vaccination"
                                                    )
                                                }
                                            >
                                                Vaccination
                                            </Badge>
                                            <Badge
                                                variant={
                                                    programFilter ===
                                                    "mental-health"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter(
                                                        "mental-health"
                                                    )
                                                }
                                            >
                                                Mental Health
                                            </Badge>
                                            <Badge
                                                variant={
                                                    programFilter === "maternal"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter("maternal")
                                                }
                                            >
                                                Maternal Care
                                            </Badge>
                                            <Badge
                                                variant={
                                                    programFilter === "general"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter("general")
                                                }
                                            >
                                                General Health
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Schedules List */}
                            <Card className="lg:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">
                                            {selectedDate
                                                ? `Programs for ${format(
                                                      selectedDate,
                                                      "MMMM d, yyyy"
                                                  )}`
                                                : "All Upcoming Program Schedules"}
                                            {programFilter &&
                                                ` - ${getProgramTypeLabel(
                                                    programFilter
                                                )}`}
                                        </CardTitle>
                                        <CardDescription>
                                            {filteredSchedules.length} program
                                            schedules found
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => {
                                            setSelectedDate(undefined);
                                            setProgramFilter(null);
                                        }}
                                    >
                                        <Filter className="h-4 w-4" />
                                        Reset Filters
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {filteredSchedules.length > 0 ? (
                                        filteredSchedules.map((schedule) => (
                                            <Card
                                                key={schedule.id}
                                                className="overflow-hidden program-card"
                                                data-program-id={schedule.id}
                                            >
                                                <div
                                                    className={`h-1 ${
                                                        schedule.status ===
                                                        "completed"
                                                            ? "bg-gray-300"
                                                            : schedule.availableSlots ===
                                                              0
                                                            ? "bg-red-500"
                                                            : "bg-green-500"
                                                    }`}
                                                ></div>
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                {getProgramTypeIcon(
                                                                    schedule.type
                                                                )}
                                                                <h3 className="font-semibold text-lg">
                                                                    {
                                                                        schedule.name
                                                                    }
                                                                </h3>
                                                                <Badge
                                                                    variant={
                                                                        schedule.status ===
                                                                        "completed"
                                                                            ? "outline"
                                                                            : schedule.availableSlots ===
                                                                              0
                                                                            ? "destructive"
                                                                            : "default"
                                                                    }
                                                                    className="ml-2"
                                                                >
                                                                    {schedule.status ===
                                                                    "completed"
                                                                        ? "Completed"
                                                                        : schedule.availableSlots ===
                                                                          0
                                                                        ? "Fully Booked"
                                                                        : "Available"}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center text-gray-600 text-sm gap-4">
                                                                <div className="flex items-center">
                                                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                                                    {format(
                                                                        schedule.date,
                                                                        "MMMM d, yyyy"
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <Clock className="h-4 w-4 mr-1" />
                                                                    {
                                                                        schedule.time
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-600 text-sm">
                                                                <span className="font-medium">
                                                                    Location:
                                                                </span>{" "}
                                                                {
                                                                    schedule.location
                                                                }
                                                            </div>
                                                            <div className="text-gray-600 text-sm">
                                                                <span className="font-medium">
                                                                    Age Group:
                                                                </span>{" "}
                                                                {
                                                                    schedule.ageGroup
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2 min-w-[150px]">
                                                            <div className="text-sm text-gray-600">
                                                                <span className="font-medium">
                                                                    Available
                                                                    Slots:
                                                                </span>{" "}
                                                                {
                                                                    schedule.availableSlots
                                                                }
                                                                /
                                                                {
                                                                    schedule.totalSlots
                                                                }
                                                            </div>
                                                            <Progress
                                                                value={
                                                                    (schedule.availableSlots /
                                                                        schedule.totalSlots) *
                                                                    100
                                                                }
                                                                className="h-2"
                                                            />
                                                            <Button
                                                                disabled={
                                                                    schedule.status ===
                                                                        "completed" ||
                                                                    schedule.availableSlots ===
                                                                        0
                                                                }
                                                                className="mt-2"
                                                                variant={
                                                                    schedule.status ===
                                                                        "completed" ||
                                                                    schedule.availableSlots ===
                                                                        0
                                                                        ? "outline"
                                                                        : "default"
                                                                }
                                                                size="sm"
                                                                onClick={handleProgramJoin}
                                                            >
                                                                {schedule.status ===
                                                                "completed"
                                                                    ? "Completed"
                                                                    : schedule.availableSlots ===
                                                                      0
                                                                    ? "No Slots Available"
                                                                    : "Join the Program"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                No Program Schedules Found
                                            </h3>
                                            <p className="text-gray-600">
                                                There are no program schedules
                                                matching your current filters.
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() => {
                                                    setSelectedDate(undefined);
                                                    setProgramFilter(null);
                                                }}
                                            >
                                                Reset Filters
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {isAuthenticated && (
                        <TabsContent value="records" className="space-y-6">
                        <Card ref={cardRef}>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl">
                                            My Program Records
                                        </CardTitle>
                                        <CardDescription>
                                            View your complete program history
                                            and upcoming appointments
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={handleProgramJoin}
                                    >
                                        Join the Program
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {programRecords.map((record) => (
                                        <div
                                            key={record.id}
                                            className="border rounded-lg overflow-hidden"
                                        >
                                            <div
                                                className={`h-1 ${
                                                    record.status ===
                                                    "completed"
                                                        ? "bg-green-500"
                                                        : record.status ===
                                                          "scheduled"
                                                        ? "bg-blue-500"
                                                        : "bg-red-500"
                                                }`}
                                            ></div>
                                            <div className="p-4">
                                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            {getProgramTypeIcon(
                                                                record.type
                                                            )}
                                                            <h3 className="font-semibold text-lg">
                                                                {record.name}
                                                            </h3>
                                                            <Badge
                                                                variant={
                                                                    record.status ===
                                                                    "completed"
                                                                        ? "success"
                                                                        : record.status ===
                                                                          "scheduled"
                                                                        ? "default"
                                                                        : "destructive"
                                                                }
                                                            >
                                                                {record.status ===
                                                                "completed"
                                                                    ? "Completed"
                                                                    : record.status ===
                                                                      "scheduled"
                                                                    ? "Scheduled"
                                                                    : "Missed"}
                                                            </Badge>
                                                        </div>
                                                        <div className="mt-2 text-gray-600 text-sm">
                                                            <div className="flex items-center mb-1">
                                                                <Stethoscope className="h-4 w-4 mr-2" />
                                                                <span className="font-medium">
                                                                    Program
                                                                    Type:
                                                                </span>{" "}
                                                                {
                                                                    record.programType
                                                                }
                                                            </div>
                                                            <div className="flex items-center mb-1">
                                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                                <span className="font-medium">
                                                                    Date:
                                                                </span>{" "}
                                                                {format(
                                                                    record.date,
                                                                    "MMMM d, yyyy"
                                                                )}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Users className="h-4 w-4 mr-2" />
                                                                <span className="font-medium">
                                                                    Conducted
                                                                    By:
                                                                </span>{" "}
                                                                {
                                                                    record.conductedBy
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-center items-center md:items-end gap-2">
                                                        {record.sessionNumber && (
                                                            <div className="text-sm font-medium">
                                                                Session{" "}
                                                                {
                                                                    record.sessionNumber
                                                                }
                                                            </div>
                                                        )}
                                                        {record.nextSessionDate && (
                                                            <div className="text-sm text-gray-600">
                                                                Next session:{" "}
                                                                {format(
                                                                    record.nextSessionDate,
                                                                    "MMMM d, yyyy"
                                                                )}
                                                            </div>
                                                        )}
                                                        {record.status ===
                                                            "completed" && (
                                                            <div className="flex items-center text-green-600 text-sm">
                                                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                                                Verified
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t p-4">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Total Records:
                                    </span>{" "}
                                    {programRecords.length}
                                </div>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Program Recommendations
                                </CardTitle>
                                <CardDescription>
                                    Based on your profile and history, we
                                    recommend the following programs
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 border rounded-lg program-card" data-program-id="mh2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                                                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
                                            </svg>
                                            <h3 className="font-medium text-lg">
                                                Stress Management Workshop
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            Learn effective techniques to manage
                                            stress and improve your mental
                                            wellbeing.
                                        </p>
                                        <Button
                                            size="sm"
                                            onClick={handleProgramJoin}
                                        >
                                            Join the Program
                                        </Button>
                                    </div>
                                    <div className="p-4 border rounded-lg program-card" data-program-id="vs2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                                <path d="m14.5 4-3-1-2 .5V6l-2 .5L6 5v.5L4.5 7v5.5a4 4 0 0 0 1.8 3.5l2.7 2V22h6v-4l2.7-2a4 4 0 0 0 1.8-3.5V7L18 5.5V5l-1.5 1.5-2-.5V4Z"></path>
                                                <path d="M5 7.5v-1L6.5 8 8 7.5l1.5.5 2-1 1.5.5 2 1 1.5-.5 1 1v-1l1-1"></path>
                                            </svg>
                                            <h3 className="font-medium text-lg">
                                                Annual Flu Vaccine
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            It's recommended to get your annual
                                            flu shot to protect against seasonal
                                            influenza.
                                        </p>
                                        <Button
                                            size="sm"
                                            onClick={handleProgramJoin}
                                        >
                                            Join the Program
                                        </Button>
                                    </div>
                                    <div className="p-4 border rounded-lg program-card" data-program-id="gen1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                            <h3 className="font-medium text-lg">
                                                Health Screening
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            Regular health screenings are
                                            important for preventive care.
                                            Schedule your annual check-up.
                                        </p>
                                        <Button
                                            size="sm"
                                            onClick={handleProgramJoin}
                                        >
                                            Join the Program
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    )}
                </Tabs>
            </div>
            
            {/* Render the registration modal */}
            {ProgramRegistrationModal()}
        </LandingLayout>
    );
};

export default SeasonalProgramDashboard;

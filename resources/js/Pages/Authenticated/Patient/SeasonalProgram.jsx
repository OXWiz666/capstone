import React, { useState, useRef, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
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
    const { auth, programs = [], userPrograms = [] } = usePage().props;
    const isAuthenticated = auth && auth.user;
    
    // State for program registration modal
    const [registrationModal, setRegistrationModal] = useState({
        isOpen: false,
        program: null
    });
    
    // Helper function to handle program registration
    const handleProgramJoin = (program) => {
        // Redirect to the dedicated registration page with the program ID
        window.location.href = `/services/vaccinations/registration?program_id=${program.id}`;
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
        
        if (!registrationModal.program) {
            alert("Please select a program.");
            return;
        }
        
        // Get form data
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        
        // Show loading state
        const btn = e.target.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Registering...';
        }
        
        // Prepare registration data
        const registrationData = {
            program_id: registrationModal.program.id,
            first_name: formValues.first_name,
            middle_name: formValues.middle_name || '',
            last_name: formValues.last_name,
            suffix: formValues.suffix || '',
            sex: formValues.sex,
            age: formValues.age,
            contact_number: formValues.contact_number,
            email: formValues.email,
        };
        
        // Send registration data to the server
        router.post('/services/vaccinations/register', registrationData, {
            onSuccess: () => {
                // Show success message using alert for now (can be replaced with a toast library)
                alert("Successfully registered for the program!");
                
                closeRegistrationModal();
                
                // Update the available slots for the registered program
                setProgramSchedules(prevPrograms => {
                    return prevPrograms.map(program => {
                        if (program.id === registrationModal.program.id) {
                            return {
                                ...program,
                                availableSlots: Math.max(0, program.availableSlots - 1)
                            };
                        }
                        return program;
                    });
                });
                
                // Refresh the page to update the user's programs list
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
            onError: (errors) => {
                // Reset button state
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = 'Register';
                }
                
                // Show error message
                let errorMessage = "Registration failed. Please try again later.";
                if (errors.message) {
                    errorMessage = errors.message;
                }
                
                alert("Registration Failed: " + errorMessage);
                
                console.error("Registration errors:", errors);
            }
        });
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

    // Transform program data from the server to the format we need
    const [programSchedules, setProgramSchedules] = useState([]);
    
    useEffect(() => {
        if (programs && Array.isArray(programs)) {
            // Transform the programs data from the server
            const formattedPrograms = programs.map(program => ({
                id: program.id.toString(),
                name: program.name,
                date: new Date(program.date),
                time: `${program.startTime} - ${program.endTime}`,
                location: program.location,
                ageGroup: "All ages", // Default value, can be customized if data is available
                availableSlots: program.availableSlots,
                totalSlots: program.totalSlots,
                status: program.status.toLowerCase(),
                type: mapProgramTypeToCategory(program.programType || ""),
                coordinator: program.coordinator,
                description: program.description
            }));
            
            setProgramSchedules(formattedPrograms);
        }
    }, [programs]);
    
    // Helper function to map program types to categories
    const mapProgramTypeToCategory = (programType) => {
        const type = programType.toLowerCase();
        if (type.includes('vaccine') || type.includes('vaccination') || type.includes('immunization')) {
            return 'healthprograms';
        } else if (type.includes('mental') || type.includes('counseling') || type.includes('psychology')) {
            return 'mental-health';
        } else if (type.includes('maternal') || type.includes('prenatal') || type.includes('postnatal')) {
            return 'maternal';
        } else if (type.includes('health') || type.includes('program') || type.includes('checkup')) {
            return 'healthprograms';
        } else {
            return 'general';
        }
    };

    // Transform user program records from the server
    const [programRecords, setProgramRecords] = useState([]);
    
    useEffect(() => {
        if (userPrograms && Array.isArray(userPrograms)) {
            // Transform the user programs data from the server
            const formattedRecords = userPrograms.map(record => ({
                id: record.id.toString(),
                name: record.name,
                date: new Date(record.date),
                programType: record.programType || record.name,
                sessionNumber: record.sessionNumber,
                nextSessionDate: record.nextSessionDate ? new Date(record.nextSessionDate) : null,
                conductedBy: record.conductedBy || 'Health Center Staff',
                status: record.status.toLowerCase(),
                type: mapProgramTypeToCategory(record.name)
            }));
            
            setProgramRecords(formattedRecords);
        }
    }, [userPrograms]);

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
    const scheduleDates = programSchedules.map((schedule) => {
        // Ensure we're working with Date objects
        const date = new Date(schedule.date);
        // Return a new Date object with just the year, month, and day (no time)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    // Filter programs based on selected date
    const selectedDatePrograms = selectedDate ? programSchedules.filter(program => {
        const programDate = new Date(program.date);
        return programDate.getFullYear() === selectedDate.getFullYear() &&
               programDate.getMonth() === selectedDate.getMonth() &&
               programDate.getDate() === selectedDate.getDate();
    }) : [];
    // Get program type icon
    const getProgramTypeIcon = (type, className = "h-4 w-4 mr-1") => {
        switch (type) {
            case "healthprograms":
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
            case "healthprograms":
                return "Health Programs";
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
                            <span>Register for Health Program</span>
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
                            <h4 className="font-semibold text-lg mb-2">{registrationModal.program?.name || 'Health Program'}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{registrationModal.program?.date ? format(new Date(registrationModal.program.date), 'MMMM d, yyyy') : 'Date TBD'}</span>
                                    <input type="hidden" name="date" value={registrationModal.program?.date ? format(new Date(registrationModal.program.date), 'MMMM d, yyyy') : 'Date TBD'} />
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{`${registrationModal.program?.startTime || ''} - ${registrationModal.program?.endTime || ''}`}</span>
                                    <input type="hidden" name="time" value={`${registrationModal.program?.startTime || ''} - ${registrationModal.program?.endTime || ''}`} />
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{registrationModal.program?.location || 'Location TBD'}</span>
                                    <input type="hidden" name="location" value={registrationModal.program?.location || 'Location TBD'} />
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-gray-700" />
                                    <span>{registrationModal.program?.availableSlots || 0} slots available</span>
                                </div>
                                <input type="hidden" name="program_name" value={registrationModal.program?.name || 'Health Program'} />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input 
                                        type="text" 
                                        id="first_name" 
                                        name="first_name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.firstname || ''}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                                    <input 
                                        type="text" 
                                        id="middle_name" 
                                        name="middle_name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.middlename || ''}
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        name="last_name"
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
                                        name="suffix"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.suffix || ''}
                                        placeholder="Jr., Sr., III, etc."
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                                    <select 
                                        id="sex" 
                                        name="sex"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.gender || 'Male'}
                                        required
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input 
                                        type="number" 
                                        id="age" 
                                        name="age"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        min="0"
                                        defaultValue={auth?.user?.age || ''}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <input 
                                        type="tel" 
                                        id="contact_number" 
                                        name="contact_number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.contact || ''}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={auth?.user?.email || ''}
                                        required
                                    />
                                </div>
                            </div>    
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-800">Program Registration Information</h5>
                                        <p className="text-xs text-blue-700 mt-1">
                                            By registering for this program, you confirm that the information provided is accurate. You agree to participate in the program on the scheduled date at the specified time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center mb-4">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    name="terms"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                                className="px-5 py-2.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Register for Program
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
                                                    "healthprograms"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setProgramFilter(
                                                        "healthprograms"
                                                    )
                                                }
                                            >
                                                Health Programs
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
                                <div>
                                    {programRecords.length === 0 ? (
                                        <div className="p-8 text-center border rounded-lg">
                                            <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No program records found</h3>
                                            <p className="text-gray-500">You haven't participated in any health programs yet.</p>
                                            <Button 
                                                className="mt-4 px-5 py-2 text-sm shadow-md"
                                                onClick={() => setActiveTab("schedules")}
                                            >
                                                Browse Available Programs
                                            </Button>
                                        </div>
                                    ) : (
                                        programRecords.map((record) => (
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
                                    )))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t p-4">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Total Records:
                                    </span>{" "}
                                    {programRecords.length}
                                </div>
                                {isAuthenticated && (
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => router.get('/health-programs')}
                                        className="px-5 py-2 text-sm shadow-md flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                            <path d="M21 3v5h-5"/>
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                            <path d="M3 21v-5h5"/>
                                        </svg>
                                        Refresh Records
                                    </Button>
                                )}
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {programSchedules.length === 0 ? (
                                        <div className="col-span-3 p-8 text-center">
                                            <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No programs available</h3>
                                            <p className="text-gray-500">There are currently no health programs scheduled. Please check back later.</p>
                                        </div>
                                    ) : (
                                        programSchedules.map((program) => (
                                            <div key={program.id} className="p-4 border rounded-lg program-card" data-program-id={program.id}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getProgramTypeIcon(program.type, "h-5 w-5 text-blue-600")}
                                                    <h3 className="font-medium text-lg">
                                                        {program.name}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 mb-2">
                                                    {program.description || "Join this health program to improve your well-being."}
                                                </p>
                                                <div className="text-sm text-gray-500 mb-4">
                                                    <div className="flex items-center mb-1">
                                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                                        <span>{format(program.date, "MMMM d, yyyy")}</span>
                                                    </div>
                                                    <div className="flex items-center mb-1">
                                                        <Clock className="h-4 w-4 mr-2" />
                                                        <span>{program.time}</span>
                                                    </div>
                                                    <div className="flex items-center mb-1">
                                                        <Users className="h-4 w-4 mr-2" />
                                                        <span>{program.availableSlots}/{program.totalSlots} slots available</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleProgramJoin(program)}
                                                    disabled={program.availableSlots <= 0 || program.status === "completed"}
                                                    className="w-full justify-center px-5 py-2 text-sm shadow-md"
                                                >
                                                    {program.availableSlots <= 0 ? "Fully Booked" : program.status === "completed" ? "Completed" : "Join the Program"}
                                                </Button>
                                            </div>
                                        ))
                                    )}
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

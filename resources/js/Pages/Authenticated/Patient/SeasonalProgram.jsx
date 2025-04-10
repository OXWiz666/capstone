import React, { useState } from "react";
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
import { Calendar } from "@/components/tempo/components/ui/calendar";
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

const SeasonalProgramDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState("schedules");
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
                    <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
                        <TabsTrigger value="schedules">
                            Program Schedules
                        </TabsTrigger>
                        <TabsTrigger value="records">
                            My Program Records
                        </TabsTrigger>
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
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="rounded-md border mx-auto"
                                        modifiers={{
                                            hasSchedule: scheduleDates,
                                        }}
                                        modifiersStyles={{
                                            hasSchedule: {
                                                fontWeight: "bold",
                                                backgroundColor:
                                                    "rgba(59, 130, 246, 0.1)",
                                            },
                                        }}
                                    />
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
                                                className="overflow-hidden"
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
                                                                onClick={() =>
                                                                    (window.location.href =
                                                                        "/appointments")
                                                                }
                                                            >
                                                                {schedule.status ===
                                                                "completed"
                                                                    ? "Completed"
                                                                    : schedule.availableSlots ===
                                                                      0
                                                                    ? "No Slots Available"
                                                                    : "Book Appointment"}
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

                    <TabsContent value="records" className="space-y-6">
                        <Card>
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
                                        onClick={() =>
                                            (window.location.href =
                                                "/appointments")
                                        }
                                    >
                                        Schedule New Appointment
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
                                <Button variant="outline" size="sm">
                                    Download Records
                                </Button>
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
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Brain className="h-5 w-5 text-blue-600" />
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
                                            onClick={() =>
                                                (window.location.href =
                                                    "/appointments")
                                            }
                                        >
                                            Schedule Now
                                        </Button>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Syringe className="h-5 w-5 text-blue-600" />
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
                                            onClick={() =>
                                                (window.location.href =
                                                    "/appointments")
                                            }
                                        >
                                            Schedule Now
                                        </Button>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Activity className="h-5 w-5 text-blue-600" />
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
                                            onClick={() =>
                                                (window.location.href =
                                                    "/appointments")
                                            }
                                        >
                                            Schedule Now
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </LandingLayout>
    );
};

export default SeasonalProgramDashboard;

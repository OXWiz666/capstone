import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card"; //@/components/tempo/components/ui/card
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tempo/components/ui/tabs";
import { Button } from "@/components/tempo/components/ui/button";
import { Input } from "@/components/tempo/components/ui/input";
import { Label } from "@/components/tempo/components/ui/label";
import { Textarea } from "@/components/tempo/components/ui/textarea";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/tempo/components/ui/avatar";
import { usePage, useForm } from "@inertiajs/react";
import {
    User,
    Settings,
    Bell,
    Shield,
    LogOut,
    Calendar,
    FileText,
    Upload,
    Check,
    AlertCircle,
} from "lucide-react";

import LandingLayout from "@/Layouts/LandingLayout";
//import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = ({ errors }) => {
    // Try to get user from auth context, otherwise use default
    //const { signOut } = useAuth();

    //     interface userx {
    //       firstname?: string;
    //       lastname?: string; // Optional if it exists
    //       email: string;
    //       // Add other properties your user object has
    //   }

    // Then in your component
    const user__ = usePage().props.auth.user; // Or however you get the user

    // State for form data
    // const {data, setFormData} = userForm(
    //     defaultUser
    // );
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [isSavingx, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState(false);

    // Update form data when user changes
    useEffect(() => {
        //setData(defaultUser);
        //setFormData(defaultUser);
    }, [user__]);

    // Sample appointments data
    const appointments = [
        {
            id: 1,
            date: "2023-10-15",
            time: "10:00 AM",
            doctor: "Dr. Maria Santos",
            purpose: "Annual Check-up",
            status: "Completed",
        },
        {
            id: 2,
            date: "2023-11-20",
            time: "2:30 PM",
            doctor: "Dr. Jose Reyes",
            purpose: "Vaccination",
            status: "Upcoming",
        },
    ];

    const { data, setData, post, patch, processing, recentlySuccessful } =
        useForm({
            firstname: user__.firstname,
            middlename: user__.middlename,
            lastname: user__.lastname,
            email: user__.email,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
            phone: user__.contactno,
            address: user__.address,
            medicalInfo: "No known allergies. Last check-up: March 2023",
            birthdate: user__.birth,
            emergencyContact: user__.emercont?.[0]?.contactno,
            bloodType: user__.bloodtype,
            allergies: "None",
            medications: "None",
            gender: user__.gender,
        });

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        // setFormData((prev) => ({
        //     ...prev,
        //     [id]: value,
        // }));

        setData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        post(route("patient.profile.update"), {
            onFinish: () => {
                onFinish();
            },
        });

        // Simulate API call
        // setTimeout(() => {
        //     setIsSaving(false);
        //     setSaveSuccess(true);
        //     setIsEditing(false);

        //     // Reset success message after 3 seconds
        //     setTimeout(() => {
        //         setSaveSuccess(false);
        //     }, 3000);
        // }, 1000);
    };
    const onFinish = () => {
        setIsSaving(false);
        setSaveSuccess(true);
        setIsEditing(false);
        setSaveSuccess(false);
    };

    // Handle tab change
    const handleTabChange = (value) => {
        setActiveTab(value);
        // Reset editing state when changing tabs
        setIsEditing(false);
    };

    // Handle avatar upload
    const handleAvatarUpload = () => {
        // This would normally open a file picker
        alert("Avatar upload functionality would be implemented here");
    };

    return (
        <LandingLayout className="p-5">
            <div className="container m-5 mx-auto py-12 px-4 min-h-screen">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <Card className="bg-white sticky top-4">
                            <CardHeader className="pb-4">
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/10">
                                            <AvatarImage
                                                src={data.avatar}
                                                alt={data.name}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                                name
                                            </AvatarFallback>
                                        </Avatar>
                                        <button
                                            onClick={handleAvatarUpload}
                                            className="absolute bottom-4 right-0 bg-primary text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Upload className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <CardTitle className="text-xl">
                                        {data.name}
                                    </CardTitle>
                                    <CardDescription className="text-center">
                                        {data.email}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1.5">
                                    <Button
                                        variant={
                                            activeTab === "personal"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        size="lg"
                                        onClick={() =>
                                            handleTabChange("personal")
                                        }
                                    >
                                        <User className="mr-2 h-5 w-5" />
                                        Personal Information
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "medical"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        size="lg"
                                        onClick={() =>
                                            handleTabChange("medical")
                                        }
                                    >
                                        <FileText className="mr-2 h-5 w-5" />
                                        Medical Information
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "appointments"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        size="lg"
                                        onClick={() =>
                                            handleTabChange("appointments")
                                        }
                                    >
                                        <Calendar className="mr-2 h-5 w-5" />
                                        Appointment History
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <Settings className="mr-2 h-5 w-5" />
                                        Account Settings
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <Bell className="mr-2 h-5 w-5" />
                                        Notifications
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        size="lg"
                                    >
                                        <Shield className="mr-2 h-5 w-5" />
                                        Privacy & Security
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Sign Out
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-3/4">
                        <Card className="bg-white">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Profile Settings</CardTitle>
                                        <CardDescription>
                                            Manage your personal information and
                                            account settings
                                        </CardDescription>
                                    </div>
                                    {activeTab !== "appointments" && (
                                        <Button
                                            variant={
                                                isEditing
                                                    ? "outline"
                                                    : "default"
                                            }
                                            onClick={() =>
                                                setIsEditing(!isEditing)
                                            }
                                        >
                                            {isEditing
                                                ? "Cancel"
                                                : "Edit Profile"}
                                        </Button>
                                    )}
                                </div>
                                {recentlySuccessful && (
                                    <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md flex items-center">
                                        <Check className="h-5 w-5 mr-2" />
                                        Profile updated successfully!
                                    </div>
                                )}
                                {saveError && (
                                    <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md flex items-center">
                                        <AlertCircle className="h-5 w-5 mr-2" />
                                        Failed to update profile. Please try
                                        again.
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                <Tabs
                                    value={activeTab}
                                    onValueChange={handleTabChange}
                                >
                                    <div className="row"></div>
                                    <TabsList className="mb-4 grid grid-cols-3 gap-1">
                                        <TabsTrigger
                                            value="personal"
                                            className="text-xs sm:text-sm "
                                        >
                                            Personal Information
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="medical"
                                            className="text-xs sm:text-sm "
                                        >
                                            Medical Information
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="appointments"
                                            className="text-xs sm:text-sm "
                                        >
                                            Appointment History
                                        </TabsTrigger>
                                    </TabsList>
                                    {/* Display validation errors */}
                                    {Object.keys(errors).length > 0 && (
                                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <svg
                                                        className="h-5 w-5 text-red-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <ul className="text-sm text-red-600">
                                                        {Object.entries(
                                                            errors
                                                        ).map(
                                                            ([key, error]) => (
                                                                <li key={key}>
                                                                    {error}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <TabsContent
                                        value="personal"
                                        className="space-y-4"
                                    >
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="firstname"
                                                        value={data.firstname}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="middlename">
                                                        Middle Name
                                                    </Label>
                                                    <Input
                                                        id="middlename"
                                                        value={data.middlename}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastname">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="lastname"
                                                        value={data.lastname}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        value={data.phone}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                                <div className=" space-y-2">
                                                    <Label htmlFor="birthdate">
                                                        Date of Birth
                                                    </Label>
                                                    <Input
                                                        id="birthdate"
                                                        type="date"
                                                        value={data.birthdate}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className=" space-y-2">
                                                        <Label htmlFor="birthdate">
                                                            Gender
                                                        </Label>
                                                        <Input
                                                            id="gender"
                                                            type="text"
                                                            value={data.gender}
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mt-4">
                                                <Label htmlFor="address">
                                                    Address
                                                </Label>
                                                <Textarea
                                                    id="address"
                                                    value={data.address}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </div>
                                            {isEditing && (
                                                <Button
                                                    type="submit"
                                                    className="mt-4"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? "Saving..."
                                                        : "Save Changes"}
                                                </Button>
                                            )}
                                        </form>
                                    </TabsContent>

                                    <TabsContent
                                        value="medical"
                                        className="space-y-4"
                                    >
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bloodType">
                                                        Blood Type
                                                    </Label>
                                                    <Input
                                                        id="bloodType"
                                                        value={data.bloodType}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="emergencyContact">
                                                        Emergency Contact
                                                    </Label>
                                                    <Input
                                                        id="emergencyContact"
                                                        value={
                                                            data.emergencyContact
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Name and phone number"
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 mt-4">
                                                <Label htmlFor="allergies">
                                                    Allergies
                                                </Label>
                                                <Textarea
                                                    id="allergies"
                                                    value={data.allergies}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="List any allergies"
                                                />
                                            </div>
                                            <div className="space-y-2 mt-4">
                                                <Label htmlFor="medications">
                                                    Current Medications
                                                </Label>
                                                <Textarea
                                                    id="medications"
                                                    value={data.medications}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="List any current medications"
                                                />
                                            </div>
                                            <div className="space-y-2 mt-4">
                                                <Label htmlFor="medicalInfo">
                                                    Additional Medical
                                                    Information
                                                </Label>
                                                <Textarea
                                                    id="medicalInfo"
                                                    rows={4}
                                                    value={data.medicalInfo}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            {isEditing && (
                                                <Button
                                                    type="submit"
                                                    className="mt-4"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? "Saving..."
                                                        : "Save Medical Information"}
                                                </Button>
                                            )}
                                        </form>
                                    </TabsContent>

                                    <TabsContent
                                        value="appointments"
                                        className="space-y-4"
                                    >
                                        {appointments.length > 0 ? (
                                            <div className="rounded-md border">
                                                <div className="p-4 bg-muted/50 flex justify-between items-center">
                                                    <h3 className="font-medium">
                                                        Recent Appointments
                                                    </h3>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        View All
                                                    </Button>
                                                </div>
                                                <div className="divide-y">
                                                    {appointments.map(
                                                        (appointment) => (
                                                            <div
                                                                key={
                                                                    appointment.id
                                                                }
                                                                className="p-4 hover:bg-muted/20 transition-colors"
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <h4 className="font-medium">
                                                                            {
                                                                                appointment.purpose
                                                                            }
                                                                        </h4>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {
                                                                                appointment.doctor
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <span
                                                                        className={`text-xs px-2 py-1 rounded-full ${
                                                                            appointment.status ===
                                                                            "Completed"
                                                                                ? "bg-green-100 text-green-800"
                                                                                : "bg-blue-100 text-blue-800"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            appointment.status
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center text-sm text-muted-foreground">
                                                                    <Calendar className="h-4 w-4 mr-1" />
                                                                    <span>
                                                                        {
                                                                            appointment.date
                                                                        }{" "}
                                                                        at{" "}
                                                                        {
                                                                            appointment.time
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="rounded-md border">
                                                <div className="p-4 bg-muted/50">
                                                    <h3 className="font-medium">
                                                        Recent Appointments
                                                    </h3>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-sm text-muted-foreground">
                                                        You have no recent
                                                        appointments.
                                                    </p>
                                                    <Button
                                                        className="mt-4"
                                                        variant="outline"
                                                    >
                                                        Schedule an Appointment
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="mt-6">
                                            <h3 className="font-medium mb-4">
                                                Upcoming Vaccinations
                                            </h3>
                                            <div className="rounded-md border p-4 bg-yellow-50">
                                                <div className="flex items-start">
                                                    <div className="mr-4 bg-yellow-100 p-2 rounded-full">
                                                        <Shield className="h-5 w-5 text-yellow-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-yellow-800">
                                                            Flu Vaccination Due
                                                        </h4>
                                                        <p className="text-sm text-yellow-700 mt-1">
                                                            Your annual flu
                                                            vaccination is due
                                                            this month. Please
                                                            schedule an
                                                            appointment.
                                                        </p>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="mt-2 bg-white"
                                                        >
                                                            Schedule Now
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
// import Header from "../landing/Header";
// import Footer from "../landing/Footer";
import AppointmentForm from "../partial/AppointmentForm";
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/tempo/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/tempo/components/ui/alert";
import { CheckCircle2, Info,
FileText,
Download,
Calendar,
Pill,
Activity,
Clipboard,
Search,
Filter,
ChevronRight,
AlertCircle,
Shield,
} from "lucide-react";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm,router } from '@inertiajs/react';
import { Button } from "@/components/tempo/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/tempo/components/ui/avatar";

export default function Sidebar({activeTab}){
    return (
        <>
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
                <Card className="bg-white sticky top-4">
                    <CardHeader className="pb-4">

                    </CardHeader>
                    <CardContent>
                        <div className="">
                            <Button variant={activeTab === "appointment" ? "secondary" : "ghost" }
                                className="w-full justify-start" size="lg"
                                onClick={(e) => router.visit('/appointments')}>
                                <FileText className="mr-2 h-5 w-5" />
                                Schedule Appointment
                            </Button>
                            <Button variant={ activeTab === "History" ? "secondary" : "ghost" }
                                className="w-full justify-start" size="lg"
                                onClick={(e) => router.visit('/patient/appointments/history')}>
                                <Clipboard className="mr-2 h-5 w-5" />
                                {/* <Pill className="mr-2 h-5 w-5" /> */}
                                Appointment History
                            </Button>
                        </div>
                    </CardContent>
                    {/* <CardFooter>
                        <Button variant="outline" className="w-full" onClick={()=>
                            (window.location.href = "/profile")}
                            >
                            View Profile
                        </Button>
                    </CardFooter> */}
                </Card>
            </div>
        </>
    )
}

import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/tempo/components/ui/avatar";
import { Badge } from "@/components/tempo/components/ui/badge";
import { Button } from "@/components/tempo/components/ui/button";
import { Separator } from "@/components/tempo/components/ui/separator";
import { ScrollArea } from "@/components/tempo/components/ui/scroll-area";
import {
    Check,
    Clock,
    FileText,
    MessageSquare,
    Package,
    User,
    AlertTriangle,
    Calendar,
} from "lucide-react";

// utils/formatTime.js
import moment from "moment";
import PrimaryButton from "@/components/PrimaryButton";

// interface ActivityItem {
//   id: string;
//   type:
//     | "patient"
//     | "appointment"
//     | "inventory"
//     | "message"
//     | "alert"
//     | "program";
//   title: string;
//   description: string;
//   time: string;
//   user?: {
//     name: string;
//     avatar?: string;
//     role: string;
//   };
//   status?: "success" | "pending" | "warning" | "error";
//   actionLabel?: string;
// }

// interface ActivityFeedProps {
//   activities?: ActivityItem[];
//   title?: string;
//   maxItems?: number;
// }

const getActivityIcon = () =>
    //   type: ActivityItem["type"],
    //   status?: ActivityItem["status"],
    {
        switch (type) {
            case "patient":
                return <User className="h-4 w-4 text-blue-500" />;
            case "appointment":
                return <Calendar className="h-4 w-4 text-purple-500" />;
            case "inventory":
                return <Package className="h-4 w-4 text-green-500" />;
            case "message":
                return <MessageSquare className="h-4 w-4 text-indigo-500" />;
            case "alert":
                return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case "program":
                return <FileText className="h-4 w-4 text-orange-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

const getStatusBadge = () => {
    if (!status) return null;

    switch (status) {
        case "success":
            return (
                <Badge variant="default" className="bg-green-500">
                    Completed
                </Badge>
            );
        case "pending":
            return (
                <Badge
                    variant="outline"
                    className="text-amber-500 border-amber-500"
                >
                    Pending
                </Badge>
            );
        case "warning":
            return (
                <Badge
                    variant="outline"
                    className="text-orange-500 border-orange-500"
                >
                    Warning
                </Badge>
            );
        case "error":
            return <Badge variant="destructive">Alert</Badge>;
        default:
            return null;
    }
};

const ActivityFeed = ({
    activities = [],
    title = "Recent Activities",
    maxItems = 10,
}) => {
    const displayActivities = activities; //activities.slice(0, maxItems);

    useEffect(() => {
        if (displayActivities) {
            console.log(displayActivities);
        }
    }, [displayActivities]);
    return (
        <Card className="w-full bg-white border-r-4 border-r-primary">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                        {displayActivities.length < 1 && <div>No Record</div>}
                        {displayActivities.map((activity, i) => (
                            <div key={i} className="relative">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                                        {/* {getActivityIcon(activity.type, activity.status)} */}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">
                                                {activity.data.title}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {/* {getStatusBadge(activity.status)} */}
                                                {activity.data.type ==
                                                    "new_appointment" && (
                                                    <PrimaryButton>
                                                        Reschedule
                                                    </PrimaryButton>
                                                )}
                                                <span className="text-xs text-muted-foreground">
                                                    {moment(
                                                        activity.created_at
                                                    ).format("h:mm A")}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {/* description here */}
                                            {activity.data.message}
                                        </p>

                                        {/* {activity.user && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    {activity.user.avatar ? (
                                                        <AvatarImage
                                                            src={
                                                                activity.user
                                                                    .avatar
                                                            }
                                                            alt={
                                                                activity.user
                                                                    .name
                                                            }
                                                        />
                                                    ) : (
                                                        <AvatarFallback className="text-xs">
                                                            {activity.user.name
                                                                .split(" ")
                                                                .map(
                                                                    (n) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <span className="text-xs">
                                                    <span className="font-medium">
                                                        {activity.user.name}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        {" "}
                                                        · {activity.user.role}
                                                    </span>
                                                </span>
                                            </div>
                                        )}

                                        {activity.actionLabel && (
                                            <div className="mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 text-xs"
                                                >
                                                    {activity.actionLabel}
                                                </Button>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

// Default mock data
// const defaultActivities = [
//   {
//     id: "1",
//     type: "patient",
//     title: "New patient registered",
//     description: "Maria Santos has been registered as a new patient",
//     time: "10 minutes ago",
//     user: {
//       name: "Dr. Reyes",
//       role: "Admin",
//     },
//     status: "success",
//   },
//   {
//     id: "2",
//     type: "appointment",
//     title: "Upcoming appointment",
//     description: "Prenatal checkup for Joanna Cruz scheduled at 2:00 PM",
//     time: "30 minutes ago",
//     status: "pending",
//     actionLabel: "View Details",
//   },
//   {
//     id: "3",
//     type: "inventory",
//     title: "Low stock alert",
//     description: "Paracetamol 500mg is running low (5 boxes remaining)",
//     time: "1 hour ago",
//     status: "warning",
//     actionLabel: "Restock",
//   },
//   {
//     id: "4",
//     type: "message",
//     title: "SMS notification sent",
//     description: "Vaccination reminder sent to 24 patients",
//     time: "2 hours ago",
//     user: {
//       name: "Anna Lim",
//       role: "Nurse",
//     },
//   },
//   {
//     id: "5",
//     type: "alert",
//     title: "Medicine expiry alert",
//     description: "Amoxicillin batch #A2023 will expire in 30 days",
//     time: "3 hours ago",
//     status: "error",
//     actionLabel: "Take Action",
//   },
//   {
//     id: "6",
//     type: "program",
//     title: "Health program updated",
//     description: "Immunization drive schedule updated for next month",
//     time: "5 hours ago",
//     user: {
//       name: "Dr. Santos",
//       role: "Doctor",
//     },
//   },
//   {
//     id: "7",
//     type: "appointment",
//     title: "Appointment rescheduled",
//     description: "Pedro Reyes rescheduled appointment to next Monday",
//     time: "6 hours ago",
//   },
//   {
//     id: "8",
//     type: "inventory",
//     title: "New supplies received",
//     description: "Received 20 boxes of face masks and 10 boxes of gloves",
//     time: "1 day ago",
//     user: {
//       name: "Miguel Cruz",
//       role: "Pharmacist",
//     },
//     status: "success",
//   },
// ];

export default ActivityFeed;

import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/tempo/admin/include/Sidebar";
import {
    Search,
    Filter,
    UserPlus,
    ChevronDown,
    ChevronUp,
    Download,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card";
import { Button } from "@/components/tempo/components/ui/button";
import { Input } from "@/components/tempo/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/tempo/components/ui/avatar";
import { Badge } from "@/components/tempo/components/ui/badge";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/tempo/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";

import Modal from "@/components/CustomModal";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableCaption,
    SortableTable,
    SortableTableHead,
} from "@/components/tempo/components/ui/table2";
import { usePage, router } from "@inertiajs/react";

// Mock data for appointments
const mockAppointments = [
    {
        id: "AP001",
        // user?.firstname: "Maria Santos",
        user_id: "P12345",
        date: "2023-06-15",
        time: "09:00 AM",
        doctor: "Dr. Reyes",
        // user?.service.servicename: "General Checkup",
        status: "Completed",
        avatar: "maria",
    },
    {
        id: "AP002",
        // user?.firstname: "Juan Cruz",
        user_id: "P12346",
        date: "2023-06-15",
        time: "10:30 AM",
        doctor: "Dr. Santos",
        // user?.service.servicename: "Vaccination",
        status: "Completed",
        avatar: "juan",
    },
    {
        id: "AP003",
        // user?.firstname: "Elena Magtanggol",
        user_id: "P12347",
        date: "2023-06-15",
        time: "01:00 PM",
        doctor: "Dr. Reyes",
        // user?.service.servicename: "Prenatal Checkup",
        status: "Cancelled",
        avatar: "elena",
    },
    {
        id: "AP004",
        // user?.firstname: "Pedro Penduko",
        user_id: "P12348",
        date: "2023-06-16",
        time: "11:00 AM",
        doctor: "Dr. Santos",
        // user?.service.servicename: "Blood Test",
        status: "Scheduled",
        avatar: "pedro",
    },
    {
        id: "AP005",
        // user?.firstname: "Lorna Diaz",
        user_id: "P12349",
        date: "2023-06-16",
        time: "02:30 PM",
        doctor: "Dr. Reyes",
        // user?.service.servicename: "Follow-up",
        status: "Scheduled",
        avatar: "lorna",
    },
];

export default function appointments({ Appoints, appointments_ }) {
    const [appointments, setAppointments] = useState(Appoints);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({
        key: "date",
        direction: "ascending",
    });

    // Filter appointments based on search term and status
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch =
            appointment.user?.firstname
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            appointment.user_id
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        //|| appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || appointment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort appointments
    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        // Handle undefined/null values
        if (valA == null) return sortConfig.direction === "ascending" ? -1 : 1;
        if (valB == null) return sortConfig.direction === "ascending" ? 1 : -1;

        // String comparison (case insensitive)
        if (typeof valA === "string" && typeof valB === "string") {
            const compareResult = valA
                .toLowerCase()
                .localeCompare(valB.toLowerCase());
            return sortConfig.direction === "ascending"
                ? compareResult
                : -compareResult;
        }

        // Number comparison
        if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;

        return 0;
    });

    // Request sort
    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 2:
                return <Badge className="bg-green-500">Completed</Badge>;
            case 1:
                return <Badge className="bg-blue-500">Scheduled</Badge>;
            case 3:
                return <Badge className="bg-red-500">Cancelled</Badge>;
            default:
                return <Badge>{status} ew</Badge>;
        }
    };

    const tools = () => {
        return (
            <>
                <Button variant="outline" className="flex items-center gap-2">
                    {/* <Calendar className="h-4 w-4" /> */}
                    <span>Schedule New</span>
                </Button>
            </>
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [appointment_, setAppointment_] = useState({});
    const openModal = (e, appointment) => {
        //alert('wew')
        fetch(`/auth/appointment/get/${appointment}`)
            .then((resp) => resp.json())
            .then((data) => {
                //console.log(data);
                setAppointment_(data);
            });
        setIsModalOpen(true);
        //console.log(id);
    };

    const closeModal = (e) => {
        setIsModalOpen(false);
    };

    const { links } = usePage().props.appointments_;
    return (
        <AdminLayout header="Appointments" tools={tools()}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            All Appointments
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Filter by:
                                </span>
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value={1}>Scheduled</SelectItem>
                                    <SelectItem value={2}>Completed</SelectItem>
                                    <SelectItem value={3}>Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        {/* $appointments = appointments::get();
        $appointments->load('user');
        $appointments->load('service');
        return Inertia::render('Authenticated/Admin/Appointments',[
            'Appoints' => $appointments
        ]); */}
                        <SortableTable
                            data={appointments}
                            defaultSort={{
                                key: "user.firstname",
                                direction: "asc",
                            }}
                        >
                            {({ sortedData }) => (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <SortableTableHead
                                                sortKey="user.firstname"
                                                sortable
                                            >
                                                Patient
                                            </SortableTableHead>
                                            <SortableTableHead sortKey="date">
                                                Date & Time
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Doctor
                                            </SortableTableHead>
                                            <SortableTableHead sortKey="service.servicename">
                                                Purpose
                                            </SortableTableHead>
                                            <SortableTableHead sortKey="status">
                                                Status
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Actions
                                            </SortableTableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedData.map((aa, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                //   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.avatar}`}
                                                                alt={
                                                                    aa.user
                                                                        ?.firstname
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {aa.user?.firstname
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    aa.user
                                                                        ?.firstname
                                                                }{" "}
                                                                {
                                                                    aa.user
                                                                        ?.lastname
                                                                }
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {aa.user_id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {/* moment(
                                                                                                            activity.created_at
                                                                                                        ).format("h:mm A") */}
                                                    <div className="font-medium">
                                                        {new Date(
                                                            aa.date
                                                        ).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {aa.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell>Not Set</TableCell>
                                                <TableCell>
                                                    {aa.service?.servicename}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(aa.status)}
                                                </TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </SortableTable>
                        {/* <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() =>
                                            requestSort("user?.firstname")
                                        }
                                    >
                                        <div className="flex items-center">
                                            Patient
                                            {sortConfig.key ===
                                                "user?.firstname" && (
                                                <span className="ml-1">
                                                    {sortConfig.direction ===
                                                    "ascending" ? (
                                                        <ChevronUp className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => requestSort("date")}
                                    >
                                        <div className="flex items-center">
                                            Date & Time
                                            {sortConfig.key === "date" && (
                                                <span className="ml-1">
                                                    {sortConfig.direction ===
                                                    "ascending" ? (
                                                        <ChevronUp className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedAppointments.length > 0 ? (
                                    sortedAppointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage
                                                            //   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.avatar}`}
                                                            alt={
                                                                appointment.user
                                                                    ?.firstname
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {appointment.user?.firstname
                                                                .split(" ")
                                                                .map(
                                                                    (n) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {
                                                                appointment.user
                                                                    ?.firstname
                                                            }
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {
                                                                appointment.user_id
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {new Date(
                                                        appointment.date
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {appointment.time}
                                                </div>
                                            </TableCell>
                                            <TableCell>DOCTOR</TableCell>
                                            <TableCell>
                                                {
                                                    appointment.service
                                                        ?.servicename
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    appointment.status
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    onClick={(e) =>
                                                        openModal(
                                                            e,
                                                            appointment.id
                                                        )
                                                    }
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center h-24 text-muted-foreground"
                                        >
                                            No appointments found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table> */}
                    </div>
                </div>
                <CardFooter>
                    <div className="text-sm text-muted-foreground">
                        Showing {doctors.from} to {doctors.to} of{" "}
                        {doctors.total} Results
                    </div>
                    <div className="flex ml-2 space-x-2">
                        {links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url || link.active}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url);
                                    }
                                }}
                            >
                                {link.label.includes("Previous") ? (
                                    <ChevronLeft className="h-4 w-4" />
                                ) : link.label.includes("Next") ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    link.label
                                )}
                            </Button>
                        ))}
                    </div>
                </CardFooter>
            </motion.div>
            <Modal
                isOpen={isModalOpen}
                hasCancel={true}
                onClose={closeModal}
                maxWidth="2xl"
                canceltext="Okay"
                savetext=""
            >
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                    {/* Please save this information for your reference */}
                </CardDescription>
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Name
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.user?.firstname}{" "}
                                    {appointment_.user?.lastname}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Service
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.service?.servicename}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Date
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.date}
                                    {/* {data.date
                                ? data.date.toLocaleDateString()
                                : "Not specified"} */}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Time
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.time}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Email
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.user?.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Phone
                                </p>
                                <p className="text-gray-900">
                                    {appointment_.phone}
                                </p>
                            </div>
                        </div>
                        {/* {data.notes && (

                    )} */}
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Additional Notes
                            </p>
                            <p className="text-gray-900">
                                {appointment_.notes}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </Modal>
        </AdminLayout>
    );
}

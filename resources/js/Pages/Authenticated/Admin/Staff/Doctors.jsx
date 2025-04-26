import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Search,
    Filter,
    PlusCircle,
    ChevronDown,
    ChevronUp,
    Download,
    AlertTriangle,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    UsersRound,
} from "lucide-react";
import { Button } from "@/components/tempo/components/ui/button";
import { Input } from "@/components/tempo/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/tempo/components/ui/avatar";
import { Badge } from "@/components/tempo/components/ui/badge";
import ReorderModal from "@/components/Modal2";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";

import Modal2 from "@/components/CustomModal";

import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { Dropdown } from "react-day-picker";

import Label from "@/components/InputLabel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/tempo/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card";

import Sidebar from "./Sidebar";

import StaffLayout from "./StaffLayout";
// Helper function for toast notifications
const alert_toast = (title, message, type) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

export default function Doctors({ doctorsitems, doctors, questions }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle flash messages from the server
    useEffect(() => {
        if (flash && flash.message) {
            alert_toast(flash.title, flash.message, flash.icon);
        }
    }, [flash]);

    const tools = () => {
        return (
            <>
                <Button
                    variant="outline"
                    onClick={OpenModal}
                    className="flex items-center gap-2"
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add New</span>
                </Button>
            </>
        );
    };

    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            first_name: "",
            middlename: "",
            last_name: "",
            suffix: "",
            contactNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            birth: "",
            isAdmin: "true",
        });

    const OpenModal = (e) => {
        setIsModalOpen(true);
    };
    const CloseModal = (e) => {
        setIsModalOpen(false);

        clearErrors();
        reset();
    };
    const [showPositionDropdown, setShowPositionDropdown] = useState(false);
    const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //alert("wew");
        post(route("admin.register.doctor"), {
            onSuccess: (r) => {
                CloseModal();
                alert_toast(
                    "Success!",
                    "Doctor has been registered successfully!",
                    "success"
                );
                router.reload({
                    only: ["auth"],
                    preserveScroll: true,
                });
            },
        });
    };
    // State for the selected doctor and status
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(1);

    // Function to open the status change modal
    const openStatusModal = (doctor) => {
        setDataDoctor("status", doctor.status.toString());
        setSelectedDoctor(doctor);
        setSelectedStatus(doctor.status);
        setIsView(true);
    };

    const {
        data: dataDoctor,
        setData: setDataDoctor,
        post: postDoctor,
        processing: processingDoctor,
        errors: errorsDoctor,
        clearErrors: clearErrDoctor,
        reset: resetDoctor,
    } = useForm({
        status: "",
    });

    const CloseModalView = (e) => {
        setIsView(false);
        //if (e) e.stopPropagation();
        //setSelectedDoctor(null);
    };
    // Function to update doctor status
    const updateDoctorStatus = (e) => {
        e.preventDefault();
        //console.log(dataDoctor, selectedStatus);

        postDoctor(
            route("doctor.update.status", { doctor: selectedDoctor.id }),
            {
                onSuccess: (res) => {
                    CloseModalView();
                    alert_toast(
                        "Success!",
                        "Doctor status updated successfully",
                        "success"
                    );
                },
            }
        );
    };

    const getStatusBadge = (doctor) => {
        if (!doctor || !doctor.status) return null;

        const status = doctor.status;

        switch (status) {
            case 1:
                return (
                    <Badge
                        variant="solid"
                        className="bg-green-500 text-white rounded-full px-4 py-2 text-sm font-semibold"
                    >
                        Available
                    </Badge>
                );
            case 2:
                return (
                    <Badge
                        variant="outline"
                        className="text-gray-600 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold"
                    >
                        Inactive
                    </Badge>
                );
            case 3:
                return (
                    <Badge
                        variant="outline"
                        className="text-amber-700 bg-amber-200 border border-amber-300 rounded-full px-4 py-2 text-sm font-semibold"
                    >
                        On Leave
                    </Badge>
                );
            case 4:
                return (
                    <Badge
                        variant="outline"
                        className="text-blue-700 bg-blue-200 border border-blue-300 rounded-full px-4 py-2 text-sm font-semibold"
                    >
                        In Consultation
                    </Badge>
                );
            default:
                return null;
        }
    };

    const [view, setIsView] = useState(false);

    const { links } = usePage().props.doctors; // Get pagination links
    // useEffect(() => {
    //     console.log("doctors", links);
    // }, [links]);

    return (
        <StaffLayout>
            <div>
                <h1 className="text-3xl font-bold mb-2">Doctors</h1>
                {/* <p className="text-gray-600">
                            Book your visit to Barangay Calumpang Health Center.
                            Please fill out the form below with your information
                            and preferred appointment details.
                        </p> */}
                <p className="text-muted-foreground"></p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <Sidebar activeTab={"doctors"} />
                <div className=" bg-accent  rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            {/* Doctors */}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Filter by:
                                </span>
                            </div>

                            <Select>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="In Stock">
                                        In Stock
                                    </SelectItem>
                                    <SelectItem value="Low Stock">
                                        Low Stock
                                    </SelectItem>
                                    <SelectItem value="Out of Stock">
                                        Out of Stock
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                            // value={categoryFilter}
                            // onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Categories
                                    </SelectItem>
                                    <SelectItem value="Medication">
                                        Medication
                                    </SelectItem>
                                    <SelectItem value="Supplies">
                                        Supplies
                                    </SelectItem>
                                    <SelectItem value="Equipment">
                                        Equipment
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <SortableTable
                            data={doctorsitems}
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
                                                sortKey="id"
                                                sortable
                                            >
                                                ID
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="user.firstname"
                                                sortable
                                            >
                                                Fullname
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="specialty.specialty"
                                                sortable
                                            >
                                                Specialization
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="user.contactno"
                                                sortable
                                            >
                                                Contact Information
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="status"
                                                sortable
                                            >
                                                Availability Status
                                            </SortableTableHead>
                                            <SortableTableHead sortable>
                                                Action
                                            </SortableTableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedData.map((d) => (
                                            <TableRow key={d.id}>
                                                <TableCell>
                                                    DOC - {d.id}
                                                </TableCell>
                                                <TableCell>
                                                    {d.user?.firstname}{" "}
                                                    {d.user?.lastname}
                                                </TableCell>
                                                <TableCell>
                                                    {d.specialty?.specialty ??
                                                        "Not Set"}
                                                </TableCell>
                                                <TableCell>
                                                    {d.user?.contactno} |{" "}
                                                    {d.user?.email}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(d)}
                                                </TableCell>
                                                <TableCell>
                                                    <PrimaryButton
                                                        className=" btn-sm"
                                                        onClick={() =>
                                                            openStatusModal(d)
                                                        }
                                                    >
                                                        Edit
                                                    </PrimaryButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </SortableTable>
                    </div>
                    <CardFooter className=" mt-2">
                        <div className="text-sm text-muted-foreground">
                            Showing {doctors.from} to {doctors.to} of{" "}
                            {doctors.total} Results
                        </div>
                        <div className="flex ml-2 space-x-2">
                            {links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        link.active ? "default" : "outline"
                                    }
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
                </div>
            </div>
            <Modal2 isOpen={view} maxWidth="sm" onClose={CloseModalView}>
                <div className="py-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                value={dataDoctor.status}
                                onValueChange={(value) => {
                                    setDataDoctor("status", value);
                                }}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Available</SelectItem>
                                    <SelectItem value="2">Inactive</SelectItem>
                                    <SelectItem value="4">
                                        In Consultation
                                    </SelectItem>
                                    <SelectItem value="3">On Leave</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={CloseModalView}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            disabled={processingDoctor}
                            onClick={updateDoctorStatus}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </div>
            </Modal2>
        </StaffLayout>
    );
}

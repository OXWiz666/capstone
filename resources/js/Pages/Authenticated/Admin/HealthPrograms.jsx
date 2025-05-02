import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/tempo/admin/include/Sidebar";
import {
    Search,
    Filter,
    UserPlus,
    ChevronDown,
    ChevronUp,
    Download,
    PlusCircle,
} from "lucide-react";
import { Button } from "@/components/tempo/components/ui/button";
import { Input } from "@/components/tempo/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/tempo/components/ui/avatar";
import { Badge } from "@/components/tempo/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/tempo/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/tempo/components/ui/dialog";

import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import InputError from "@/components/InputError";

// Mock data for health programs
const mockPrograms = [
    {
        id: "HP001",
        name: "Maternal Care Program",
        description:
            "Comprehensive care for pregnant women including prenatal checkups and vitamins",
        startDate: "2023-01-15",
        endDate: "2023-12-31",
        status: "Active",
        participants: 45,
        coordinator: "Dr. Reyes",
        avatar: "maternal",
    },
    {
        id: "HP002",
        name: "Child Immunization",
        description: "Routine vaccinations for children aged 0-5 years",
        startDate: "2023-02-01",
        endDate: "2023-12-31",
        status: "Active",
        participants: 78,
        coordinator: "Dr. Santos",
        avatar: "child",
    },
    {
        id: "HP003",
        name: "Diabetes Management",
        description: "Regular monitoring and education for diabetes patients",
        startDate: "2023-03-10",
        endDate: "2023-11-30",
        status: "Active",
        participants: 32,
        coordinator: "Dr. Reyes",
        avatar: "diabetes",
    },
    {
        id: "HP004",
        name: "Hypertension Control",
        description: "Blood pressure monitoring and lifestyle counseling",
        startDate: "2023-01-05",
        endDate: "2023-10-31",
        status: "Completed",
        participants: 56,
        coordinator: "Dr. Santos",
        avatar: "hypertension",
    },
    {
        id: "HP005",
        name: "Nutrition Education",
        description:
            "Community workshops on balanced diet and proper nutrition",
        startDate: "2023-04-15",
        endDate: "2023-09-30",
        status: "Upcoming",
        participants: 0,
        coordinator: "Dr. Reyes",
        avatar: "nutrition",
    },
];

const HealthPrograms = () => {
    const [programs, setPrograms] = useState(mockPrograms);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });

    // Filter programs based on search term and status
    const filteredPrograms = programs.filter((program) => {
        const matchesSearch =
            program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            program.coordinator
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || program.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort programs
    const sortedPrograms = [...filteredPrograms].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
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
            case "Active":
                return <Badge className="bg-green-500">Active</Badge>;
            case "Completed":
                return <Badge className="bg-gray-500">Completed</Badge>;
            case "Upcoming":
                return <Badge className="bg-blue-500">Upcoming</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const { data, setData, post, processing, recentlySuccessful, errors } =
        useForm({
            programname: "",
            description: "",
            date: "",
            starttime: "",
            endtime: "",
            location: "",
            slots: "",
            coordinatorid: "",
            status: "Available",
        });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const CreateProgram = (e) => {
        e.preventDefault();

        post(route("admin.programs.create"), {
            onSuccess: () => {
                setIsDialogOpen(false);
                alert_toast(
                    "Success!",
                    "Program successfully created!",
                    "success"
                );
            },
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (value, field) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const tools = () => {
        return (
            <>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Program</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <form onSubmit={CreateProgram}>
                            <DialogHeader>
                                <DialogTitle>
                                    Create New Health Program
                                </DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create a new health
                                    program.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="programname"
                                        className="text-right font-medium"
                                    >
                                        Program Name
                                    </label>
                                    <Input
                                        id="programname"
                                        placeholder="Enter program name"
                                        className="col-span-3"
                                        value={data.programname}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.programname} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="description"
                                        className="text-right font-medium"
                                    >
                                        Description
                                    </label>
                                    <Input
                                        id="description"
                                        placeholder="Enter program description"
                                        className="col-span-3"
                                        value={data.description}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="date"
                                        className="text-right font-medium"
                                    >
                                        Date
                                    </label>
                                    <Input
                                        id="date"
                                        type="date"
                                        className="col-span-3"
                                        value={data.date}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.date} />
                                </div>
                                {/* <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="endDate"
                                        className="text-right font-medium"
                                    >
                                        End Date
                                    </label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        className="col-span-3"
                                    />
                                </div> */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="starttime"
                                        className="text-right font-medium"
                                    >
                                        Start Time
                                    </label>
                                    <Input
                                        id="starttime"
                                        placeholder="e.g. 9:00 AM"
                                        className="col-span-3"
                                        value={data.starttime}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.starttime} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="endtime"
                                        className="text-right font-medium"
                                    >
                                        End Time
                                    </label>
                                    <Input
                                        id="endtime"
                                        placeholder="e.g. 9:00 AM"
                                        className="col-span-3"
                                        value={data.endtime}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.endtime} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="location"
                                        className="text-right font-medium"
                                    >
                                        Location
                                    </label>
                                    <Input
                                        id="location"
                                        placeholder="Enter program location"
                                        className="col-span-3"
                                        value={data.location}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.location} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="availableSlots"
                                        className="text-right font-medium"
                                    >
                                        Available Slots
                                    </label>
                                    <Input
                                        id="slots"
                                        type="number"
                                        placeholder="Enter number of slots"
                                        className="col-span-3"
                                        value={data.slots}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.slots} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="coordinator"
                                        className="text-right font-medium"
                                    >
                                        Coordinator
                                    </label>
                                    <Select
                                        id="coordinatorid"
                                        value={data.coordinatorid}
                                        onValueChange={(v) =>
                                            handleSelectChange(
                                                v,
                                                "coordinatorid"
                                            )
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select coordinator" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">
                                                Dr. Reyes
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Dr. Santos
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Dr. Cruz
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.coordinatorid}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                        htmlFor="status"
                                        className="text-right font-medium"
                                    >
                                        Status
                                    </label>
                                    <Select
                                        id="status"
                                        value={data.status}
                                        onValueChange={(v) =>
                                            handleSelectChange(v, "status")
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">
                                                Available
                                            </SelectItem>
                                            <SelectItem value="Full">
                                                Full
                                            </SelectItem>
                                            <SelectItem value="Cancelled">
                                                Cancelled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={processing} type="submit">
                                    {processing
                                        ? "Creating..."
                                        : "Create Program"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        );
    };
    return (
        <AdminLayout header="Health Programs" tools={tools()}>
            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            All Health Programs
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
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="Upcoming">
                                        Upcoming
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => requestSort("name")}
                                    >
                                        <div className="flex items-center">
                                            Program Name
                                            {sortConfig.key === "name" && (
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
                                    <TableHead>Description</TableHead>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => requestSort("startDate")}
                                    >
                                        <div className="flex items-center">
                                            Duration
                                            {sortConfig.key === "startDate" && (
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
                                        onClick={() =>
                                            requestSort("participants")
                                        }
                                    >
                                        <div className="flex items-center">
                                            Participants
                                            {sortConfig.key ===
                                                "participants" && (
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
                                    <TableHead>Coordinator</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedPrograms.length > 0 ? (
                                    sortedPrograms.map((program) => (
                                        <TableRow key={program.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${program.avatar}`}
                                                            alt={program.name}
                                                        />
                                                        <AvatarFallback>
                                                            {program.name
                                                                .split(" ")
                                                                .map(
                                                                    (n) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {program.name}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {program.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate">
                                                    {program.description}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {/* {new Date(
                                                        program.startDate
                                                    ).toLocaleDateString()}{" "}
                                                    -
                                                    {new Date(
                                                        program.endDate
                                                    ).toLocaleDateString()} */}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {program.participants}
                                            </TableCell>
                                            <TableCell>
                                                {program.coordinator}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(program.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
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
                                            colSpan={7}
                                            className="text-center h-24 text-muted-foreground"
                                        >
                                            No programs found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default HealthPrograms;

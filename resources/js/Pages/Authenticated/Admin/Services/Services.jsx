import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    ChevronDown,
    ChevronUp,
    Download,
    Edit,
    Trash2,
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/tempo/components/ui/dialog";
import { Label } from "@/components/tempo/components/ui/label";
import { Textarea } from "@/components/tempo/components/ui/textarea";

import SideBar from "./Sidebar";
import ServicesLayout from "./ServicesLayout";
// Mock data for services
const mockServices = [
    {
        id: "SRV001",
        name: "General Consultation",
        description: "Basic health consultation with a doctor",
        status: "Active",
        subServices: [
            {
                id: "SUB001",
                name: "Initial Consultation",
                description: "First-time patient consultation",
                duration: 30,
                price: 500,
                recurrenceDates: ["Monday", "Wednesday", "Friday"],
            },
            {
                id: "SUB002",
                name: "Follow-up Consultation",
                description: "Follow-up visit for existing patients",
                duration: 15,
                price: 300,
                recurrenceDates: ["Tuesday", "Thursday"],
            },
        ],
    },
    {
        id: "SRV002",
        name: "Vaccination",
        description: "Various vaccination services",
        status: "Active",
        subServices: [
            {
                id: "SUB003",
                name: "Flu Vaccine",
                description: "Annual influenza vaccination",
                duration: 15,
                price: 350,
                recurrenceDates: ["Monday", "Friday"],
            },
            {
                id: "SUB004",
                name: "COVID-19 Vaccine",
                description: "COVID-19 vaccination",
                duration: 20,
                price: 0,
                recurrenceDates: ["Wednesday"],
            },
        ],
    },
    {
        id: "SRV003",
        name: "Prenatal Care",
        description: "Care for pregnant women",
        status: "Active",
        subServices: [
            {
                id: "SUB005",
                name: "Initial Prenatal Visit",
                description: "First prenatal checkup",
                duration: 45,
                price: 800,
                recurrenceDates: ["Monday", "Thursday"],
            },
            {
                id: "SUB006",
                name: "Follow-up Prenatal Visit",
                description: "Regular prenatal checkup",
                duration: 30,
                price: 500,
                recurrenceDates: ["Tuesday", "Friday"],
            },
        ],
    },
];

const Services = ({ services_ }) => {
    const [services, setServices] = useState(services_);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });

    useEffect(() => {
        console.log(services_);
    }, [services_]);

    const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
    const [isSubServiceDialogOpen, setIsSubServiceDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [expandedService, setExpandedService] = useState(null);

    // New service form state
    const [newService, setNewService] = useState({
        name: "",
        description: "",
        status: "Active",
    });

    // New sub-service form state
    const [newSubService, setNewSubService] = useState({
        name: "",
        description: "",
        duration: 30,
        price: 0,
        recurrenceDates: [],
    });

    // Filter services based on search term and status
    const filteredServices = services.filter((service) => {
        const matchesSearch = service.servicename
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || service.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort services
    const sortedServices = [...filteredServices].sort((a, b) => {
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

    // Toggle service expansion
    const toggleServiceExpansion = (serviceId) => {
        if (expandedService === serviceId) {
            setExpandedService(null);
        } else {
            setExpandedService(serviceId);
        }
    };

    // Handle service form input changes
    const handleServiceInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    // Handle sub-service form input changes
    const handleSubServiceInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubService({ ...newSubService, [name]: value });
    };

    // Handle recurrence date selection
    const handleRecurrenceDateChange = (day) => {
        const currentDates = [...newSubService.recurrenceDates];
        if (currentDates.includes(day)) {
            setNewSubService({
                ...newSubService,
                recurrenceDates: currentDates.filter((d) => d !== day),
            });
        } else {
            setNewSubService({
                ...newSubService,
                recurrenceDates: [...currentDates, day],
            });
        }
    };

    // Add new service
    const addService = () => {
        const newServiceObj = {
            id: `SRV${String(services.length + 1).padStart(3, "0")}`,
            ...newService,
            subServices: [],
        };

        setServices([...services, newServiceObj]);
        setNewService({ name: "", description: "", status: "Active" });
        setIsServiceDialogOpen(false);
    };

    // Add new sub-service
    const addSubService = () => {
        if (!selectedService) return;

        const service = services.find((s) => s.id === selectedService);
        if (!service) return;

        const newSubServiceObj = {
            id: `SUB${String(
                services.reduce((acc, s) => acc + s.subServices.length, 0) + 1
            ).padStart(3, "0")}`,
            ...newSubService,
        };

        const updatedServices = services.map((s) => {
            if (s.id === selectedService) {
                return {
                    ...s,
                    subServices: [...s.subServices, newSubServiceObj],
                };
            }
            return s;
        });

        setServices(updatedServices);
        setNewSubService({
            name: "",
            description: "",
            duration: 30,
            price: 0,
            recurrenceDates: [],
        });
        setIsSubServiceDialogOpen(false);
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 1:
                return <Badge className="bg-green-500">Active</Badge>;
            case 0:
                return <Badge className="bg-gray-500">Inactive</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <ServicesLayout>
            <div>
                <h1 className="text-3xl font-bold mb-2">Overview</h1>
                {/* <p className="text-gray-600">
                            Book your visit to Barangay Calumpang Health Center.
                            Please fill out the form below with your information
                            and preferred appointment details.
                        </p> */}
                <p className="text-muted-foreground"></p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <SideBar activeTab={"services"} />
                <div className="bg-accent/20 rounded-lg shadow-sm p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            All Services
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
                                    <SelectItem value="Inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        {/* <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40px]"></TableHead>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => requestSort("name")}
                                    >
                                        <div className="flex items-center">
                                            Service Name
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Sub-services</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedServices.length > 0 ? (
                                    sortedServices.map((service) => (
                                        <React.Fragment key={service.id}>
                                            <TableRow>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            toggleServiceExpansion(
                                                                service.id
                                                            )
                                                        }
                                                    >
                                                        {expandedService ===
                                                        service.id ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronDown className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {service.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {service.description}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        service.status
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {service.subServices.length}{" "}
                                                    sub-services
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Dialog
                                                            open={
                                                                isSubServiceDialogOpen &&
                                                                selectedService ===
                                                                    service.id
                                                            }
                                                            onOpenChange={(
                                                                open
                                                            ) => {
                                                                setIsSubServiceDialogOpen(
                                                                    open
                                                                );
                                                                if (open)
                                                                    setSelectedService(
                                                                        service.id
                                                                    );
                                                            }}
                                                        >
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        setSelectedService(
                                                                            service.id
                                                                        )
                                                                    }
                                                                >
                                                                    Add
                                                                    Sub-service
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Add
                                                                        Sub-service
                                                                        to{" "}
                                                                        {
                                                                            service.name
                                                                        }
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        Create a
                                                                        new
                                                                        sub-service
                                                                        for this
                                                                        service
                                                                        category.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label
                                                                            htmlFor="subName"
                                                                            className="text-right"
                                                                        >
                                                                            Name
                                                                        </Label>
                                                                        <Input
                                                                            id="subName"
                                                                            name="name"
                                                                            value={
                                                                                newSubService.name
                                                                            }
                                                                            onChange={
                                                                                handleSubServiceInputChange
                                                                            }
                                                                            className="col-span-3"
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label
                                                                            htmlFor="subDescription"
                                                                            className="text-right"
                                                                        >
                                                                            Description
                                                                        </Label>
                                                                        <Textarea
                                                                            id="subDescription"
                                                                            name="description"
                                                                            value={
                                                                                newSubService.description
                                                                            }
                                                                            onChange={
                                                                                handleSubServiceInputChange
                                                                            }
                                                                            className="col-span-3"
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label
                                                                            htmlFor="duration"
                                                                            className="text-right"
                                                                        >
                                                                            Duration
                                                                            (min)
                                                                        </Label>
                                                                        <Input
                                                                            id="duration"
                                                                            name="duration"
                                                                            type="number"
                                                                            value={
                                                                                newSubService.duration
                                                                            }
                                                                            onChange={
                                                                                handleSubServiceInputChange
                                                                            }
                                                                            className="col-span-3"
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label
                                                                            htmlFor="price"
                                                                            className="text-right"
                                                                        >
                                                                            Price
                                                                            (₱)
                                                                        </Label>
                                                                        <Input
                                                                            id="price"
                                                                            name="price"
                                                                            type="number"
                                                                            value={
                                                                                newSubService.price
                                                                            }
                                                                            onChange={
                                                                                handleSubServiceInputChange
                                                                            }
                                                                            className="col-span-3"
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-4 items-start gap-4">
                                                                        <Label className="text-right pt-2">
                                                                            Available
                                                                            Days
                                                                        </Label>
                                                                        <div className="col-span-3 flex flex-wrap gap-2">
                                                                            {[
                                                                                "Monday",
                                                                                "Tuesday",
                                                                                "Wednesday",
                                                                                "Thursday",
                                                                                "Friday",
                                                                                "Saturday",
                                                                                "Sunday",
                                                                            ].map(
                                                                                (
                                                                                    day
                                                                                ) => (
                                                                                    <Badge
                                                                                        key={
                                                                                            day
                                                                                        }
                                                                                        className={`cursor-pointer ${
                                                                                            newSubService.recurrenceDates.includes(
                                                                                                day
                                                                                            )
                                                                                                ? "bg-primary"
                                                                                                : "bg-muted"
                                                                                        }`}
                                                                                        onClick={() =>
                                                                                            handleRecurrenceDateChange(
                                                                                                day
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            day
                                                                                        }
                                                                                    </Badge>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <Button
                                                                        type="submit"
                                                                        onClick={
                                                                            addSubService
                                                                        }
                                                                        disabled={
                                                                            !newSubService.name
                                                                        }
                                                                    >
                                                                        Save
                                                                        Sub-service
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            {expandedService === service.id && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={6}
                                                        className="p-0"
                                                    >
                                                        <div className="bg-muted/20 p-4">
                                                            <h3 className="font-medium mb-2">
                                                                Sub-services for{" "}
                                                                {service.name}
                                                            </h3>
                                                            {service.subServices
                                                                .length > 0 ? (
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>
                                                                                Name
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Description
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Duration
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Price
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Available
                                                                                Days
                                                                            </TableHead>
                                                                            <TableHead className="text-right">
                                                                                Actions
                                                                            </TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {service.subServices.map(
                                                                            (
                                                                                subService
                                                                            ) => (
                                                                                <TableRow
                                                                                    key={
                                                                                        subService.id
                                                                                    }
                                                                                >
                                                                                    <TableCell>
                                                                                        {
                                                                                            subService.name
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {
                                                                                            subService.description
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {
                                                                                            subService.duration
                                                                                        }{" "}
                                                                                        min
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        ₱
                                                                                        {
                                                                                            subService.price
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <div className="flex flex-wrap gap-1">
                                                                                            {subService.recurrenceDates.map(
                                                                                                (
                                                                                                    day
                                                                                                ) => (
                                                                                                    <Badge
                                                                                                        key={
                                                                                                            day
                                                                                                        }
                                                                                                        className="bg-primary text-xs"
                                                                                                    >
                                                                                                        {
                                                                                                            day
                                                                                                        }
                                                                                                    </Badge>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        <div className="flex justify-end gap-2">
                                                                                            <Button
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                            >
                                                                                                <Edit className="h-4 w-4" />
                                                                                            </Button>
                                                                                            <Button
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                            >
                                                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                                                            </Button>
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            ) : (
                                                                <p className="text-muted-foreground">
                                                                    No
                                                                    sub-services
                                                                    found for
                                                                    this
                                                                    service.
                                                                </p>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center h-24 text-muted-foreground"
                                        >
                                            No services found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table> */}
                        <SortableTable
                            data={services}
                            defaultSort={{
                                key: "user.firstname",
                                direction: "asc",
                            }}
                        >
                            {({ sortedData }) => (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <SortableTableHead>
                                                Service Name
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Status
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Sub Services
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Actions
                                            </SortableTableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {sortedData.map((service, i) => (
                                            <TableRow>
                                                <TableCell>
                                                    {service.servicename}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        service.status
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {service?.subservices
                                                        .length <= 0 && (
                                                        <div>
                                                            No Sub Services
                                                        </div>
                                                    )}
                                                    {service?.subservices.map(
                                                        (sub, i) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        sub.subservicename
                                                                    }{" "}
                                                                </>
                                                            );
                                                        }
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Add Sub-service
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent></DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </SortableTable>
                    </div>
                </div>
            </div>
        </ServicesLayout>
    );
};

export default Services;

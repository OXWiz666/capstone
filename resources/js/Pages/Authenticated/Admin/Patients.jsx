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

import AdminLayout from "@/Layouts/AdminLayout";
// Mock data for patients
const mockPatients = [
    {
        id: "P12345",
        name: "Maria Santos",
        age: 32,
        gender: "Female",
        contactNumber: "09123456789",
        address: "123 Rizal St., Calumpang",
        lastVisit: "2023-06-10",
        status: "Active",
        medicalConditions: "Hypertension, Diabetes",
        avatar: "maria",
    },
    {
        id: "P12346",
        name: "Juan Cruz",
        age: 45,
        gender: "Male",
        contactNumber: "09234567890",
        address: "456 Bonifacio Ave., Calumpang",
        lastVisit: "2023-05-22",
        status: "Active",
        medicalConditions: "Asthma",
        avatar: "juan",
    },
    {
        id: "P12347",
        name: "Elena Magtanggol",
        age: 28,
        gender: "Female",
        contactNumber: "09345678901",
        address: "789 Mabini St., Calumpang",
        lastVisit: "2023-06-05",
        status: "Pregnant",
        medicalConditions: "Pregnancy - 2nd Trimester",
        avatar: "elena",
    },
    {
        id: "P12348",
        name: "Pedro Penduko",
        age: 60,
        gender: "Male",
        contactNumber: "09456789012",
        address: "101 Aguinaldo St., Calumpang",
        lastVisit: "2023-04-15",
        status: "Inactive",
        medicalConditions: "Arthritis, Hypertension",
        avatar: "pedro",
    },
    {
        id: "P12349",
        name: "Lorna Diaz",
        age: 35,
        gender: "Female",
        contactNumber: "09567890123",
        address: "202 Luna St., Calumpang",
        lastVisit: "2023-06-12",
        status: "Active",
        medicalConditions: "None",
        avatar: "lorna",
    },
];

export default function Patients({ patients_ }) {
    const [patients, setPatients] = useState(patients_);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });

    // // Filter patients based on search term and status
    // const filteredPatients = patients.filter((patient) => {
    //     const matchesSearch =
    //         patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         patient.medicalConditions
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase());

    //     const matchesStatus =
    //         statusFilter === "all" || patient.status === statusFilter;

    //     return matchesSearch && matchesStatus;
    // });

    // // Sort patients
    // const sortedPatients = [...filteredPatients].sort((a, b) => {
    //     if (a[sortConfig.key] < b[sortConfig.key]) {
    //         return sortConfig.direction === "ascending" ? -1 : 1;
    //     }
    //     if (a[sortConfig.key] > b[sortConfig.key]) {
    //         return sortConfig.direction === "ascending" ? 1 : -1;
    //     }
    //     return 0;
    // });

    // // Request sort
    // const requestSort = (key) => {
    //     let direction = "ascending";
    //     if (sortConfig.key === key && sortConfig.direction === "ascending") {
    //         direction = "descending";
    //     }
    //     setSortConfig({ key, direction });
    // };

    // Get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-500">Active</Badge>;
            case "Inactive":
                return <Badge className="bg-gray-500">Inactive</Badge>;
            case "Pregnant":
                return <Badge className="bg-blue-500">Pregnant</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <AdminLayout header="Patients">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            All Patients
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
                                    <SelectItem value="Pregnant">
                                        Pregnant
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <SortableTable
                            data={patients}
                            defaultSort={{
                                key: "user.firstname",
                                direction: "asc",
                            }}
                        >
                            {({ sortedData }) => (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {/* <SortableTableHead
                                                sortKey="id"
                                                sortable
                                            >
                                                ID
                                            </SortableTableHead> */}
                                            <SortableTableHead
                                                sortKey="user.firstname"
                                                sortable
                                            >
                                                Patient
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="user.birth"
                                                sortable
                                            >
                                                Birth
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="user.gender"
                                                sortable
                                            >
                                                Gender
                                            </SortableTableHead>
                                            <SortableTableHead
                                                sortKey="user.contactno"
                                                sortable
                                            >
                                                Contact Information
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Last Visit
                                            </SortableTableHead>

                                            <SortableTableHead>
                                                Medical Conditions
                                            </SortableTableHead>
                                            <SortableTableHead>
                                                Action
                                            </SortableTableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedData.map((p, i) => (
                                            <TableRow>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=metformin`}
                                                                alt={
                                                                    p.firstname
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {`${p.firstname} ${p.lastname}`
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
                                                                {p.firstname}{" "}
                                                                {p.lastname}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                P - {p.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {p.birth ?? "Not Set"}
                                                </TableCell>
                                                <TableCell>
                                                    {p.gender}
                                                </TableCell>
                                                <TableCell>09123</TableCell>
                                                <TableCell>2023-5-3</TableCell>
                                                <TableCell>Arthritis</TableCell>
                                                {/* <TableCell>
                                                    {getStatusBadge(d.status)}
                                                </TableCell> */}
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        ))}

                                        {/* {sortedData.map((d) => (
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
                                                    {getStatusBadge(d.status)}
                                                </TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        ))} */}
                                    </TableBody>
                                </Table>
                            )}
                        </SortableTable>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}

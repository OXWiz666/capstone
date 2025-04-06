import AdminLayout from "@/Layouts/AdminLayout";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/tempo/components/ui/avatar";
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

// Mock data for appointments
const mockAppointments = [
  {
    id: "AP001",
    patientName: "Maria Santos",
    patientId: "P12345",
    date: "2023-06-15",
    time: "09:00 AM",
    doctor: "Dr. Reyes",
    purpose: "General Checkup",
    status: "Completed",
    avatar: "maria",
  },
  {
    id: "AP002",
    patientName: "Juan Cruz",
    patientId: "P12346",
    date: "2023-06-15",
    time: "10:30 AM",
    doctor: "Dr. Santos",
    purpose: "Vaccination",
    status: "Completed",
    avatar: "juan",
  },
  {
    id: "AP003",
    patientName: "Elena Magtanggol",
    patientId: "P12347",
    date: "2023-06-15",
    time: "01:00 PM",
    doctor: "Dr. Reyes",
    purpose: "Prenatal Checkup",
    status: "Cancelled",
    avatar: "elena",
  },
  {
    id: "AP004",
    patientName: "Pedro Penduko",
    patientId: "P12348",
    date: "2023-06-16",
    time: "11:00 AM",
    doctor: "Dr. Santos",
    purpose: "Blood Test",
    status: "Scheduled",
    avatar: "pedro",
  },
  {
    id: "AP005",
    patientName: "Lorna Diaz",
    patientId: "P12349",
    date: "2023-06-16",
    time: "02:30 PM",
    doctor: "Dr. Reyes",
    purpose: "Follow-up",
    status: "Scheduled",
    avatar: "lorna",
  },
];

export default function appointments({}){


    const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort appointments
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
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
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };


    return (
        <AdminLayout
        header="Appointments">
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
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                        onClick={() => requestSort("patientName")}
                      >
                        <div className="flex items-center">
                          Patient
                          {sortConfig.key === "patientName" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? (
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
                              {sortConfig.direction === "ascending" ? (
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
                      <TableHead className="text-right">Actions</TableHead>
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
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.avatar}`}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>
                                  {appointment.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {appointment.patientName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {appointment.patientId}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.time}
                            </div>
                          </TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.purpose}</TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
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
                </Table>
              </div>
            </div>
          </motion.div>
        </AdminLayout>
    )
}

import React, { useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/tempo/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tempo/components/ui/tabs";
import { BarChart3, PieChart, LineChart, Filter } from "lucide-react";
import { Button } from "@/components/tempo/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";
import AdminLayout from "@/Layouts/AdminLayout";
const Reports = () => {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(0, 0, 0)",
                stack: "combined",
                type: "bar",
            },
            {
                label: "Dataset 2",
                data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgb(255, 99, 132)",
                stack: "combined",
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Chart.js Stacked Line/Bar Chart",
                },
            },
            scales: {
                y: {
                    stacked: true,
                },
            },
        },
    };

    const MyChartComponent = ({ data }) => {
        const chartRef = useRef(null);
        const chartInstance = useRef(null); // Separate ref for chart instance
        useEffect(() => {
            if (!chartRef.current) return;

            const ctx = chartRef.current.getContext("2d");

            // Destroy previous chart if exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Create new chart
            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data?.labels || [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                    ],
                    datasets: [
                        {
                            label: "# of Patients",
                            data: data?.values || [12, 19, 3, 5, 2, 3],
                            borderWidth: 1,
                            backgroundColor: "rgba(54, 162, 235, 0.5)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } },
                },
            });

            // Cleanup function
            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                    chartInstance.current = null;
                }
            };
        }, [data]); // Rebuild chart when data changes
        return <canvas ref={chartRef} />;
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-background min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Reports & Analytics
                        </h1>
                        <p className="text-muted-foreground">
                            View and analyze data across the health unit
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </Button>
                        <Select defaultValue="thisMonth">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="thisWeek">
                                    This Week
                                </SelectItem>
                                <SelectItem value="thisMonth">
                                    This Month
                                </SelectItem>
                                <SelectItem value="lastMonth">
                                    Last Month
                                </SelectItem>
                                <SelectItem value="thisYear">
                                    This Year
                                </SelectItem>
                                <SelectItem value="custom">
                                    Custom Range
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="patients">Patients</TabsTrigger>
                        <TabsTrigger value="appointments">
                            Appointments
                        </TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                        <TabsTrigger value="programs">
                            Health Programs
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Patient Registrations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MyChartComponent data={data} />

                                    {/* <div className="h-[200px] flex items-center justify-center bg-accent/30 rounded-md">
                                        <div className="flex flex-col items-center text-center">
                                            <BarChart3 className="h-10 w-10 text-primary mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                Chart visualization will appear
                                                here
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-2xl font-bold">
                                                128
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                New patients this month
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-green-600">
                                                +12%
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                vs last month
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Appointment Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] flex items-center justify-center bg-accent/30 rounded-md">
                                        <div className="flex flex-col items-center text-center">
                                            <PieChart className="h-10 w-10 text-primary mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                Chart visualization will appear
                                                here
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            <span className="text-xs">
                                                Check-up (45%)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                            <span className="text-xs">
                                                Vaccination (25%)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                            <span className="text-xs">
                                                Consultation (20%)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <span className="text-xs">
                                                Follow-up (10%)
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Monthly Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] flex items-center justify-center bg-accent/30 rounded-md">
                                        <div className="flex flex-col items-center text-center">
                                            <LineChart className="h-10 w-10 text-primary mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                Chart visualization will appear
                                                here
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs">
                                                Appointments
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-medium">
                                                    324
                                                </span>
                                                <span className="text-xs text-green-600">
                                                    +8%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs">
                                                Inventory Usage
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-medium">
                                                    156 items
                                                </span>
                                                <span className="text-xs text-red-600">
                                                    -3%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs">
                                                Program Enrollments
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-medium">
                                                    87
                                                </span>
                                                <span className="text-xs text-green-600">
                                                    +15%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Quarterly Performance Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-accent/30 rounded-md">
                                    <div className="flex flex-col items-center text-center">
                                        <BarChart3 className="h-12 w-12 text-primary mb-2" />
                                        <p className="text-muted-foreground">
                                            Detailed chart visualization will
                                            appear here
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="patients" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center bg-accent/30 rounded-md">
                                    <p className="text-muted-foreground">
                                        Patient analytics will be displayed here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appointments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appointment Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center bg-accent/30 rounded-md">
                                    <p className="text-muted-foreground">
                                        Appointment analytics will be displayed
                                        here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="inventory" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center bg-accent/30 rounded-md">
                                    <p className="text-muted-foreground">
                                        Inventory analytics will be displayed
                                        here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="programs" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Health Program Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center bg-accent/30 rounded-md">
                                    <p className="text-muted-foreground">
                                        Health program analytics will be
                                        displayed here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
};

export default Reports;

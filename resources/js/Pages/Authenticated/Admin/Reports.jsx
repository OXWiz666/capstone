import React, { useEffect, useRef, useState } from "react";
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
import { BarChart3, PieChart, LineChart, Filter, Download, Calendar, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/tempo/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import axios from "axios";

const Reports = () => {
    const { patientData } = usePage().props;
    const [timeframe, setTimeframe] = useState("thisMonth");
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Process data from the backend based on selected timeframe
    useEffect(() => {
        setIsLoading(true);
        
        // Process data based on selected timeframe
        const processData = () => {
            let labels = [];
            let registrations = [];
            let trend = [];
            let stats = { total: 0, average: 0, growth: 0 };
            
            if (!patientData) {
                return { labels: [], registrations: [], trend: [], stats };
            }
            
            switch(timeframe) {
                case "today":
                    // Daily data (by hours)
                    labels = Array.from({length: 12}, (_, i) => `${i*2}:00`);
                    registrations = patientData.daily || Array(12).fill(0);
                    // Create a smooth trend line
                    trend = registrations.map((val, i, arr) => {
                        const prevVal = i > 0 ? arr[i-1] : 0;
                        const nextVal = i < arr.length - 1 ? arr[i+1] : val;
                        return (prevVal + val + nextVal) / 3;
                    });
                    
                    // Calculate stats
                    stats.total = registrations.reduce((sum, val) => sum + val, 0);
                    stats.average = stats.total > 0 ? (stats.total / 24).toFixed(1) : 0;
                    stats.growth = patientData.stats?.growth || 0;
                    break;
                    
                case "thisWeek":
                    // Weekly data (by days)
                    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                    registrations = patientData.weekly || Array(7).fill(0);
                    // Create a smooth trend line
                    trend = registrations.map((val, i, arr) => {
                        const prevVal = i > 0 ? arr[i-1] : 0;
                        const nextVal = i < arr.length - 1 ? arr[i+1] : val;
                        return (prevVal + val + nextVal) / 3;
                    });
                    
                    // Calculate stats
                    stats.total = registrations.reduce((sum, val) => sum + val, 0);
                    stats.average = stats.total > 0 ? (stats.total / 7).toFixed(1) : 0;
                    stats.growth = patientData.stats?.growth || 0;
                    break;
                    
                case "thisMonth":
                    // Monthly data (by weeks)
                    labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
                    registrations = patientData.monthly || Array(5).fill(0);
                    // Create a smooth trend line
                    trend = registrations.map((val, i, arr) => {
                        const prevVal = i > 0 ? arr[i-1] : 0;
                        const nextVal = i < arr.length - 1 ? arr[i+1] : val;
                        return (prevVal + val + nextVal) / 3;
                    });
                    
                    // Calculate stats
                    stats.total = patientData.stats?.recent || 0;
                    stats.average = stats.total > 0 ? (stats.total / 30).toFixed(1) : 0;
                    stats.growth = patientData.stats?.growth || 0;
                    break;
                    
                case "lastMonth":
                    // Last month data - we don't have this from backend, so approximate
                    labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
                    // Estimate based on growth rate
                    const growthFactor = 1 - (patientData.stats?.growth || 0) / 100;
                    const lastMonthTotal = Math.max(0, Math.round((patientData.stats?.recent || 0) * growthFactor));
                    // Distribute evenly across weeks
                    registrations = Array(4).fill(Math.round(lastMonthTotal / 4));
                    // Create a smooth trend line
                    trend = registrations.map((val, i, arr) => {
                        const prevVal = i > 0 ? arr[i-1] : 0;
                        const nextVal = i < arr.length - 1 ? arr[i+1] : val;
                        return (prevVal + val + nextVal) / 3;
                    });
                    
                    // Calculate stats
                    stats.total = lastMonthTotal;
                    stats.average = stats.total > 0 ? (stats.total / 30).toFixed(1) : 0;
                    stats.growth = -1 * (patientData.stats?.growth || 0); // Inverse of current growth
                    break;
                    
                case "thisYear":
                default:
                    // Yearly data (by months)
                    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    registrations = patientData.yearly || Array(12).fill(0);
                    // Create a smooth trend line
                    trend = registrations.map((val, i, arr) => {
                        const prevVal = i > 0 ? arr[i-1] : 0;
                        const nextVal = i < arr.length - 1 ? arr[i+1] : val;
                        return (prevVal + val + nextVal) / 3;
                    });
                    
                    // Calculate stats
                    stats.total = patientData.stats?.total || 0;
                    stats.average = stats.total > 0 ? (stats.total / 12).toFixed(1) : 0;
                    stats.growth = patientData.stats?.growth || 0;
                    break;
            }
            
            return {
                labels,
                registrations,
                trend,
                stats
            };
        };
        
        // Small delay to show loading state
        setTimeout(() => {
            setChartData(processData());
            setIsLoading(false);
        }, 300);
    }, [timeframe, patientData]);

    const handleTimeframeChange = (value) => {
        setTimeframe(value);
    };

    const exportReport = () => {
        // In a real app, this would generate and download a PDF or CSV report
        alert("Exporting patient registration report...");
        // Implementation would connect to backend to generate report
    };

    // Custom SVG-based chart component
    const SimpleBarChart = ({ data }) => {
        if (!data || !data.labels || !data.registrations) return null;
        
        const { labels, registrations, trend } = data;
        const maxValue = Math.max(...registrations, ...trend) * 1.2; // Add 20% padding
        const chartHeight = 200;
        const chartWidth = "100%";
        const barWidth = `${90 / labels.length}%`;
        const barGap = `${10 / labels.length}%`;
        
        return (
            <div className="h-[250px] w-full">
                <div className="w-full h-full flex flex-col">
                    {/* Chart area */}
                    <div className="flex-1 relative">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                            <span>{maxValue.toFixed(0)}</span>
                            <span>{(maxValue/2).toFixed(0)}</span>
                            <span>0</span>
                        </div>
                        
                        {/* Chart content */}
                        <div className="absolute left-8 right-0 top-0 bottom-0">
                            {/* Horizontal grid lines */}
                            <div className="absolute w-full h-full flex flex-col justify-between">
                                <div className="border-t border-gray-200 w-full"></div>
                                <div className="border-t border-gray-200 w-full"></div>
                                <div className="border-t border-gray-200 w-full"></div>
                            </div>
                            
                            {/* Bars */}
                            <div className="absolute w-full h-full flex items-end">
                                {registrations.map((value, index) => (
                                    <div 
                                        key={`bar-${index}`} 
                                        className="h-full flex flex-col justify-end items-center"
                                        style={{ width: barWidth, marginLeft: index > 0 ? barGap : 0 }}
                                    >
                                        <div 
                                            className="w-full bg-blue-500 rounded-t-sm"
                                            style={{ 
                                                height: `${(value / maxValue) * 100}%`,
                                                transition: 'height 0.3s ease-in-out'
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Trend line - simplified version */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                <polyline
                                    points={trend.map((value, index) => 
                                        `${(index / (trend.length - 1)) * 100}% ${100 - (value / maxValue) * 100}%`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {trend.map((value, index) => (
                                    <circle
                                        key={`point-${index}`}
                                        cx={`${(index / (trend.length - 1)) * 100}%`}
                                        cy={`${100 - (value / maxValue) * 100}%`}
                                        r="3"
                                        fill="#ef4444"
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="h-6 flex items-center text-xs text-gray-500 pl-8">
                        {labels.map((label, index) => (
                            <div 
                                key={`label-${index}`} 
                                className="text-center overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{ width: barWidth, marginLeft: index > 0 ? barGap : 0 }}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="h-6 flex items-center justify-center gap-4 text-xs">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                            <span>New Registrations</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                            <span>Trend</span>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                        <Select value={timeframe} onValueChange={handleTimeframeChange}>
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
                        <TabsTrigger value="programs">
                            Health Programs
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card className="overflow-hidden">
                                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                                    <div>
                                        <CardTitle className="text-sm font-medium">
                                            Patient Registrations
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {timeframe === "today" ? "Today's registrations" : 
                                             timeframe === "thisWeek" ? "This week's new patients" :
                                             timeframe === "thisMonth" ? "This month's new patients" :
                                             timeframe === "lastMonth" ? "Last month's new patients" :
                                             "Yearly patient registrations"}
                                        </p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={exportReport}
                                        title="Export report"
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <div className="h-[250px] flex items-center justify-center">
                                            <div className="flex flex-col items-center">
                                                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-sm text-muted-foreground mt-2">Loading data...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <SimpleBarChart data={chartData} />
                                            
                                            <div className="mt-4 grid grid-cols-3 gap-2">
                                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Total</p>
                                                        <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded">
                                                            <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                    </div>
                                                    <p className="text-2xl font-bold mt-1">{chartData?.stats.total || 0}</p>
                                                    <p className="text-xs text-muted-foreground">New registrations</p>
                                                </div>
                                                
                                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-medium text-green-600 dark:text-green-400">Average</p>
                                                        <div className="bg-green-100 dark:bg-green-800 p-1 rounded">
                                                            <Calendar className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <p className="text-2xl font-bold mt-1">{chartData?.stats.average || 0}</p>
                                                    <p className="text-xs text-muted-foreground">Per day</p>
                                                </div>
                                                
                                                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-medium text-red-600 dark:text-red-400">Growth</p>
                                                        <div className="bg-red-100 dark:bg-red-800 p-1 rounded">
                                                            <TrendingUp className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                                                        </div>
                                                    </div>
                                                    <p className="text-2xl font-bold mt-1">{chartData?.stats.growth || 0}%</p>
                                                    <p className="text-xs text-muted-foreground">Period growth</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
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

import React, { useEffect, useState } from "react";
import { Button } from "@/components/tempo/components/ui/button";
import { Input } from "@/components/tempo/components/ui/input";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";
import { Label } from "@/components/tempo/components/ui/label";
import { Textarea } from "@/components/tempo/components/ui/textarea";
import { Calendar } from "@/components/tempo/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/tempo/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/tempo/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/components/tempo/lib/utils"; //
// At the top with other imports
import { addDays } from "date-fns";
import { usePage, useForm } from "@inertiajs/react";
import CustomCalendar from "@/components/CustomCalendar";

const AppointmentForm = ({
    onSubmit = () => {},
    formData,
    setFormData,
    errors,
    processing,
    services = [],
}) => {
    const user = usePage().props.auth.user;

    useEffect(() => {
        if (user && !formData.firstname) {
            setFormData({
                ...formData,
                firstname: user.firstname,
                middlename: user.middlename ?? "",
                lastname: user.lastname,
                email: user.email,
                phone: user.contactno ?? "",
                servicename: "",
                service: "",
                gender: user.gender,
                birth: user.birth,
            });
        }
    }, [user]);

    // Create a service lookup object
    const serviceLookup = services.reduce((acc, service) => {
        acc[service.id] = service;
        return acc;
    }, {});
    const [date, setDate] = useState(new Date());

    // Separate handler for date changes
    const handleDateChange = (date) => {
        //setDate(date);
        setFormData((prev) => ({ ...prev, date }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for phone number
        if (name === "phone") {
            // Allow only numbers and + character
            const cleanedValue = value.replace(/[^0-9+]/g, "");
            setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const timeSlots = [
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
    ];

    // const services = [
    //     "General Consultation",
    //     "Vaccination",
    //     "Prenatal Check-up",
    //     "Child Health Check-up",
    //     "Blood Pressure Monitoring",
    //     "Family Planning",
    //     "Dental Services",
    //   ];

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
        >
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="name">First Name</Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            placeholder="Your First Name"
                            disabled={true}
                            required
                        />
                        <InputError message={errors.firstname} />
                    </div>
                    <div>
                        <Label htmlFor="middlename">Middle Name</Label>
                        <Input
                            id="middlename"
                            name="middlename"
                            value={formData.middlename}
                            placeholder="Your Middle Name"
                            disabled={true}
                            required
                        />
                        <InputError message={errors.middlename} />
                    </div>
                    <div>
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            placeholder="Your Last Name"
                            disabled={true}
                            required
                        />
                        <InputError message={errors.lastname} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            placeholder="juan@example.com"
                            disabled={true}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+63 912 345 6789"
                            required
                        />
                        <InputError message={errors.phone} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Appointment Date</Label>
                        {/* <CustomCalendar
                            selectedDate={formData.date}
                            onDateSelect={handleDateChange}
                        /> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.date &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? (
                                        format(formData.date, "PPP")
                                    ) : (
                                        <span>Select date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={handleDateChange}
                                    initialFocus
                                    disabled={(date) => {
                                        // Disable past dates and weekends
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const day = date.getDay();
                                        return date < today || day === 0; // 0 is Sunday
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.date} />
                    </div>

                    <div>
                        <Label>Appointment Time</Label>
                        <Select
                            value={formData.time}
                            onValueChange={(value) =>
                                handleSelectChange("time", value)
                            }
                            required
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select time">
                                    {formData.time ? (
                                        <div className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4" />
                                            {formData.time}
                                        </div>
                                    ) : (
                                        "Select time"
                                    )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.time} />
                    </div>
                </div>

                <div>
                    <Label>Service Type</Label>
                    <Select
                        value={formData.service?.toString()} // Ensure string value
                        onValueChange={(selectedId) => {
                            const service = serviceLookup[selectedId];
                            if (service) {
                                handleSelectChange("service", service.id);
                                handleSelectChange(
                                    "servicename",
                                    service.servicename
                                );
                                //  handleSelectChange("customAttr", service.customAttribute);
                            } // handleSelectChange("servicename", selectedService?.servicename || "");
                        }}
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select service">
                                {formData.service
                                    ? services.find(
                                          (s) =>
                                              s.id.toString() ===
                                              formData.service.toString()
                                      )?.servicename
                                    : "Select service"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {services.map((service) => (
                                <SelectItem
                                    key={service.id} // Use service.id as key
                                    value={service.id} // Ensure string value
                                >
                                    {service.servicename}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.service} />
                </div>

                {/* <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Please provide any additional information about your appointment request"
                        className="min-h-[100px]"
                    />
                    <InputError message={errors.notes} />
                </div> */}
            </div>

            {usePage().props.auth.user ? (
                <Button disabled={processing} type="submit" className="w-full">
                    Schedule Appointment
                </Button>
            ) : (
                <div>Please login first to submit.</div>
            )}
        </form>
    );
};

export default AppointmentForm;

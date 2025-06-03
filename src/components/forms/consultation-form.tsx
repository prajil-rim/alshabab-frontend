"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { consultationSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ArrowRightUp from "../icons/arrow-right-up";
import { DestinationListProps, PackageListProps } from "@/types";
import { submitConsultationForm } from "@/data/loaders";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ConsultationForm = ({
    packages,
    destinations,
}: {
    packages: PackageListProps[];
    destinations: DestinationListProps[];
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedPackages, setSelectedPackages] = useState<
        PackageListProps[]
    >([]);

    const path = usePathname();
    const form = useForm<z.infer<typeof consultationSchema>>({
        resolver: zodResolver(consultationSchema),
        defaultValues: {
            fullname: "",
            phone: "",
            date: "",
            package: "",
            destination: "",
        },
    });

    async function onSubmit(values: z.infer<typeof consultationSchema>) {
        try {
            setLoading(true);
            const response = await submitConsultationForm({
                ...values,
                origin: path,
            });
            if (response.data) {
                toast.success("Message sent successfully!");
                form.reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="font-manrope bg-[#F5F5F5] w-sm mx-auto rounded-xl shadow-[20px_20px_0px_0px_rgba(0,0,0,0.13)] p-6 space-y-5 h-fit"
            >
                <h1 className="capitalize font-semibold text-xl">
                    Get free consultation now!
                </h1>
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Name"
                                        className="py-5 rounded-lg border-2 border-[#8D9CC380] bg-white text-[#8D9CC3] placeholder:text-[#8D9CC3] font-medium"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your number"
                                        className="py-5 rounded-lg border-2 border-[#8D9CC380] bg-white text-[#8D9CC3] placeholder:text-[#8D9CC3] font-medium"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 py-5 text-left font-medium text-[#8D9CC3] border-2 border-[#8D9CC380] rounded-lg",
                                                !field.value && "text-[#8D9CC3]"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Choose your date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value as unknown as Date
                                        }
                                        onSelect={(date: Date | undefined) =>
                                            field.onChange(
                                                format(
                                                    date || new Date(),
                                                    "yyyy-MM-dd"
                                                )
                                            )
                                        }
                                        initialFocus
                                        className="font-manrope text-[#8D9CC3]"
                                        classNames={{
                                            day_selected:
                                                "bg-secondary text-white hover:bg-secondary hover:text-white",
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-1">
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setSelectedPackages(
                                            packages.filter(
                                                (package_) =>
                                                    package_.destination
                                                        .documentId === value
                                            )
                                        );
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full py-5 border-2 border-[#8D9CC380] rounded-lg bg-white text-[#8D9CC3] font-medium data-[placeholder]:text-[#8D9CC3]"
                                            style={{
                                                marginBottom: "0 !important",
                                            }}
                                        >
                                            <SelectValue placeholder="Select a destination" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="font-manrope">
                                        {destinations?.map((destination) => (
                                            <SelectItem
                                                value={destination.documentId}
                                                key={destination.documentId}
                                            >
                                                {destination.destination}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-1">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full py-5 border-2 border-[#8D9CC380] rounded-lg bg-white text-[#8D9CC3] font-medium data-[placeholder]:text-[#8D9CC3]"
                                            style={{
                                                marginBottom: "0 !important",
                                            }}
                                        >
                                            <SelectValue placeholder="Select a package" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="font-manrope">
                                        {selectedPackages?.map((package_) => (
                                            <SelectItem
                                                value={package_.documentId}
                                                key={package_.documentId}
                                            >
                                                {package_.package}
                                            </SelectItem>
                                        ))}
                                        {selectedPackages?.length === 0 && (
                                            <SelectItem
                                                value="disabled"
                                                disabled
                                            >
                                                Select a destination first!
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button
                    variant={"secondary"}
                    className="rounded-lg w-full cursor-pointer text-lg"
                    size={"lg"}
                    disabled={loading}
                >
                    Contact Now <ArrowRightUp color="blue" />
                </Button>
            </form>
        </Form>
    );
};

export default ConsultationForm;

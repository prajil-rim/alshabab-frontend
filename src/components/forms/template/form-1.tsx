import ArrowRightUp from "@/components/icons/arrow-right-up";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactUsSchema } from "@/lib/zod";
import { DestinationListProps, PackageListProps } from "@/types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface Form1Props {
    form: UseFormReturn<z.infer<typeof contactUsSchema>>;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    onSubmit: (values: z.infer<typeof contactUsSchema>) => Promise<void>;
    loading: boolean;
}

const Form1 = ({
    form,
    destinations,
    packages,
    onSubmit,
    loading,
}: Readonly<Form1Props>) => {
    const [selectedPackages, setSelectedPackages] = useState<
        PackageListProps[]
    >([]);
    const path = usePathname();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="font-manrope border shadow-xl rounded-xl p-4 lg:p-7 space-y-5 bg-white"
            >
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Full Name*</FormLabel>
                            <div className="space-y-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter full name"
                                        className="py-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="grid lg:grid-cols-2 gap-x-3 gap-y-3 lg:gap-y-0">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-3.5">
                                <FormLabel>Email Address*</FormLabel>
                                <div className="space-y-1">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter email address"
                                            className="py-5"
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
                            <FormItem className="space-y-3.5">
                                <FormLabel>Phone Number*</FormLabel>
                                <div className="space-y-1">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter phone number"
                                            className="py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid lg:grid-cols-2 gap-x-3 gap-y-3 lg:gap-y-0">
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem className="space-y-3.5">
                                <FormLabel>Destination</FormLabel>
                                <div className="space-y-1">
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setSelectedPackages(
                                                packages.filter(
                                                    (package_) =>
                                                        package_.destination
                                                            .documentId ===
                                                        value
                                                )
                                            );
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className="w-full py-5"
                                                style={{
                                                    marginBottom:
                                                        "0 !important",
                                                }}
                                            >
                                                <SelectValue placeholder="Select a destination" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="font-manrope">
                                            {destinations?.map(
                                                (destination) => (
                                                    <SelectItem
                                                        value={
                                                            destination.documentId
                                                        }
                                                        key={
                                                            destination.documentId
                                                        }
                                                    >
                                                        {
                                                            destination.destination
                                                        }
                                                    </SelectItem>
                                                )
                                            )}
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
                            <FormItem className="space-y-3.5">
                                <FormLabel>Package</FormLabel>
                                <div className="space-y-1">
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className="w-full py-5"
                                                style={{
                                                    marginBottom:
                                                        "0 !important",
                                                }}
                                            >
                                                <SelectValue placeholder="Select a package" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="font-manrope">
                                            {selectedPackages?.map(
                                                (package_) => (
                                                    <SelectItem
                                                        value={
                                                            package_.documentId
                                                        }
                                                        key={
                                                            package_.documentId
                                                        }
                                                    >
                                                        {package_.package}
                                                    </SelectItem>
                                                )
                                            )}
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
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Message</FormLabel>
                            <div className="space-y-1">
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter your message"
                                        rows={12}
                                        {...field}
                                        className="resize-none !h-[140px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={loading}
                    className={cn(
                        "w-full py-5 rounded-md font-semibold cursor-pointer"
                    )}
                    variant={path === "/" ? "secondary" : "default"}
                >
                    Get Free Consultation{" "}
                    <ArrowRightUp color={path === "/" ? "blue" : "white"} />
                </Button>
            </form>
        </Form>
    );
};

export default Form1;

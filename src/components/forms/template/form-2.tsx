import { StrapiImage } from "@/components/common/strapi-image";
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
import { contactUsSchema } from "@/lib/zod";
import { DestinationListProps, PackageListProps } from "@/types";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FormProps {
    form: UseFormReturn<z.infer<typeof contactUsSchema>>;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    onSubmit: (values: z.infer<typeof contactUsSchema>) => Promise<void>;
    loading: boolean;
}

const Form2 = ({
    form,
    destinations,
    packages,
    onSubmit,
    loading,
}: Readonly<FormProps>) => {
    const [selectedPackages, setSelectedPackages] = useState<
        PackageListProps[]
    >([]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="font-manrope border shadow-xl rounded-xl p-7 space-y-3.5 bg-white w-1/2 max-h-[calc(100%-1rem)] overflow-y-scroll scrollbar-none"
            >
                <StrapiImage
                    src="http://localhost:3000/images/logo/form_logo.webp"
                    width={100}
                    height={100}
                    alt="Footer logo"
                    className="mx-auto"
                />
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-x-3">
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-3">
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
                                                className="w-full"
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
                                                className="w-full"
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
                                        className="resize-none !h-[100px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full py-5 rounded-md font-semibold cursor-pointer"
                    variant={"secondary"}
                    disabled={loading}
                >
                    Get Expert Consultation <ArrowRightUp color="blue" />
                </Button>
            </form>
        </Form>
    );
};

export default Form2;

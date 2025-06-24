"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { packageConsultationSchema } from "@/lib/zod";
import { submitPackageConsultationForm } from "@/data/loaders";
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
import { PackageListProps } from "@/types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const PackageConsultationForm = ({
    packages,
}: {
    packages: PackageListProps[];
}) => {
    const [loading, setLoading] = useState(false);

    const path = usePathname();
    const form = useForm<z.infer<typeof packageConsultationSchema>>({
        resolver: zodResolver(packageConsultationSchema),
        defaultValues: {
            fullname: "",
            phone: "",
            date: "",
            package: "",
        },
    });

    async function onSubmit(values: z.infer<typeof packageConsultationSchema>) {
        try {
            setLoading(true);
            const response = await submitPackageConsultationForm({
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

    const t = useTranslations("form");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="font-manrope bg-[#F5F5F5] w-full max-w-sm mx-auto rounded-xl shadow-[20px_20px_0px_0px_rgba(0,0,0,0.13)] p-6 space-y-5"
            >
                <h1 className="capitalize font-semibold text-xl">
                    {t("title1")}
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
                                        placeholder={t("fullnamePlaceholder")}
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
                                        placeholder={t("phonePlaceholder")}
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
                                                <span>{t("date")}</span>
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
                                            <SelectValue
                                                placeholder={t(
                                                    "packagePlaceholder"
                                                )}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="font-manrope">
                                        {packages?.map((package_) => (
                                            <SelectItem
                                                value={package_.documentId}
                                                key={package_.documentId}
                                            >
                                                {package_.package}
                                            </SelectItem>
                                        ))}
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
                    {t("button3")} <ArrowRightUp color="blue" />
                </Button>
            </form>
        </Form>
    );
};

export default PackageConsultationForm;

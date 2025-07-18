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
import { useTranslations } from "next-intl";
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
    const t = useTranslations("form");

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
                            <FormLabel>{t("fullname")}*</FormLabel>
                            <div className="space-y-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={t("fullnamePlaceholder")}
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
                                <FormLabel>{t("email")}*</FormLabel>
                                <div className="space-y-1">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t("emailPlaceholder")}
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
                                <FormLabel>{t("phone")}*</FormLabel>
                                <div className="space-y-1">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t("phonePlaceholder")}
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
                                <FormLabel>{t("destination")}</FormLabel>
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
                                                <SelectValue
                                                    placeholder={t(
                                                        "destinationPlaceholder"
                                                    )}
                                                />
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
                                <FormLabel>{t("package")}</FormLabel>
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
                                                <SelectValue
                                                    placeholder={t(
                                                        "packagePlaceholder"
                                                    )}
                                                />
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
                                                    {t("pError")}
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
                            <FormLabel>{t("message")}</FormLabel>
                            <div className="space-y-1">
                                <FormControl>
                                    <Textarea
                                        placeholder={t("messagePlaceholder")}
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
                    {t("button1")}{" "}
                    <ArrowRightUp color={path === "/" ? "blue" : "white"} />
                </Button>
            </form>
        </Form>
    );
};

export default Form1;

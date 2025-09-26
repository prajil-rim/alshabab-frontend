"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronDownIcon, Minus, Plus } from "lucide-react";
import { usePackagePriceContext } from "@/provider/package-price-context";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export function PackageModifyModal() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="rounded-full cursor-pointer flex-2/5 md:flex-auto"
                        variant="secondary"
                    >
                        Modify
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="sr-only">
                            Package modify
                        </DialogTitle>
                    </DialogHeader>
                    <Content />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    className="rounded-full cursor-pointer flex-2/5 md:flex-auto"
                    variant="secondary"
                >
                    Modify
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="sr-only">
                        Modify package
                    </DrawerTitle>
                </DrawerHeader>
                <Content className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" className="mt-5 font-manrope">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function Content({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const { packageDetail, setPackageDetail } = usePackagePriceContext();

    return (
        <div className={cn("grid grid-cols-2 items-center gap-6", className)}>
            <div className="space-y-2 flex flex-col items-center">
                <Label className="text-xl font-manrope">Rooms</Label>
                <div className="flex items-center gap-2">
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer"
                        disabled={packageDetail.room === 1}
                        onClick={() =>
                            setPackageDetail({
                                ...packageDetail,
                                room: packageDetail.room - 1,
                            })
                        }
                    >
                        <Minus />
                    </Button>
                    <span className="font-manrope">{packageDetail.room}</span>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer"
                        onClick={() =>
                            setPackageDetail({
                                ...packageDetail,
                                room: packageDetail.room + 1,
                            })
                        }
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
            <div className="space-y-2 flex flex-col items-center">
                <Label className="text-xl font-manrope">Guests</Label>
                <div className="flex items-center gap-2">
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer"
                        disabled={packageDetail.guests === 1}
                        onClick={() =>
                            setPackageDetail({
                                ...packageDetail,
                                guests: packageDetail.guests - 1,
                            })
                        }
                    >
                        <Minus />
                    </Button>
                    <span className="font-manrope">{packageDetail.guests}</span>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer"
                        onClick={() =>
                            setPackageDetail({
                                ...packageDetail,
                                guests: packageDetail.guests + 1,
                            })
                        }
                    >
                        <Plus />
                    </Button>
                </div>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 font-manrope">
                <Label className="text-xl">Tour Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                            {packageDetail.tourDate
                                ? packageDetail.tourDate.toLocaleDateString()
                                : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={packageDetail.tourDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setPackageDetail((prev) => ({
                                    ...prev,
                                    tourDate: date,
                                }));
                                setOpen(false);
                            }}
                            className="font-manrope"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

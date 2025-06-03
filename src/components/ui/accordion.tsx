"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("border-b last:border-b-0", className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "group flex flex-1 items-center justify-between gap-4 rounded-xl py-4 px-5 text-left text-lg font-semibold transition-all outline-none hover:underline bg-[#ECF4FF]",
                    "data-[state=open]:rounded-b-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {children}

                {/* Animated icons */}
                <span className="relative w-7 h-7 shrink-0">
                    <Plus className="absolute inset-0 size-7 text-secondary transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                    <Minus className="absolute inset-0 size-7 text-secondary opacity-0 rotate-90 transition-transform duration-300 ease-in-out group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0" />
                </span>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm bg-[#ECF4FF] rounded-b-xl text-left px-5"
            {...props}
        >
            <div className={cn("pt-0 pb-4", className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

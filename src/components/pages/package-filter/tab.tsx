"use client";

import { Tabs } from "@/components/ui/tabs";
import { dir } from "i18next";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

const PackageTab = ({ children }: { children: ReactNode }) => {
    const path = useParams();
    const activeTab = (path?.category as string) || "all-packages";

    return (
        <Tabs defaultValue={activeTab} dir={dir("en")}>
            {children}
        </Tabs>
    );
};

export default PackageTab;

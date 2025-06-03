import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PackageListProps } from "@/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Packages = ({ packages }: { packages: PackageListProps[] }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="ring-0 outline-0 cursor-pointer">
                <ChevronDown size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-manrope">
                {packages?.map((package_) => (
                    <Link
                        href={
                            "/packages/" +
                            package_.slug +
                            "?id=" +
                            package_.documentId
                        }
                        key={package_.documentId}
                    >
                        <DropdownMenuItem>{package_.package}</DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Packages;

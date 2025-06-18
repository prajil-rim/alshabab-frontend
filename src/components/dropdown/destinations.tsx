import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DestinationListProps } from "@/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Destinations = ({
    destinations,
}: {
    destinations: DestinationListProps[];
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="ring-0 outline-0 cursor-pointer">
                <ChevronDown size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-manrope">
                {destinations?.map((destination) => (
                    <Link
                        href={"/destinations/" + destination.slug}
                        key={destination.documentId}
                    >
                        <DropdownMenuItem>
                            {destination.destination}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Destinations;

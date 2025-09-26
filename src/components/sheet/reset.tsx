"use client";

import { usePackageFilterContext } from "@/provider/package-filter-context";

const Reset = () => {
    const { setDefault } = usePackageFilterContext();
    return (
        <button className="underline flex ms-auto mt-3" onClick={setDefault}>
            Reset
        </button>
    );
};

export default Reset;

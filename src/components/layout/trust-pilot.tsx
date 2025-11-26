"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const TrustBox = () => {
    // Create a reference to the <div> element which will represent the TrustBox
    const ref = useRef(null);
    useEffect(() => {
        // @ts-expect-error: Ignore
        if (window.Trustpilot && ref.current) {
            // @ts-expect-error: Ignore
            window.Trustpilot.loadFromElement(ref.current, true);
        }
    }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (window.Trustpilot && ref.current) {
    //             window.Trustpilot.loadFromElement(ref.current, true);
    //             clearInterval(interval);
    //         }
    //     }, 500);
    //     return () => clearInterval(interval);
    // }, []);
    return (
        <>
            <Script
                src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                strategy="afterInteractive"
            />
            <div
                ref={ref} // We need a reference to this element to load the TrustBox in the effect.
                className="trustpilot-widget" // Renamed this to className.
                data-locale="en-US"
                data-template-id="56278e9abfbbba0bdcd568bc"
                data-businessunit-id="6914b237fb3fc94434b5b556"
                data-style-height="52px"
                data-style-width="100%"
                data-token="dc475873-ddff-44fe-a9ec-a51553797782"
            >
                <a
                    href="https://www.trustpilot.com/review/alshababtours.ae"
                    target="_blank"
                    rel="noopener"
                >
                    Trustpilot
                </a>
            </div>
        </>
    );
};
export default TrustBox;

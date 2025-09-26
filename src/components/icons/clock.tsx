const Clock = () => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 10V20L26.6667 23.3333"
                stroke="url(#paint0_linear_1903_6109)"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                stroke="url(#paint1_linear_1903_6109)"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1903_6109"
                    x1="23.3333"
                    y1="10"
                    x2="23.3333"
                    y2="23.3333"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#DA0720" />
                    <stop offset="1" stopColor="#740411" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_1903_6109"
                    x1="19.9997"
                    y1="3.33398"
                    x2="19.9997"
                    y2="36.6673"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#DA0720" />
                    <stop offset="1" stopColor="#740411" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Clock;

interface SectionLinksProps {
    sections: {
        id: string;
        title: string;
    }[];
    activeSection: string;
    scrollToSection: (id: string) => void;
}

const SectionLinks = ({
    sections,
    activeSection,
    scrollToSection,
}: Readonly<SectionLinksProps>) => {
    return (
        <ul className="space-y-7 pl-6 font-manrope">
            {sections.map((section) => (
                <li key={section.id}>
                    <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full leading-tight transition-colors overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-[15rem] ${
                            activeSection === section.id
                                ? "text-black"
                                : "text-[#625F5F] hover:text-gray-900"
                        }`}
                    >
                        {section.title}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SectionLinks;

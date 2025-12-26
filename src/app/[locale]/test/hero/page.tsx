import Image from "next/image";

const TestHeroPage = () => {
    return (
        <div className="relative before:absolute before:w-full before:h-1/2 before:bg-gradient-to-b before:from-black/50 before:to-transparent">
            <Image
                src={"/images/hero-test.webp"}
                alt="test"
                width={1000}
                height={500}
                className="w-full h-screen object-cover"
            />
        </div>
    );
};

export default TestHeroPage;

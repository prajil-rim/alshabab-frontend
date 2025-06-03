import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    return (
        <Accordion type="single" collapsible className="font-manrope">
            <AccordionItem value="item-1">
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FAQAccordion;

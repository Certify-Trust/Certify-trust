import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
interface CustomAccordionProps {
  itemValue: string;
  question: string;
  answer: React.ReactNode;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  itemValue,
  question,
  answer,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={itemValue}>
        <AccordionTrigger className="cursor-pointer text-lg font-medium text-gray-900 hover:no-underline">
          {question}{" "}
          {/* <PlusCircleIcon className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:hidden" />
          <MinusCircleIcon className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=closed]:hidden" /> */}
        </AccordionTrigger>
        <AccordionContent className="min-h-fit text-base text-gray-600">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;

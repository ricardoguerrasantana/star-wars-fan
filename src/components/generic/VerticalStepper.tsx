// React
import { useState } from 'react';

// Generic components
import { Accordion } from "../generic";

// Types
import type { AccordionTypes , AccordionItem } from "../generic";

// debugger
import Debug from "debug";
const log = Debug("App:VerticalStepper");
log.log = console.log.bind(console);

// Prop types
export type StepperItem = Omit<AccordionItem, "selectedDropdownId" | "setSelectedDropdownId">;
export type NewAccordionTypes = Omit<AccordionTypes, "accordionItems">;
export type Props = NewAccordionTypes & {
  stepperItems: StepperItem[];
  stepperStyles: {
    container: string;
  };
}

/** VerticalStepper generic component ... */
function VerticalStepper({ accordionStyles, menuStyles, stepperItems, stepperStyles }: Props) {
  log('Rendering...');
  /** This state set up control to keep open just one of 
   * the Dropdowns at a time. */
  const [selectedDropdownId , setSelectedDropdownId] = useState<string>("");

  /** Adds state control to identify which Dropdown is selected. */
  const accordionItems = stepperItems.map((item) => {
    item.dropdown.selectedDropdownId = selectedDropdownId;
    item.dropdown.setSelectedDropdownId = setSelectedDropdownId;
    return item;
  });

  return (
    <div className={stepperStyles.container}>
      <Accordion 
        accordionItems={accordionItems}
        accordionStyles={accordionStyles}
        menuStyles={menuStyles}
      />
    </div>
  );
}

export default VerticalStepper;
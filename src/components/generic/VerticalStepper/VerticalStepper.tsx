// React
import { useEffect, useState } from 'react';

// Generic components
import { Accordion } from "../../generic";
// Types
import type { AccordionTypes , AccordionItem } from "../../generic";

// Helper components
import StepButtonsWapper from  "./StepButtonsWapper";
// Types from helper components
import type { Props as StepButtonsWapperProps } from "./StepButtonsWapper";

// debugger
import Debug from "debug";
const log = Debug("App:VerticalStepper");
log.log = console.log.bind(console);

// Prop types
export type StepperItem = Omit<AccordionItem, "selectedDropdownId" | "setSelectedDropdownId">;
export type NewAccordionTypes = Omit<AccordionTypes, "accordionItems">;
export type Props = NewAccordionTypes & {
  dropdownIds: string[];
  stepperItems: StepperItem[];
  stepperStyles: {
    container: string;
    buttons: StepButtonsWapperProps["buttonStyles"];
    extended: string;
  };
  stepperButtonText: StepButtonsWapperProps["buttonText"];
}

/** VerticalStepper generic component ... */
function VerticalStepper({ accordionStyles, dropdownIds, menuStyles, stepperButtonText, stepperItems, stepperStyles }: Props) {
  log("Rendering...");
  /** This state set up control to keep open just one of 
   * the Dropdowns at a time. */
  const [selectedDropdownId , setSelectedDropdownId] = useState<string>("");
  log("selectedDropdownId", selectedDropdownId);
  
  /** Keeps track of active step */
  const [step , setStep] = useState<number>(0);
  log("step", step);

  /** Assigns the respective Dropdown id when step is changed. */
  useEffect(() => {
    dropdownIds[step] && setSelectedDropdownId(dropdownIds[step]);
  }, [step, dropdownIds]);
  
  /** Sets step to its respective Dropdown id when 
   * selectedDropdownId is changed. */
  useEffect(() => {
    if (dropdownIds.indexOf(selectedDropdownId) >= 0) {
      if (dropdownIds.indexOf(selectedDropdownId) < (dropdownIds.length - 1)) {
        setStep(dropdownIds.indexOf(selectedDropdownId));
      }
    } 
  }, [selectedDropdownId, dropdownIds]);
  
  /** Immutable transformation of stepperItems array */
  const accordionItems = stepperItems.map((item) => {
    /** Turns the body component that is going to be 
     * passed down to Dropdown into a body with stepping 
     * control buttons. */
    const bodyComponent = (
      <StepButtonsWapper 
        buttonStyles={stepperStyles.buttons}
        buttonText={stepperButtonText}
        lastStep={stepperItems.length - 1}
        setStep={setStep}
        step={step}
      >
        {item.dropdown.bodyComponent}
      </StepButtonsWapper>
    );

    return {
      dropdown: {
        bodyComponent,
        dropdownStyles: item.dropdown.dropdownStyles,
        headerComponent: item.dropdown.headerComponent,
        id: item.dropdown.id,
        /** Adds state control for identifying... */
        selectedDropdownId,
        setSelectedDropdownId,
        /** ...which Dropdown is selected. */
      },
      menuItem: item.menuItem
    }
  });
   
  return (
    <div className={stepperStyles.container}>
      <Accordion 
        accordionItems={accordionItems}
        accordionStyles={accordionStyles}
        menuStyles={menuStyles}
      />
      <div className={stepperStyles.extended}>
        {accordionItems[step] && accordionItems[step].dropdown.bodyComponent}
      </div>
    </div>
  );
}

export default VerticalStepper;
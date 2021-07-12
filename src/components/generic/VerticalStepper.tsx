// React
import { ReactNode, useEffect, useState } from 'react';

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
  dropdownIds: string[];
  stepperItems: StepperItem[];
  stepperStyles: {
    container: string;
    buttons: StepBodyProps["buttonStyles"];
  };
  stepperButtonText: StepBodyProps["buttonText"];
}

/** VerticalStepper generic component ... */
function VerticalStepper({ accordionStyles, dropdownIds, menuStyles, stepperButtonText, stepperItems, stepperStyles }: Props) {
  log('Rendering...');
  /** This state set up control to keep open just one of 
   * the Dropdowns at a time. */
  const [selectedDropdownId , setSelectedDropdownId] = useState<string>("");
  
  const accordionItems: AccordionItem[] = stepperItems.map((item, step) => {
    // Adds state control to identify which Dropdown is selected.
    item.dropdown.selectedDropdownId = selectedDropdownId;
    item.dropdown.setSelectedDropdownId = setSelectedDropdownId;
    return item;
  });
  
  /** Transforms the body component that is going to be passed 
   * down to Dropdown into a body with step control buttons. */
  useEffect(() => {
    accordionItems.forEach((item, step) => {
      item.dropdown.bodyComponent = (
        <StepBody 
          buttonStyles={stepperStyles.buttons}
          buttonText={stepperButtonText}
          lastStep={accordionItems.length - 1}
          step={step}
        >
          {item.dropdown.bodyComponent}
        </StepBody>
      );    
    });
  }, []);

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


/** StepBody component to be used by previously defined 
 * VerticalStepper component takes Dropdown Body and adds 
 * buttons for stepping control */

type StepBodyProps = {
  children: ReactNode;
  buttonText: {
    back: string;
    next: string;
    end: string;
  };
  buttonStyles: {
    back: string;
    container: string;
    next: string;
  };
  lastStep: number
  step: number
}

// eslint-disable-next-line react/no-multi-comp
function StepBody ({ children, buttonText , buttonStyles , lastStep, step }: StepBodyProps) {
  return (
    <>
      {children}
      <div className={buttonStyles.container}>
        {step !== 0 && 
          <button className={buttonStyles.back} type="button">
            {buttonText.back}
          </button>}
        <button className={buttonStyles.next} type="button">
          {step === lastStep ? buttonText.end : buttonText.next}
        </button>
      </div>
    </>
  );
}

export default VerticalStepper;
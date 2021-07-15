// React
import { useEffect, useState } from 'react';

// Generic components
import { Accordion } from "../../../components/generic";
// Types
import type { AccordionTypes , AccordionItem } from "../../../components/generic";

// Helper components
import StepBody from  "./StepBody";
// Types from helper components
import type { Props as StepBodyProps } from "./StepBody";

// debugger
import Debug from "debug";
const log = Debug("App:VerticalStepper");
log.log = console.log.bind(console);

// Prop types
export type StepperItem = Omit<AccordionItem, "selectedDropdownId" | "setSelectedDropdownId">;
export type NewAccordionTypes = Omit<AccordionTypes, "accordionItems">;
export type Props = NewAccordionTypes & {
  dropdownIds: string[];
  handleDoneClick: () => void;
  stepperItems: StepperItem[];
  stepperStyles: {
    container: string;
    views: {
      inline:string;
      extended:string;
    };
    step:StepBodyProps["styles"];
  };
  stepBodyText: StepBodyProps["text"];
  showMessage: StepBodyProps["showMessage"];
}

/** VerticalStepper generic component ... */
function VerticalStepper({ accordionStyles, dropdownIds, handleDoneClick, menuStyles, stepBodyText, stepperItems, stepperStyles, showMessage }:Props) {
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
    // if (dropdownIds.indexOf(selectedDropdownId) >= 0) {
      // if (dropdownIds.indexOf(selectedDropdownId) < (dropdownIds.length - 1)) {
        setStep(dropdownIds.indexOf(selectedDropdownId));
      // }
    // } 
  }, [selectedDropdownId, dropdownIds]);
  
  /** Immutable transformation of stepperItems array */
  const accordionItems = stepperItems.map((item) => {
    /** Turns the body component that is going to be 
     * passed down to Dropdown into a body with stepping 
     * control buttons. */
    const bodyComponent = (
      <div className={stepperStyles.views.inline}>
        <StepBody 
          handleDoneClick={handleDoneClick}
          lastStep={stepperItems.length - 1}
          setStep={setStep}
          showMessage={showMessage}
          step={step}
          styles={stepperStyles.step}
          text={stepBodyText}
        >
          {item.dropdown.bodyComponent}
        </StepBody>
      </div>
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
      <div className={stepperStyles.views.extended}>
        {accordionItems[step] && 
          <StepBody 
            handleDoneClick={handleDoneClick}
            lastStep={stepperItems.length - 1}
            setStep={setStep}
            showMessage={showMessage}
            step={step}
            styles={stepperStyles.step}
            text={stepBodyText}
          >
            {stepperItems[step].dropdown.bodyComponent}
          </StepBody>}
      </div>
    </div>
  );
}

export default VerticalStepper;
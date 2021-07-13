// React
import { memo, useState } from 'react';

// Generic components
import { VerticalStepper } from '../../generic';

// Helper components
import DropdownBody from  "./DropdownBody";

// Constants
import { STEPPER } from '../../../utils/constants';

// Hard coded data
import DATA from "../../../data/data.json"

// Styles
import styles from './Questionnarie.module.css';

// debugger
import Debug from "debug";
const log = Debug('App:QuestionnarieContainer');
log.log = console.log.bind(console);


/** Questionnarie specialized container component customize 
 * VerticalStepper generic component... */
function QuestionnarieContainer() {
  log("Rendering...");

  // Stores chosen answers by user
  const [results , setResults] = useState<string[]>(new Array(DATA.length).fill(""));
  log("results", results);
  
  // Styles for VericalStepper component
  const stepperStyles = {
    container: styles.stepperContainer,
    buttons: {
      back: styles.stepperButtonBack,
      container: styles.stepperButtonContainer,
      next: styles.stepperButtonNext,
    },
    extended: styles.stepperExtended,
  };
  
  // Styles for Accordion component
  const accordionStyles = {
    container: styles.accordionContainer,
    header: styles.accordionHeader
  };
  
  // Styles for Menu component
  const menuStyles = {
    container: styles.menuContainer
  };

  /** Styles for the helper Dropdown componet 
   * that is going to be passed down */
  const dropdownBodyStyles = {
    container: styles.dropdownBody,
    option: {
      normal: styles.dropdownBodyOption,
      selected: styles.dropdownBodySelectedOption,
      disabled: styles.dropdownBodyDisabledOption,
    }
  }

  // Text for stepper buttons inside the body of the dropdown
  const stepperButtonText = {
    back: STEPPER.BUTTONS.TEXT.BACK,
    next: STEPPER.BUTTONS.TEXT.NEXT,
    submit: STEPPER.BUTTONS.TEXT.SUBMIT,
  };
  
  const dropdownIds: string[] = [];
  
  const stepperItems = DATA.map((D, step) => {
    /** Populates dropdowns array to keep track of Dropdown 
     * components sequence. */
    dropdownIds.push(D.id);

    const headerComponent = (<h1>{STEPPER.STEPTITLE + ` ${step + 1}`}</h1>);
    const bodyComponent = (
      <DropdownBody 
        answerOptions={D.answerOptions}
        results={results}
        setResults={setResults}
        step={step}
        styles={dropdownBodyStyles}
        topic={D.topic}
        type={D.type}
      />
    );

    return {
      dropdown: {
        bodyComponent,
        dropdownStyles: {
          body: styles.dropdownBody,
          container: styles.dropdownContainer,
          header: styles.dropdownHeader
        },
        headerComponent,
        id: D.id,
      },
      menuItem: {
        class: styles.menuItem,
        id: "menuItem" + D.id,
      }
    }
  });

  return (
    <VerticalStepper 
      accordionStyles={accordionStyles}
      dropdownIds={dropdownIds}
      menuStyles={menuStyles}
      stepperButtonText={stepperButtonText}
      stepperItems={stepperItems}
      stepperStyles={stepperStyles}
    />
  );
}

export default memo(QuestionnarieContainer);

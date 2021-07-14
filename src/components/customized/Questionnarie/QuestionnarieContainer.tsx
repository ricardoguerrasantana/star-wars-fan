// React
import { memo, useState } from 'react';

// Generic components
import { VerticalStepper } from '../../generic';

// Helper components
import DropdownBody from  "./DropdownBody";

// Constants
import { STEPPER } from '../../../utils/constants';

// Styles
import styles from './Questionnarie.module.css';

// Types
import type { Results, SetResults, Data, SetDone } from "../../../components/customized";

// debugger
import Debug from "debug";
const log = Debug('App:QuestionnarieContainer');
log.log = console.log.bind(console);

// Props types
export type Props = {
  data:Data;
  results:Results;
  setDone:SetDone;
  setResults:SetResults;
}

/** Questionnarie specialized container component customize 
 * VerticalStepper generic component... */
function QuestionnarieContainer({ data, results, setDone, setResults }: Props) {
  log("Rendering...");

  /** Show a message when all questions have not 
   * been answered. All questions are mandatory. */
  const [showMessage, setShowMessage] = useState(false);

  // Styles for VericalStepper component
  const stepperStyles = {
    container: styles.stepperContainer,
    step: { 
      buttons: {
        back: styles.stepperButtonBack,
        container: styles.stepperButtonContainer,
        next: styles.stepperButtonNext,
      },
    },
    views: {
      extended: styles.extendedStep,
      inline: styles.inlineStep,
    },
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

  // Text for stepper buttons in the Dropdown's body
  const { TEXT } = STEPPER;
  const stepperButtonText = {
    back: TEXT.BUTTONS.BACK,
    next: TEXT.BUTTONS.NEXT,
    done: TEXT.BUTTONS.DONE,
  };
  
  const dropdownIds: string[] = [];
  
  const stepperItems = data.map((D, step) => {
    /** Populates dropdowns array to keep track of 
     * Dropdown components sequence. */
    dropdownIds.push(D.id);

    const headerComponent = (<h1>{TEXT.STEP_TITLE + ` ${step + 1}`}</h1>);
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

  function handleDoneClick() {
    if (results && !results.includes("")) {
      setDone(true);
    } else {
      setShowMessage(true);
    }
  }

  return (
    <>
      <VerticalStepper 
        accordionStyles={accordionStyles}
        dropdownIds={dropdownIds}
        handleDoneClick={handleDoneClick}
        menuStyles={menuStyles}
        stepperButtonText={stepperButtonText}
        stepperItems={stepperItems}
        stepperStyles={stepperStyles}
      />
      {showMessage && 
        <div className={styles.stepperWarn}>
          {TEXT.WARN}
        </div>}
    </>
  );
}

export default memo(QuestionnarieContainer);

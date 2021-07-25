// React
import { memo, useState } from 'react';

// Generic components
import { VerticalStepper } from '../../generic';

// Helper components
import DropdownBody from  "./DropdownBody";

// Constants
import { STEPPER } from '../../../utils/constants';

// Styles
import questionnarieStyles from './Questionnarie.module.css';
import menuStyles from './menu.module.css';

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
    container: questionnarieStyles.stepperContainer,
    step: { 
      buttons: {
        back: questionnarieStyles.stepperButtonBack,
        container: questionnarieStyles.stepperButtonContainer,
        next: questionnarieStyles.stepperButtonNext,
      },
      validationMessage: questionnarieStyles.validationMessage,
    },
    views: {
      extended: questionnarieStyles.extendedStep,
      inline: questionnarieStyles.inlineStep,
    },
  };
  
  // Styles for Accordion component
  const accordionStyles = {
    container: questionnarieStyles.accordionContainer,
    header: questionnarieStyles.accordionHeader,
    menu: {
      container: menuStyles.container,
    },
  };
  
  /** Styles for the helper Dropdown componet 
   * that is going to be passed down */
  const dropdownBodyStyles = {
    container: questionnarieStyles.dropdownBody,
    option: {
      normal: questionnarieStyles.dropdownBodyOption,
      selected: questionnarieStyles.dropdownBodySelectedOption,
      disabled: questionnarieStyles.dropdownBodyDisabledOption,
    }
  }

  // Text for stepper buttons in the Dropdown's body
  const { TEXT } = STEPPER;
  const stepBodyText = {
    buttons: {
      back: TEXT.BUTTONS.BACK,
      next: TEXT.BUTTONS.NEXT,
      done: TEXT.BUTTONS.DONE,
    },
    validationMessage: TEXT.VALIDATION_MESSAGE,
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
        inputPlaceholder={TEXT.INPUT.PLACEHOLDER}
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
        styles: {
          body: questionnarieStyles.dropdownBody,
          container: questionnarieStyles.dropdownContainer,
          header: results[step] === "" ? questionnarieStyles.dropdownHeader : questionnarieStyles.disabledDropdownHeader
        },
        headerComponent,
        id: D.id,
      },
      menuItem: {
        styles: menuStyles.item,
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
    <VerticalStepper 
      accordionStyles={accordionStyles}
      dropdownIds={dropdownIds}
      handleDoneClick={handleDoneClick}
      showMessage={showMessage}
      stepBodyText={stepBodyText}
      stepperItems={stepperItems}
      stepperStyles={stepperStyles}
    />
  );
}

export default memo(QuestionnarieContainer);

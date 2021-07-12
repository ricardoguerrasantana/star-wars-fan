// React
import { memo } from 'react';

// Generic components
import { VerticalStepper } from '../../generic';

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
  log('Rendering...');
  
  // Styles for VericalStepper component
  const stepperStyles = {
    container: styles.stepperContainer,
    buttons: {
      back: styles.stepperButtonBack,
      container: styles.stepperButtonContainer,
      next: styles.stepperButtonNext,
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

  // Text for stepper buttons inside the body of the dropdown
  const stepperButtonText = {
    back: STEPPER.BUTTONS.TEXT.BACK,
    next: STEPPER.BUTTONS.TEXT.NEXT,
    end: STEPPER.BUTTONS.TEXT.END,
  };
  
  const dropdownIds: string[] = [];
  
  const stepperItems = DATA.sort(() => (Math.random() > .5) ? 1 : -1).map((D) => {
    /** Populates dropdowns array to keep track of Dropdown 
     * components sequence. */
    dropdownIds.push(D.id);

    const headerComponent = (<h1>{D.topic}</h1>);
    const bodyComponent = (<p>{D.correctAnswer}</p>);

    return {
      dropdown: {
        bodyComponent,
        dropdownStyles: {
          body: styles.dropdownBody,
          container: styles.dropdownContainer,
          header: styles.dropdownHeader
        },
        headerComponent,
        id: "dropdown" + D.id,
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
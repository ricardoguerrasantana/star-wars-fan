// React
import { memo } from 'react';

// Generic components
import { VerticalStepper } from '../../generic';

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
    container: styles.stepperContainer
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
  
  const stepperItems = DATA.map((D) => {
    const header = (<h1>{D.topic}</h1>);
    const body = (<p>{D.correctAnswer}</p>);
    return {
      dropdown: {
        bodyComponent: body,
        dropdownStyles: {
          body: styles.dropdownBody,
          container: styles.dropdownContainer,
          header: styles.dropdownHeader
        },
        headerComponent: header,
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
      menuStyles={menuStyles}
      stepperItems={stepperItems}
      stepperStyles={stepperStyles}
    />
  );
}

export default memo(QuestionnarieContainer);
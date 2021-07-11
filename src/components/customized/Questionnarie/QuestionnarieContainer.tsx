/**
 * This specialized container component customize 
 * the VerticalStepper generic container component
 */

// React
import { memo } from 'react';

// Generic components
import { Accordion } from '../../generic';

// types
import type { AccordionTypes , NewMenuItem } from "../../generic";

// constants
import { DATA } from '../../../utils/constants';

// Styles
import styles from './Questionnarie.module.css';

// debugger
import Debug from "debug";
const log = Debug('App:QuestionnarieContainer');
log.log = console.log.bind(console);


function QuestionnarieContainer() {
  log('Rendering...');
  
  // Defining styles for generic Accordion component
  const accordionStyles = {
    container: styles.accordionContainer,
    header: styles.accordionHeader
  };
  
  // Defining styles for generic Menu component
  const menuStyles = {
    container: styles.menuContainer
  };


  const items = DATA.map((D) => {
    const header = (<h1>{D.ID}</h1>);
    const body = (<p>{D.QUESTION}</p>);
    return {
      dropdown: {
        bodyComponent: body,
        dropdownStyles: {
          body: styles.dropdownBody,
          container: styles.dropdownContainer,
          header: styles.dropdownHeader
        },
        headerComponent: header,
        id: D.ID,
      },
      menuItem: {
        class: styles.menuItem,
        id: "menuItem" + D.ID
      }
    }});

  return (
    <Accordion 
      accordionItems={items}
      accordionStyles={accordionStyles}
      menuStyles={menuStyles}
    />
  );
}

export default memo(QuestionnarieContainer);
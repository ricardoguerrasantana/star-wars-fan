// React
import { ReactNode, useState } from 'react';

// Generic components
import { Dropdown, Menu } from "../generic";

// Types
import type { DropdownTypes, MenuTypes , MenuItem } from "../generic";

// debugger
import Debug from "debug";
const log = Debug("App:Accordion");
log.log = console.log.bind(console);

// Prop types
export type NewMenuItem = Omit<MenuItem, "component">;
export type AccordionItem = {
  dropdown: DropdownTypes;
  menuItem:NewMenuItem;
};

export type Props = {
  accordionStyles: {
    container: string;
    header: string;
  };
  accordionItems: AccordionItem[];
  header?: ReactNode;
  menuStyles: MenuTypes["menuStyles"];
}

// Generic component accordion is composed from two generic components, Menu and Dropdown. What accordion does is to render Menu component which items are an array of Dropdown components.
function Accordion({ accordionStyles, accordionItems , header , menuStyles }: Props) {
  log('Rendering...');


  const menuItems = accordionItems.map(({dropdown , menuItem}) =>{ 
    const component = (
      <Dropdown 
        bodyComponent={dropdown.bodyComponent}
        displayedDropdown={dropdown.displayedDropdown}
        dropdownStyles={dropdown.dropdownStyles}
        headerComponent={dropdown.headerComponent}
        id={dropdown.id}
        key={dropdown.id}
        setDisplayedDropdown={dropdown.setDisplayedDropdown}
      />
    );

    return {
      class: menuItem.class,
      component,
      id: menuItem.id,
    }
  });

  return (
    <div className={accordionStyles.container} >
      <div className={accordionStyles.header}>{header}</div>
      <Menu 
        items={menuItems}
        menuStyles={menuStyles}
      />
    </div>
  );
}

export default Accordion;
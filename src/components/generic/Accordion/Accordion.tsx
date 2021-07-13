// Generic components
import { Dropdown, Menu } from "..";

// Types
import type { DropdownTypes, MenuTypes , MenuItem } from "..";

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
  menuStyles: MenuTypes["menuStyles"];
}

/** Accordion generic component is a Menu generic component which 
 * items are Dropdown generic components. Data for rendering 
 * Dropdowns comes as an array via props. */
function Accordion({ accordionStyles, accordionItems, menuStyles }: Props) {
  log('Rendering...');

  /** Array of objects that contains Dropdown components and 
   * required data by Menu to render its items. Each Menu item is 
   * a Dropdown. */
  const menuItems = accordionItems.map(({dropdown , menuItem}) =>{ 
    const component = (
      <Dropdown 
        bodyComponent={dropdown.bodyComponent}
        dropdownStyles={dropdown.dropdownStyles}
        headerComponent={dropdown.headerComponent}
        id={dropdown.id}
        key={dropdown.id}
        selectedDropdownId={dropdown.selectedDropdownId}
        setSelectedDropdownId={dropdown.setSelectedDropdownId}
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
      <Menu 
        items={menuItems}
        menuStyles={menuStyles}
      />
    </div>
  );
}

export default Accordion;
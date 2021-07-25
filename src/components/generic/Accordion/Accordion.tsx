// Generic components
import { Dropdown, Menu } from "../../../components/generic";

// Types
import type { DropdownTypes, MenuTypes , MenuItem } from "../../../components/generic";

// debugger
import Debug from "debug";
const log = Debug("App:Accordion");
log.log = console.log.bind(console);

// Prop types
export type NewMenuItem = Omit<MenuItem, "element">;

export type AccordionItem = {
  dropdown: DropdownTypes;
  menuItem: NewMenuItem;
};

export type Props = {
  accordionStyles: {
    container: string;
    header: string;
    menu: MenuTypes["styles"];
  };
  accordionItems: AccordionItem[];
}

/** Accordion generic component is a Menu generic component which 
 * items are Dropdown generic components. Data for rendering 
 * Dropdowns comes as an array via props. */
function Accordion({ accordionStyles, accordionItems }: Props) {
  log("Rendering...");

  /** Array of objects that contains Dropdown components and 
   * required data by Menu to render its items. Each Menu item is 
   * a Dropdown. */
  const menuItems = accordionItems.map(({dropdown , menuItem}) => { 
    const element = (
      <Dropdown 
        bodyComponent={dropdown.bodyComponent}
        headerComponent={dropdown.headerComponent}
        id={dropdown.id}
        key={dropdown.id}
        selectedDropdownId={dropdown.selectedDropdownId}
        setSelectedDropdownId={dropdown.setSelectedDropdownId}
        styles={dropdown.styles}
      />
    );

    return {
      styles: menuItem.styles,
      element,
      id: menuItem.id,
    }
  });

  return (
    <div className={accordionStyles.container} >
      <Menu 
        items={menuItems}
        styles={accordionStyles.menu}
      />
    </div>
  );
}

export default Accordion;
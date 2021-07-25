// React 
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:Menu");
log.log = console.log.bind(console);

// Prop types
export type MenuItem = {
  element: ReactNode;
  handleClick?: () => void;
  id: string;
  pointer?: boolean;
  styles: string;
}

export type Props = {
  styles: {
    container: string;
  };
  items: MenuItem[];
}

/** Menu generic component is a box that renders an array of 
 * boxes called Items that in turn receive custom components. 
 * These Items can be assigned handler functions from parent 
 * component. */
function Menu({ items , styles }: Props) {
  log("Rendering...");
  return (
    <div 
      className={styles.container}
      data-testid="Menu" 
    >
      {items.map((item, i) => {
        return (
          <div 
            className={item.styles}
            data-testid="item"
            key={item.id}
            onClick={item.handleClick}
            style={item.pointer ? {cursor: "pointer"} : undefined}
          >
            {item.element}
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
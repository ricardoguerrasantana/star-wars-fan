// React 
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:Menu");
log.log = console.log.bind(console);

// Prop types
export type MenuItem = {
  class: string;
  clickable?: boolean;
  component: ReactNode;
  handleClick?: () => void;
  id: string;
}

export type Props = {
  menuStyles: {
    container: string;
  };
  items: MenuItem[];
}

/** Menu generic component is a box that renders an array of boxes called Items that in turn receive custom components. These Items can be assigned handler functions from parent component. */
function Menu({ items , menuStyles }: Props) {
  log('Rendering...');
  return (
    <div className={menuStyles.container} >
      {items.map((item) => {
        return (
          <div 
            className={item.class}
            key={item.id}
            onClick={item.handleClick}
            style={item.clickable ? {cursor: "pointer"} : undefined}
          >
            {item.component}
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
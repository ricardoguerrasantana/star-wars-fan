// React
import { ReactNode, useEffect, useState } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:Dropdown");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  bodyComponent: ReactNode;
  headerComponent: ReactNode;
  id: string;
  styles: {
    body: string;
    container: string;
    header: string;
  };
  /** Set up when it is necessary to collapse 
   * the Dropdown body from outside. */
  selectedDropdownId?: string;
  setSelectedDropdownId?: (id: string) => void;
}

/**  Dropdown generic component is compound of a header and a body 
 * boxes which should receive customized components. By default 
 * the body is hidden. When clicking the header it displays the 
 * body and hide it if clicked again. This Dropdown may transfer 
 * control to hide the body if selectedDropdownId and 
 * setSelectedDropdownId props are defined from parent component 
 * as state managers. */
function Dropdown({ bodyComponent, styles, headerComponent, id, selectedDropdownId , setSelectedDropdownId }: Props) {
  log("Rendering...");

  /** Controls whether the body is displayed or not. */
  const [displayBody , setDisplayBody] = useState<boolean>(false);
  
  /** Controls whether body should be open or closed when 
   * external control has been set up. */
  useEffect(() => {
    if (selectedDropdownId) {
      setDisplayBody(selectedDropdownId === id ? true : false);
    }
  }, [selectedDropdownId, id]);

  function handleClick(): void {
    if (setSelectedDropdownId) {
      /** External control has been set up. 
       * Identifies this Dropdown in parent component. */
      setSelectedDropdownId(id);
    }
    setDisplayBody(prevDisplayBody => !prevDisplayBody);
  }

  return (
    <div 
      className={styles.container} 
      data-testid="Dropdown"
    >
      <div 
        className={styles.header}
        data-testid="Header"
        onClick={handleClick}
      >
        {headerComponent}
      </div>
      <div 
        className={styles.body}
        data-testid="Body"
        style={displayBody ? undefined : {display: "none"}} 
      >
        {bodyComponent}
      </div>
    </div>
  );
}

export default Dropdown;
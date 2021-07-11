// React
import { ReactNode, useEffect, useState } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:Dropdown");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  bodyComponent: ReactNode;
  dropdownStyles: {
    body: string;
    container: string;
    header: string;
  };
  headerComponent: ReactNode;
  id: string;
  displayedDropdown?: string;
  setDisplayedDropdown?: (id: string) => void;
}

/**  Dropdown generic component is compound of a header and a body 
 * boxes which should receive customized components. By default the 
 * body is hidden. When clicking the header it displays the body and 
 * hide it if clicked again. This Dropdown may transfer control to 
 * hide the body if displayedDropdown and setDisplayedDropdown props 
 * are defined from parent component as state managers. */
function Dropdown({ bodyComponent, dropdownStyles, headerComponent, id, displayedDropdown , setDisplayedDropdown }: Props) {
  log('Rendering...');

  // Internal state to determine whether dropdown body is displayed or not
  const [displayBody , setDisplayBody] = useState<boolean>(false);
  
  useEffect(() => {
    // Closes dropdown body if external control has been set up.
    if (displayedDropdown && displayedDropdown !== id) {
      setDisplayBody(false);
    }
  }, [displayedDropdown, id]);

  function handleClick(): void {
    if (setDisplayedDropdown) {
      /** Identifies the displayed dropdown so parent component can target it 
       * if external control has been set up. */
      setDisplayedDropdown(id);
    }
    setDisplayBody(prevDisplayBody => !prevDisplayBody);
  }

  return (
    <div className={dropdownStyles.container} >
      <div 
        className={dropdownStyles.header}
        onClick={handleClick}
      >
        {headerComponent}
      </div>
      <div 
        className={dropdownStyles.body}
        style={displayBody ? undefined : {display: "none"}} 
      >
        {bodyComponent}
      </div>
    </div>
  );
}

export default Dropdown;
// React
import { ReactNode } from "react";

// Generic components
import { Menu } from "../../generic";
// Types from generic components
import type { MenuTypes , MenuItem } from "../../generic";

// debugger
import Debug from "debug";
const log = Debug("App:CheckoutForm");
log.log = console.log.bind(console);

// Prop types
export type CheckoutItem = MenuItem;
export type Props = {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  header:ReactNode;
  items:CheckoutItem[];
  styles:{
    buttons:{
      submit:string;
    };
    container:string;
    header:string;
    inner:MenuTypes["menuStyles"];
  };
  text:{
    buttons:{
      submit:string;
    };
  };
};

function CheckoutForm({ handleSubmit, header, items, styles, text }:Props) {
  return (
    <form 
      className={styles.container}
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className={styles.header}>
        {header}
      </div>
      <Menu 
        items={items}
        menuStyles={styles.inner}
      />
      <button 
        className={styles.buttons.submit}
        type="submit" 
      >
        {text.buttons.submit}
      </button>
    </form>
  );
}

export default CheckoutForm;
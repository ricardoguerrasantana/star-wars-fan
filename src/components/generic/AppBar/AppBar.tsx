// React
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:AppBarContainer");
log.log = console.log.bind(console);

// Props type
export type Props = {
  classes: {
    container: string
  },
  items: {
    elements: ReactNode,
    key: string,
    class: string
  }[]
}

// Container component
function AppBarContainer({ items, classes }: Props) {
  log('Rendering...');
  return (
    <div className={classes.container}>
      {items.map(item => {
        return (
          <div className={item.class} key={item.key}>
            {item.elements}
          </div>
        );
      })}
    </div>
  );
}

export default AppBarContainer;
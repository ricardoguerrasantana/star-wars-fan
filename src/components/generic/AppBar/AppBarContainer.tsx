// presentational component
import AppBar from './AppBar';

// types
import type { AppBarProps } from './AppBar';

// debugger
import Debug from "debug";
const log = Debug("App:AppBarContainer");
log.log = console.log.bind(console);

// Props type
export type Props = AppBarProps;

// Container component
function AppBarContainer({ items, classes }: Props) {
  log('Rendering...');

  return (
    <AppBar 
      classes={classes} 
      items={items} 
    />
  );
}

export default AppBarContainer;
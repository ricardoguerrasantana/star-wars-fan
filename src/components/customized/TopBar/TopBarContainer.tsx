/**
 * This specialized container component customize 
 * the AppBar generic container component
 */

// React
import { memo } from 'react';

// presentational component
import { AppBar } from '../../generic';

// types
import type { AppBarProps } from '../../generic';

// constants
import { APP } from '../../../utils/constants';

// Styles
import styles from './TopBar.module.css';
// import styles from './TopBar.structure.module.css';

// debugger
import Debug from "debug";
const log = Debug('App:TopBarContainer');
log.log = console.log.bind(console);


function TopBarContainer() {
  log("Rendering...");
  
  // Left side group
  const logo = (
    <img 
      alt="star wars logo" 
      className={styles.logo}
      src="images\icons\Star_wars2.svg"
    />
  );
  const leftGroup ={
    class: styles.leftGroup,
    elements: logo,
    key: "left group"
  }

  // Group of elements that goes in the top bar
  const AppTitle = (<h1>{""}</h1>);
  const centerGroup = {
    class: styles.centerGroup,
    elements: AppTitle,
    key: APP.TITLE
  }
  
  // Right side group
  const rightGroup ={
    class: styles.rightGroup,
    elements: logo,
    key: "right group"
  }
  
  // classes for styling customization required by the plain genreic component that this specific component is rendering.
  const classes: AppBarProps["classes"] = {
    container: styles.container
  };
  
  // const Classes: AppBarTypes["classes"] = classes;
  const items: AppBarProps["items"] = [leftGroup, centerGroup, rightGroup];
  return (
    <AppBar 
      classes={classes}
      items={items} 
    />
  );
}

export default memo(TopBarContainer);
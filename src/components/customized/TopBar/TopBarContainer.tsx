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

// debugger
import Debug from "debug";
const log = Debug('App:TopBarContainer');
log.log = console.log.bind(console);


function TopBarContainer() {
  log("Rendering...");
  
  // Left side group
  const leftGroup ={
    class: styles.leftGroup,
    elements: null,
    key: "left group"
  }

  // Group of elements that goes in the top bar
  const AppTitle = (<h1>{APP.TITLE}</h1>);
  const centerGroup = {
    class: styles.centerGroup,
    elements: AppTitle,
    key: APP.TITLE
  }
  
  // Right side group
  const rightGroup ={
    class: styles.rightGroup,
    elements: null,
    key: "right group"
  }
  
  // classes for styling customization required by the plain genreic component that this specific component is rendering.
  const classes: AppBarProps["classes"] = {
    container: styles.container
  };
  
  // const Classes: AppBarTypes["classes"] = classes;
  const items: AppBarProps["items"] = [rightGroup, centerGroup, leftGroup];
  return (
    <AppBar 
      classes={classes}
      items={items} 
    />
  );
}

export default memo(TopBarContainer);
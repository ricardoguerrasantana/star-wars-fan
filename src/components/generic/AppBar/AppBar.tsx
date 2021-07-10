import { ReactNode } from 'react';

export type AppBarProps = {
  classes: {
    container: string
  },
  items: {
    elements: ReactNode,
    key: string,
    class: string
  }[]
}

function AppBar({ items , classes }: AppBarProps) {
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

export default AppBar;
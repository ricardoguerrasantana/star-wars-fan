// constants
import { APP } from "./utils/constants";

// styles
import "./globalStyle.css"
import styles from "./App.module.css";


function App (): JSX.Element {
  return (
    <div className={styles.container}>
      {APP.TITLE}
    </div>
  );
}

export default App;

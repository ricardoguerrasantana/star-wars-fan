// Components
import { TopBar } from "./components";

// styles
import "./globalStyle.css"
import styles from "./App.module.css";


function App (): JSX.Element {
  return (
    <div className={styles.container}>
      <TopBar />
    </div>
  );
}

export default App;

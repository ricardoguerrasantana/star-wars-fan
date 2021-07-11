// Components
import { Questionnarie, TopBar } from "./components/customized";

// styles
import "./globalStyle.css"
import styles from "./App.module.css";


function App (): JSX.Element {
  return (
    <div className={styles.container}>
      <TopBar />
      <Questionnarie />
    </div>
  );
}

export default App;

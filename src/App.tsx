// Components
import { QuizApp } from "./components/customized";

// styles
import "./globalStyle.css"
import styles from "./App.module.css";


function App (): JSX.Element {
  return (
    <div className={styles.container}>
      <QuizApp />
    </div>
  );
}

export default App;

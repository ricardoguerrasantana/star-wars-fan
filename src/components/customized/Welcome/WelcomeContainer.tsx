// Constants
import { WELCOME } from "../../../utils/constants";

// Styles
import styles from "./Welcome.module.css";
// import styles from "./Welcome.structure.module.css";

// Types
import type { SetStart } from "../../../components/customized";

// debugger
import Debug from "debug";
const log = Debug('App:WelcomeContainer');
log.log = console.log.bind(console);

// Props types
export type Props ={
  setStart:SetStart;
}

function WelcomeContainer({ setStart }:Props) {
  log("Rendering...");

  const { TEXT } = WELCOME;

  function handleStartClick() {
    setStart(true);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{TEXT.TITLE}</h1>
      </div>
      <div className={styles.body}>
        <h2>{TEXT.MESSAGE}</h2>
        <q>{TEXT.QUOTE}</q>
      </div>
      <button 
        className={styles.startButton}
        onClick={handleStartClick}
        type="button"
      >
        {TEXT.BUTTONS.START}
      </button>
    </div>
  );
}

export default WelcomeContainer;
// React
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:StepBody");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  children: ReactNode;
  text: {
    buttons: {
      back: string;
      next: string;
      done: string;
    };
    validationMessage: string;
  }
  styles:{
    buttons: {
      back: string;
      container: string;
      next: string;
    };
    validationMessage: string;
  };
  handleDoneClick: () => void;
  lastStep: number;
  setStep: (step: number) => void;
  step: number;
  showMessage: boolean;
}

/** StepBody helper component takes DropdownBody component 
 * that VerticalStepper receive and adds buttons to it for stepping 
 * control. */
function StepBody ({ children, text , handleDoneClick, lastStep, step, setStep , styles, showMessage }: Props) {
  log("Rendering...");
  
  function handleBackClick() {
    setStep(step - 1);
  }

  function handleNextClick() {
    setStep(step + 1);
  }

  return (
    <>
      {children}
      <div className={styles.buttons.container}>
        {step !== 0 ? 
          <button 
            className={styles.buttons.back} 
            onClick={handleBackClick}
            type="button"
          >
            {text.buttons.back}
          </button> : <div />}
        {step === lastStep ? 
          <button 
            className={styles.buttons.next} 
            onClick={handleDoneClick}
            type="button"
          >
            {text.buttons.done}
          </button>: 
          <button 
            className={styles.buttons.next} 
            onClick={handleNextClick}
            type="button"
          >
            {text.buttons.next}
          </button>}
      </div>
      {showMessage && 
        <div className={styles.validationMessage}>
          {text.validationMessage}
        </div>}
    </>
  );
}

export default StepBody;
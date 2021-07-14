// React
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:StepBody");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  children: ReactNode;
  buttonText: {
    back: string;
    next: string;
    done: string;
  };
  styles:{
    buttons: {
      back: string;
      container: string;
      next: string;
    };
  };
  handleDoneClick: () => void;
  lastStep: number;
  setStep: (step: number) => void;
  step: number;
}

/** StepBody helper component takes DropdownBody component 
 * that VerticalStepper receive and adds buttons to it for stepping 
 * control. */
function StepBody ({ children, buttonText , handleDoneClick, lastStep, step, setStep , styles }: Props) {
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
            {buttonText.back}
          </button> : <div />}
        {step === lastStep ? 
          <button 
            className={styles.buttons.next} 
            onClick={handleDoneClick}
            type="button"
          >
            {buttonText.done}
          </button>: 
          <button 
            className={styles.buttons.next} 
            onClick={handleNextClick}
            type="button"
          >
            {buttonText.next}
          </button>}
      </div>
    </>
  );
}

export default StepBody;
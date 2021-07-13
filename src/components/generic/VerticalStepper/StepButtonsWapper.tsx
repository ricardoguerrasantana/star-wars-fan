// React
import { ReactNode } from 'react';

// debugger
import Debug from "debug";
const log = Debug("App:StepButtonsWapper");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  children: ReactNode;
  buttonText: {
    back: string;
    next: string;
    submit: string;
  };
  buttonStyles: {
    back: string;
    container: string;
    next: string;
  };
  lastStep: number;
  setStep: (step: number) => void;
  step: number;
}

/** StepButtonsWapper helper component takes DropdownBody component 
 * that VerticalStepper receive and adds buttons to it for stepping 
 * control. */
function StepButtonsWapper ({ children, buttonText , buttonStyles , lastStep, step, setStep }: Props) {
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
      <div className={buttonStyles.container}>
        {step !== 0 ? 
          <button 
            className={buttonStyles.back} 
            onClick={handleBackClick}
            type="button"
          >
            {buttonText.back}
          </button> : <div />}
        <button 
          className={buttonStyles.next} 
          onClick={handleNextClick}
          type="button"
        >
          {step === lastStep ? buttonText.submit : buttonText.next}
        </button>
      </div>
    </>
  );
}

export default StepButtonsWapper;
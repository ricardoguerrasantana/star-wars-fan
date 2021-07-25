// Constants
import { FEEDBACK } from "../../../utils/constants";

// Generic components
import { CheckoutForm } from "../../generic";

// Styles
import styles from "./Feedback.module.css";

// Types from customized components
import type { Data, SetDone, SetStart, Results, SetResults } from "../../../components/customized";

// debugger
import Debug from "debug";
const log = Debug('App:FeedbackContainer');
log.log = console.log.bind(console);

// Props types
export type Props ={
  data:Data;
  results:Results;
  setDone:SetDone;
  setResults:SetResults;
  setStart:SetStart;
}

function FeedbackContainer({ data, results, setResults, setStart, setDone }:Props) {
  log("Rendering...");

  // Styles for Checkout generic component
  const checkoutStyles = {
    buttons: {
      submit: styles.submitButton,
    },
    container: styles.container,
    header: styles.header,
    inner: {
      container: styles.innerContainer,
    },
  };

  // UI text for Checkout genric component
  const { TEXT } = FEEDBACK; 
  const text = {
    buttons: {
        submit: TEXT.BUTTONS.SUBMIT,
    },
  }

  /** Getting score to be rendered in checkout header */
  function score() {
    // Caculates hits
    let hits = 0;
    results.forEach((result) => {
      data.map(d => clean(d.correctAnswer)).includes(clean(result)) && hits++;
    });
    const base = data.length;
    return Math.round((hits/base) * 10).toFixed(1);
  }
  
  function clean (str:string) {
    // eslint-disable-next-line no-useless-escape
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
  }

  const header = (
    <h1>{`${TEXT.HEADER} ${score()}`}</h1>
  );

  /** Checkout items */
  const checkoutItems = data.map((item, step) => {
    const validAnswer = clean(item.correctAnswer) === clean(results[step]);

    const element = (
      <>
        <h3>{item.topic}</h3>
        <div
          className={styles.answers}
        >
          <p
            className={validAnswer ? styles.correctAnswer : styles.wrongAnswer}
          >
            {`${TEXT.ANSWER_PRESENTATION}`} 
            <b>{` ${results[step]}`}</b>
            {` ${validAnswer ? TEXT.VALIDATION : ""}`}
          </p>
          {!validAnswer && 
            <p 
              className={styles.correctAnswer}
            >
              {`${TEXT.CORRECT_ANSWER}`} 
              <b>{` ${item.correctAnswer}`}</b>
            </p>}
        </div>
      </>
    );

    return {
      styles: styles.checkoutItem,
      element,
      id: item.id,
    };
  });

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setStart(false);
    setResults(prev => {
      const next = new Array(prev.length).fill(""); 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return next;
    });
    setDone(false);
  }

  return (
    <CheckoutForm 
      handleSubmit={handleSubmit}
      header={header}
      items={checkoutItems}
      styles={checkoutStyles}
      text={text}
    />
  );
}

export default FeedbackContainer;
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
    return str.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g,"").toLowerCase();
  }

  const header = (
    <h1>{score()}</h1>
  );

  /** Checkout items */
  const checkoutItems = data.map((item, step) => {
    const validAnswer = clean(item.correctAnswer) === clean(results[step]);

    const component = (
      <>
        <h2>{item.topic}</h2>
        <div>
          <div className={styles.answerContiner}>
            <p>{`${TEXT.ANSWER_PRESENTATION} ${results[step]} ${validAnswer ? TEXT.VALIDATION : ""}.`}</p>
          </div>
          {!validAnswer && 
            <div className={styles.correctAnswerContiner}>
              <p>{`${TEXT.CORRECT_ANSWER} ${item.correctAnswer}`}</p>
            </div>}
        </div>
      </>
    );

    return {
      class: styles.checkoutItem,
      component,
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
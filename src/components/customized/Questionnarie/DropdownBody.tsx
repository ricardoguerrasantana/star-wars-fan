// debugger
import Debug from "debug";
const log = Debug("App:DropdownBody");
log.log = console.log.bind(console);

// Prop types
type Result = string[];

type UpdateResult = (prev: Result) => Result;

export type Props = {
  answerOptions?: string[];
  results: string[];
  setResults: (callback: UpdateResult) => void;
  step: number;
  styles: {
    container: string; 
    option: {
      normal: string;
      selected: string;
      disabled: string;
    };
  };
  topic: string;
  type: string;
}

/** DropdownBody helper component takes charge of rendering 
 * content of each step*/
function DropdownBody({ answerOptions, results, setResults, step, styles, topic , type }: Props) {
  log("Rendering...");

  function handleOnAnswerType(e: React.ChangeEvent<HTMLInputElement>) {
    setResults(prev => {
      const next = [...prev];
      next[step] = e.target.value;
      return next;
    });
  }
  
  return (
    <div className={styles.container}>
      <h1>{topic}</h1>
      {answerOptions && 
        <ul>
          {answerOptions?.map((answer) => {
            function handleOnAnswerClick() {
              setResults(prev => {
                const next = [...prev];
                next[step] = answer;
                return next;
              });
            }

            function isSeleted() {
              return results[step] === answer ?
                styles.option.selected :
                results[step] === "" ?
                styles.option.normal :
                styles.option.disabled;
            }
            return (
              <li key={answer}>
                <button 
                  className={isSeleted()}
                  disabled={results[step] !== ""}
                  onClick={handleOnAnswerClick}
                  type="button"
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>}
      {type === "TextInput" && 
        <input 
          onChange={handleOnAnswerType}
        />}
    </div>
  );
}

export default DropdownBody;
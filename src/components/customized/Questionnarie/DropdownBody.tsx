// Types
import type { Results, SetResults } from "../../../components/customized";

// debugger
import Debug from "debug";
const log = Debug("App:DropdownBody");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  answerOptions?: string[];
  inputPlaceholder: string;
  results: Results;
  setResults: SetResults;
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
function DropdownBody({ answerOptions, inputPlaceholder, results, setResults, step, styles, topic , type }: Props) {
  log("Rendering...");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResults((prev) => {
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

            const optionStyle = results[step] === answer ?
              styles.option.selected :
              styles.option.normal;
            
            return (
              <li 
                className={optionStyle}
                key={answer}
                onClick={handleOnAnswerClick}
              >
                {answer}
              </li>
            );
          })}
        </ul>}
      {type === "TextInput" && 
        <input 
          onChange={handleChange}
          placeholder={inputPlaceholder}
          type="text"
          value={results[step]}
        />}
    </div>
  );
}

export default DropdownBody;
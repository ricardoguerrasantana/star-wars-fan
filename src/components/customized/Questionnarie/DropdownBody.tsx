// debugger
import Debug from "debug";
const log = Debug("App:DropdownBody");
log.log = console.log.bind(console);

// Prop types
export type Props = {
  answerOptions?: string[];
  styles: string;
  topic: string;
  type: string;
}

/** DropdownBody helper component takes charge of rendering 
 * content of each step*/
function DropdownBody({ styles, answerOptions, topic , type }: Props) {
  log("Rendering...");
  return (
    <div className={styles}>
      <h1>{topic}</h1>
      {answerOptions && 
        <ul>
          {answerOptions?.map((answer) => (
            <li key={answer}>{answer}</li>
          ))}
        </ul>}
      {type === "TextInput" && <input />}
    </div>
  );
}

export default DropdownBody;
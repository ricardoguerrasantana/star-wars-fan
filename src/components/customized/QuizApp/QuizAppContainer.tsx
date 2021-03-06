// React
import { useState } from "react";

// Components
import { Questionnarie, Feedback, TopBar, Welcome } from "../../../components/customized";

// Hard coded data
import DATA from "../../../data/data.json"

// styles
import styles from "./QuizApp.module.css";

// debugger
import Debug from "debug";
const log = Debug('App:QuizAppContainer');
log.log = console.log.bind(console);

export type Results = string[];
export type SetResults = (callback: (prev: Results) => Results) => void;
export type Start = boolean;
export type SetStart = (param: boolean) => void;
export type Done = boolean;
export type SetDone = (param: boolean) => void;
export type Data = {
  topic:string;
  type:string;
  answerOptions?:string[];
  correctAnswer:string;
  id:string;
}[];

function QuizAppContainer (): JSX.Element {
  log("Rendering...");

  // Stores chosen answers by user
  const [results , setResults] = useState<string[]>(new Array(DATA.length).fill(""));
  log("results", results);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);

  // Mocked results
  // const MockedResults = ["C-3PO", "no se.", "1977","950", "all terrain,  armored transport . "];
  
  return (
    <div className={styles.container}>
      <TopBar />
      { start ? done ?
        <Feedback 
          data={DATA}
          results={results}
          // results={MockedResults}
          setDone={setDone}
          setResults={setResults}
          setStart={setStart}
        /> : 
        <Questionnarie 
          data={DATA}
          results={results} 
          setDone={setDone}
          setResults={setResults}
        /> : 
        <Welcome 
          setStart={setStart}
        /> }
    </div>
  );
}

export default QuizAppContainer;
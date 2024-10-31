import { useEffect, useState } from "react";
import ResultBarComponent from "./ResultBarComponent";

interface Props {
  word: string;
  generateNewWord: ()=>void;
  show: boolean;
  scores: number[];
  streak:number;
}


const ResultsComponent = ({ word,generateNewWord,show,scores,streak }:Props) => {
  const [className, setClassName] = useState("results-parent");
  const maxScore = Math.max(...scores) > 0 ? Math.max(...scores) : 1;

  useEffect(() => {
    setClassName(prevVal => prevVal + (show ? " results-parent-shown" : ""));
  },[show])

  return (
    <div className={className}>
      <div className="results-background themed-light"/>
      <div className="results-text">THE WORD WAS</div>
      <div className="results-word">{word}</div>
      <div className="results-streak">{"STREAK: " + streak}</div>
      {scores.map((score:number, index:number) => (
        <ResultBarComponent score={index + 1} count={score} percentage={score/maxScore} key={index}/>
      ))}
      <button className="results-button themed-invert"onClick={generateNewWord}>New Word</button>
    </div>
  )
}
export default ResultsComponent;
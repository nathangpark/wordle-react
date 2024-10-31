import { useEffect, useRef, useState } from "react";
import "./App.css";
import { allWords, allWordsLength } from "./assets/all_words";
import { words,length } from "./assets/wordlist";

import SpacesComponent, { Colors } from "./components/SpacesComponent";
import KeyboardComponent from "./components/KeyboardComponent";
import ResultsComponent from "./components/ResultsComponent";

import "./styles/KeyboardStyles.css";
import "./styles/SpacesStyles.css";
import "./styles/ResultsStyles.css";

let wordSync =
  words[Math.floor(Math.random() * length)].toUpperCase();
let colorsSync: Colors[][] = [[]];

const guesses = 5;
let initialScores = Array(guesses).fill(0);

function App() {
  const [word, setWord] = useState(wordSync + "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState<Colors[][]>(colorsSync);
  const [showButton, setShowButton] = useState(false);
  const [keyboardColors, setKeyboardColors] = useState([[""], [""], [""]]);
  const [scores, setScores] = useState(initialScores);
  const [streak, setStreak] = useState(0);

  const spacesRef = useRef<any>(null);

  const generateNewWord = () => {
    wordSync =
      words[Math.floor(Math.random() * length)].toUpperCase();
    setWord(wordSync + "");
    setActiveIndex(-1);
    colorsSync = [[]];
    setColors([...colorsSync]);
    setShowButton(false);
    setKeyboardColors([[""], [""], [""]]);
  };

  const keyPress = (key: string) => {
    spacesRef.current.externalKeyPress(key);
  };

  useEffect(() => {
    if (activeIndex == -1) setActiveIndex(0);
  }, [activeIndex]);

  const onEnter = (input: string[]) => {
    let wordInput = "";
    input.forEach((char: string) => {
      wordInput += char.toLowerCase();
    });

    let color: Colors[] = [];
    let tempKeyboardColors = keyboardColors;

    if (!allWords.includes(wordInput)) return false;
    input.forEach((letter: string, index: number) => {
      if (wordSync.charAt(index) == letter) {
        color[index] = Colors.Green;
        tempKeyboardColors[0].push(letter);
      } else if (wordSync.includes(letter)) {
        color[index] = Colors.Yellow;
        tempKeyboardColors[1].push(letter);
      } else {
        color[index] = Colors.Grey;
        tempKeyboardColors[2].push(letter);
      }
    });

    colorsSync[activeIndex] = color;
    colorsSync[activeIndex + 1] = [];
    setKeyboardColors([...tempKeyboardColors]);
    setColors([...colorsSync]);

    if (
      color.every((c: Colors) => {
        return c == Colors.Green;
      })
    ) {
      setShowButton(true);

      let tempScores = scores;
      tempScores[activeIndex] += 1;
      setScores([...tempScores]);

      setStreak((prevVal) => prevVal + 1);
    } else if (activeIndex == guesses - 1) {
      setShowButton(true);
      setStreak(0);
    } else setActiveIndex((prevIndex) => prevIndex + 1);

    return true;
  };

  return (
    <>
      <h1 className="title">WORDLE</h1>
      {Array.from({ length: activeIndex + 1 }).map((_, index: number) => (
        <SpacesComponent
          ref={spacesRef}
          key={index}
          active={index == activeIndex}
          onEnter={onEnter}
          color={colors[index]}
        />
      ))}
      <KeyboardComponent
        greenKeys={keyboardColors[0]}
        yellowKeys={keyboardColors[1]}
        greyKeys={keyboardColors[2]}
        onClick={keyPress}
      />
      {showButton && (
        <ResultsComponent
          word={word}
          generateNewWord={generateNewWord}
          show={showButton}
          scores={scores}
          streak={streak}
        />
      )}
    </>
  );
}

export default App;

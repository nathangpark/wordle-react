import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Props {
  active: boolean;
  onEnter: (word:string[]) => boolean | undefined;
  color: Colors[];
}

export enum Colors {
  Green = "green",
  Yellow = "yellow",
  Grey = "grey",
}
let currentIndex = 0;
let tempInput = ["", "", "", "", ""];


const SpacesComponent = forwardRef(({ active,onEnter,color }: Props, ref) => {
  const [input, setInput] = useState(["","","","",""]);



  const checkKey = (key: string) => {
    return /^[a-zA-Z]$/.test(key) || key == "Backspace" || key == "Enter";
  };

  const keyPress = (key: string) => {
    if (!checkKey(key) || color.length > 1) return;
    console.log(currentIndex);

    switch (key) {
      case "Enter":
        if (onEnter(tempInput)) {
          currentIndex = 0;
          tempInput = ["", "", "", "", ""];
          return;
        }
        break;
      case "Backspace":
        currentIndex -= currentIndex == 0 ? 0 : 1;
        tempInput[currentIndex] = "";
        break;
      default:
        if (currentIndex == 5) return;
        tempInput[currentIndex] = key.toUpperCase();
        currentIndex += 1;
        break;
    }

    setInput([...tempInput]);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      keyPress(event.key);
    };

    window.addEventListener("keydown", handleKeyPress);

    if (!active) window.removeEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [active,color]);
  
  useImperativeHandle(ref, () => ({
    externalKeyPress: (key:string) => {
      keyPress(key);
    }
  }))

  return (
    <div className="spaces-parent">
      {input.map((item, index) => (
        <div className={"space " + color[index]} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
});
export default SpacesComponent;

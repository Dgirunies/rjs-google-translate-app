import { useState } from "react";

import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");

  const arrowLanguageSwitcherHandler = () => {
    const tmpInputLanguage = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tmpInputLanguage);
  };

  return (
    <div className="app">
      <TextBox selectedLanguage={inputLanguage} style="input" />
      <div className="arrow-container" onClick={arrowLanguageSwitcherHandler}>
        <Arrows />
      </div>
      <TextBox selectedLanguage={outputLanguage} style="output" />
    </div>
  );
};

export default App;

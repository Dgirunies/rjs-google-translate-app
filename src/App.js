import { useEffect, useState } from "react";
import axios from "axios";

import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const fetchLanguages = async () => {
    try {
      const response = await axios("http://localhost:8000/languages");
      setLanguages(response.data);
    } catch (err) {
      console.error(err);
      setLanguages(["Português"]);
      setInputLanguage("Português");
      setOutputLanguage("Português");
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const arrowLanguageSwitcherHandler = () => {
    const tmpInputLanguage = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tmpInputLanguage);
  };

  const translateText = async () => {
    if (inputLanguage === outputLanguage) {
      console.log(textToTranslate);
      setTranslatedText(textToTranslate);
      return;
    }

    const data = { textToTranslate, outputLanguage, inputLanguage };

    const response = await axios("http://localhost:8000/translate", {
      params: data,
    });
  };

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            style="input"
            setShowModal={setShowModal}
            textToTranslate={textToTranslate}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
            translateText={translateText}
          />
          <div
            className="arrow-container"
            onClick={arrowLanguageSwitcherHandler}
          >
            <Arrows />
          </div>
          <TextBox
            selectedLanguage={outputLanguage}
            style="output"
            translatedText={translatedText}
            setShowModal={setShowModal}
          />
        </>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === "input" ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
};

export default App;

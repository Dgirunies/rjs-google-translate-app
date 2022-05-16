import { useEffect, useState } from "react";
import axios from "axios";

import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const fetchLanguages = async () => {
    const response = await axios("http://localhost:8000/languages");
    setLanguages(response.data);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const arrowLanguageSwitcherHandler = () => {
    const tmpInputLanguage = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tmpInputLanguage);
  };

  const translateText = () => {
    if (inputLanguage === outputLanguage) {
      console.log(textToTranslate);
      setTranslatedText(textToTranslate);
      return;
    }
    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/translate",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage,
      },
      headers: {
        "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
        "X-RapidAPI-Key": "",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTranslatedText(response.data.data.translation);
      })
      .catch(function (error) {
        console.error(error);
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

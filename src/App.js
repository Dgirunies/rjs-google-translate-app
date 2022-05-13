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
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/languages",
      headers: {
        "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
        "X-RapidAPI-Key": "",
      },
    };

    console.log(process.env);

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        const arrayOfData = Object.keys(response.data.data).map(
          (key) => response.data.data[key]
        );
        setLanguages(arrayOfData);
      })
      .catch(function (error) {
        console.error(error);
        setLanguages(["Português"]);
        setInputLanguage("Português");
        setOutputLanguage("Português");
      });
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
    alert(inputLanguage === outputLanguage);
    if (inputLanguage === outputLanguage) {
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
            translatedText={translateText}
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

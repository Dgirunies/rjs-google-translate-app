import { useState } from "react";

import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");

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
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const arrowLanguageSwitcherHandler = () => {
    const tmpInputLanguage = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tmpInputLanguage);
  };

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            style="input"
            setShowModal={setShowModal}
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
            setShowModal={setShowModal}
          />
        </>
      )}
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
};

export default App;

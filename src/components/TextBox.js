import React from "react";
import SelectDropDown from "./SelectDropDown";

import "./TextBox.css";

const TextBox = ({
  selectedLanguage,
  style,
  setShowModal,
  translateText,
  textToTranslate,
  setTextToTranslate,
  translatedText,
  setTranslatedText,
}) => {
  const textAreaKeyPressedHandler = (e) => {
    if (e.key === "Enter") {
      translateText();
    }
    return;
  };

  const clearTextHandler = () => {
    setTextToTranslate("");
    setTranslatedText("");
  };

  return (
    <div className={style}>
      <SelectDropDown
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
        style={style}
      />
      <textarea
        placeholder={style === "input" ? "Enter Text" : "Translation"}
        disabled={style === "output"}
        onKeyUp={translateText ? textAreaKeyPressedHandler : null}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === "input" ? textToTranslate : translatedText}
      />
      {style === "input" && (
        <div className="delete" onClick={clearTextHandler}>
          🗙
        </div>
      )}
    </div>
  );
};

export default TextBox;

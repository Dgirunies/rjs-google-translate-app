import React from "react";
import SelectDropDown from "./SelectDropDown";

const TextBox = ({ selectedLanguage, style, setShowModal }) => {
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
      />
    </div>
  );
};

export default TextBox;

import React from "react";

const TextBox = ({ style }) => {
  return (
    <div>
      <textarea
        placeholder={style === "input" ? "Enter Text" : "Translation"}
      />
    </div>
  );
};

export default TextBox;

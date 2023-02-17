import React from "react";
import "./Button.css";

function Button({ buttonType, name, handleButtonClick, type }) {
  const buttonStyle = {
    ButtonSubmit: "buttonSubmit",
    ButtonDelete: "buttonDelete",
  };
  return (
    <button
      className={buttonStyle[buttonType]}
      type={type}
      onClick={handleButtonClick}
    >
      {name}
    </button>
  );
}

export default Button;

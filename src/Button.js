import React from "react";
import resetIcon from "./assets/ic-reset.svg";

export default function Button({ onClick, className }) {
  return (
    <img onClick={onClick} className={className} src={resetIcon} alt="reset" />
  );
}

import React from "react";

export const NavButton = (props) => {
  return (
    <button
      className={props.className}
      onClick={() => {
        props.handleClick();
      }}
    >
      
      {props.text}
    </button>
  );
};

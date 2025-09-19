import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`btn btn-primary cursor-pointer ${props.className ?? ""}`}
    >
      {props.children}
    </button>
  );
}

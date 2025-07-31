"use client";

import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: Readonly<ReactNode>;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  className,
  children,
  type = "button",
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer p-1 px-1.5 transition-all duration-300 ease-in-out ${
        className ? className : ""
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

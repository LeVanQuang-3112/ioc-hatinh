import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type = "button", ...props }: Props) {
  return <button type={type} {...props} />;
}

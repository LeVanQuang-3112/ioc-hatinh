import { createElement, forwardRef, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
};

export const Card = forwardRef<HTMLElement, Props>(function Card(
  { as: Element = "div", ...props },
  ref,
) {
  return createElement(Element, { ...props, ref });
});

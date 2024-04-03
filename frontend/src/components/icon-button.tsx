import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "border border-white/10 rounded-md p-1.5",
        transparent ? "bg-orange-900/90" : "bg-orange-900/70",
        props.disabled ? "opacity-50" : null
      )}
    />
  );
}

{/* Se tiver na primeira página: deixa transparente os dois primeiros botões, se tiver na última: os dois últimos */}
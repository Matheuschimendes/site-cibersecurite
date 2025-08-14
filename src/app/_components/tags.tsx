import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TagsProps extends HTMLAttributes<HTMLDivElement> {
  borderColorClass?: string; // opcional, para customizar cor da borda via Tailwind
}

export default function Tags({
  className,
  children,
  borderColorClass = "border-[#ff0000]",
  ...otherProps
}: TagsProps) {
  return (
    <div
      className={twMerge(
        `inline-flex border ${borderColorClass} text-white text-xs px-3 py-1 rounded-full items-center gap-2 uppercase `,
        className
      )}
      {...otherProps}
    >
      {/* <span>&#10038;</span> */}
      <span>{children}</span>
    </div>
  );
}

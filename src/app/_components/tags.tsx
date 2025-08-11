import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tags(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...otherProps } = props;
  return (
    <>
      <div className={twMerge("inline-flex  border border-[#ff0000] text-white px-3 py-1 rounded-full items-center gap-2 uppercase", className)} {...otherProps}>
        <span>&#10038;</span>
        <span>{children}</span>
      </div>
    </>
  );
}

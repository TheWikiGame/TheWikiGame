import React from "react";
import { Page } from "../model/Page";
import { PageLink } from "./PageLink";
import { Circle, ArrowDown } from "lucide-react";

type PageHistoryProps = {
  pages: Page[];
} & React.ComponentProps<"div">;

export const PageHistory = ({
  className,
  pages,
  ...props
}: PageHistoryProps) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-[var(--border-color)] transform -translate-x-1/2" />
      {pages.map((page) => (
        <div key={page.href} className="relative flex flex-col items-center">
          {/* {index !== 0 ? (
            <ArrowDown size={16} className="z-10 text-[var(--border-color)]" />
          ) : (
            <></>
          )} */}
          <PageLink page={page} className="w-full mb-4" />
          {/* {index < pages.length - 1 ? (
            <Circle size={16} className="z-10 text-[var(--border-color)] fill-current" />
          ) : (
            <></>
          )} */}
        </div>
      ))}
    </div>
  );
};

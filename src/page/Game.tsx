import React, { useState, useEffect } from "react";
import { Page } from "../model/Page";
import { History } from "../component/History";
import { Options } from "../component/Options";
import { getLinkedInternalPagesFromArticleTitle } from "../api/wikimedia";

type GameProps = {} & React.ComponentProps<"div">;

const start = {
  page: "Pet_door",
  title: "Pet door",
  href: "https://en.wikipedia.org/wiki/Pet_door",
} as Page;

const end = {
  page: "Black-throated_loon",
  title: "Black-throated loon",
  href: "https://en.wikipedia.org/wiki/Black-throated_loon",
} as Page;

export const Game = ({ className, ...props }: GameProps) => {
  const [options, setOptions] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const linkedPages = await getLinkedInternalPagesFromArticleTitle(
          start.title
        );
        setOptions(linkedPages);
      } catch (error) {
        console.error("Failed to fetch linked pages:", error);
        setOptions([]);
      }
      setIsLoading(false);
    };

    fetchOptions();
  }, [start]);

  if (isLoading) return <>Loading...</>;
  return (
    <div className={`${className} h-screen`} {...props}>
      <h2 className={""}>
        From{" "}
        <a href={start.href} target="_blank">
          {start.title}
        </a>{" "}
        to{" "}
        <a href={end.href} target="_blank">
          {end.title}
        </a>
      </h2>
      <div className={`grid grid-cols-4 gap-4 h-full`}>
        <History className={"col-span-1"} pages={[start, end]} />
        <Options className={"col-span-3"} pages={options} />
      </div>
    </div>
  );
};

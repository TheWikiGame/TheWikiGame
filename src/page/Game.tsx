import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Page } from "../model/Page";
import { History } from "../component/History";
import { Options } from "../component/Options";
import {
  getLinkedInternalPagesFromArticleTitle,
  retrieveRandomWikipediaArticles,
} from "../api/wikimedia/api";
import { InlinePage } from "../component/InlinePage";
import { logger } from "../util/Logger";

type GameProps = {} & React.ComponentProps<"div">;

export const Game = ({ className, ...props }: GameProps) => {
  const [gameState, setGameState] = useState<{
    start?: Page;
    end?: Page;
    current?: Page;
    history: Page[];
  }>({
    history: [],
  });
  const [options, setOptions] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  logger.debug("Rendering Game page");

  const { start, end, current, history } = useMemo(
    () => gameState,
    [gameState]
  );

  useEffect(() => {
    logger.debug("Initializing game state");
    const initializeGame = async () => {
      setIsLoading(true);
      try {
        const [startPage, endPage] = await retrieveRandomWikipediaArticles(2);
        setGameState({
          start: startPage,
          end: endPage,
          current: startPage,
          history: [startPage],
        });
      } catch (error) {
        logger.error("Failed to fetch linked pages:", error);
      }
      setIsLoading(false);
    };

    initializeGame();
  }, []);

  useEffect(() => {
    logger.debug("Retrieving internal links on current page");
    const fetchOptions = async () => {
      if (current == undefined) {
        return;
      }
      setIsLoading(true);
      try {
        const linkedPages = await getLinkedInternalPagesFromArticleTitle(
          current.title
        );
        setOptions(linkedPages);
      } catch (error) {
        logger.error("Failed to fetch linked pages:", error);
        setOptions([]);
      }
      setIsLoading(false);
    };

    fetchOptions();
  }, [current]);

  const handlePageSelected = useCallback((page: Page) => {
    setGameState((prevState) => {
      return {
        ...prevState,
        current: page,
        history: [...prevState.history, page],
      };
    });
  }, []);

  if (isLoading || !start || !end || !current) return <>Loading...</>;
  return (
    <div className={`${className} h-screen`} {...props}>
      <h2 className={""}>
        From <InlinePage page={start} /> to <InlinePage page={end} />
      </h2>
      <div className={`grid grid-cols-4 gap-4 h-full`}>
        <History className={"col-span-1"} pages={history} />
        <Options
          currentPage={current}
          className={"col-span-3"}
          onSelect={handlePageSelected}
          pages={options}
        />
      </div>
    </div>
  );
};

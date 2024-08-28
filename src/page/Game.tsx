import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Page } from "../model/Page";
import { History } from "../component/history/History";
import { Options } from "../component/options/Options";
import {
  getLinkedInternalPagesFromArticleTitle,
  retrieveRandomWikipediaArticles,
} from "../api/wikimedia/api";
import { InlinePage } from "../component/ui/InlinePage";
import { logger } from "../util/Logger";
import { GameCompletedModal } from "../component/modals/GameCompletedModal";
import { GameState } from "../model/GameState";
import { PagePreview } from "../component/preview/PagePreview";

type GameProps = {} & React.ComponentProps<"div">;

export const Game = ({ className, ...props }: GameProps) => {
  const [gameState, setGameState] = useState<GameState>({
    history: [],
  });
  const [options, setOptions] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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
      setOptionsLoading(true);
      try {
        const linkedPages = await getLinkedInternalPagesFromArticleTitle(
          current.title
        );
        setOptions(linkedPages);
      } catch (error) {
        logger.error("Failed to fetch linked pages:", error);
        setOptions([]);
      }
      setOptionsLoading(false);
    };

    fetchOptions();
  }, [current]);

  const handlePageSelected = useCallback(
    (page: Page) => {
      if (page.href == end?.href) {
        setModalOpen(true);
      }
      setGameState((prevState) => {
        return {
          ...prevState,
          current: page,
          history: [...prevState.history, page],
        };
      });
    },
    [end]
  );

  const handleOnModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  if (isLoading || !start || !end || !current) return <>Loading...</>;
  return (
    <div className={`${className} h-screen`} {...props}>
      <h2 className={""}>
        From <InlinePage page={start} /> to <InlinePage page={end} />
      </h2>
      <div className={`grid grid-cols-6 gap-4 h-full`}>
        <History className={"col-span-1"} pages={history} />
        <Options
          loading={optionsLoading}
          currentPage={current}
          className={"col-span-2"}
          onSelect={handlePageSelected}
          pages={options}
        />
        <PagePreview page={current} className="col-span-3 h-screen" />
      </div>
      <GameCompletedModal
        win={current?.title === end.title}
        start={start}
        end={end}
        history={history}
        isOpen={modalOpen}
        onClose={handleOnModalClose}
      />
    </div>
  );
};

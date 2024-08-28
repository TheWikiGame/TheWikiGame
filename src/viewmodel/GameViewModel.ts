import { useState, useCallback, useEffect } from "react";
import { Page } from "../model/Page";
import {
  getLinkedInternalPagesFromArticleTitle,
  retrieveRandomWikipediaArticles,
} from "../api/wikimedia/api";
import { logger } from "../util/Logger";
import { GameOverReason, GameResult, GameState } from "../model/GameState";

export const useGameViewModel = () => {
  const [gameState, setGameState] = useState<GameState>({
    start: undefined,
    end: undefined,
    current: undefined,
    history: [],
  });
  const [options, setOptions] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const initializeGame = useCallback(async () => {
    logger.debug("Initializing game state");
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
  }, []);

  const fetchOptions = useCallback(async (currentPage: Page) => {
    logger.debug("Retrieving internal links on current page");
    setOptionsLoading(true);
    try {
      const linkedPages = await getLinkedInternalPagesFromArticleTitle(
        currentPage.title
      );
      setOptions(linkedPages);
    } catch (error) {
      logger.error("Failed to fetch linked pages:", error);
      setOptions([]);
    }
    setOptionsLoading(false);
  }, []);

  const handlePageSelected = useCallback(
    (page: Page) => {
      setGameState((prevState) => {
        const newHistory = [...prevState.history, page];
        const newState = {
          ...prevState,
          current: page,
          history: newHistory,
        };

        if (page.href === prevState.end?.href) {
          setModalOpen(true);
          setGameResult({
            reason: GameOverReason.Victory,
            history: newHistory,
          });
        } else if (options.length === 0) {
          setModalOpen(true);
          setGameResult({
            reason: GameOverReason.Deadend,
            history: newHistory,
          });
        }

        return newState;
      });
    },
    [options]
  );

  const handleForfeit = useCallback(() => {
    setModalOpen(true);
    setGameResult({
      reason: GameOverReason.Forfeit,
      history: gameState.history,
    });
  }, [gameState.history]);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (gameState.current) {
      fetchOptions(gameState.current);
    }
  }, [gameState.current, fetchOptions]);

  return {
    gameState,
    options,
    isLoading,
    optionsLoading,
    modalOpen,
    gameResult,
    handlePageSelected,
    handleForfeit,
    handleModalClose,
  };
};

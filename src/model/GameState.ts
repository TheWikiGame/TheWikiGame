import { Page } from "./Page";

type GameState = {
  start?: Page;
  end?: Page;
  current?: Page;
  history: Page[];
};

type GameResult = {
  reason: GameOverReason;
  history: Page[];
};

enum GameOverReason {
  Forfeit,
  Deadend,
  Victory,
}

export type { GameState, GameResult };
export { GameOverReason };

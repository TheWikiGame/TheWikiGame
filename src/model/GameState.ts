import { Page } from "./Page";

type GameState = {
  start?: Page;
  end?: Page;
  current?: Page;
  history: Page[];
};

enum GameOverReason {
  Victory,
  Deadend,
  Forfeit,
}

type GameResult = {
  reason: GameOverReason;
  history: Page[];
};

export type { GameState, GameResult };
export { GameOverReason };

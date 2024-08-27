import { Page } from "./Page";

type GameState = {
  start?: Page;
  end?: Page;
  current?: Page;
  history: Page[];
};

export type { GameState };

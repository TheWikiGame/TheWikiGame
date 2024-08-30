import { GameOverReason, GameResult } from "../../model/GameState";
import { Page } from "../../model/Page";

const handleShare = async (result: GameResult) => {
  const shareText = getShareTextFromGameResult(result);
  try {
    await navigator.clipboard.writeText(shareText);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

function getShareTextFromGameResult(result: GameResult): string {
  switch (result.reason) {
    case GameOverReason.Victory:
      return getShareTextForVictory(result.history);
    case GameOverReason.Deadend:
      return getShareTextForDeadend();
    case GameOverReason.Forfeit:
      return getShareTextForForfeit();
  }
}

function getShareTextForVictory(history: Page[]): string {
  const startPage = history[0];
  const endPage = history[history.length - 1];
  const numberOfMoves = history.length - 1;
  const res = `I got from ${startPage.title} to ${endPage.title} in ${numberOfMoves}!`;
  return res;
}
function getShareTextForDeadend(): string {
  const res = "";
  return res;
}

function getShareTextForForfeit(): string {
  const res = "";
  return res;
}

export { handleShare };

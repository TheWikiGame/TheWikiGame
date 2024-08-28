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
  let startPage = history[0];
  let endPage = history[history.length - 1];
  let numberOfMoves = history.length - 1;
  let res = `I got from ${startPage.title} to ${endPage.title} in ${numberOfMoves}!`;
  return res;
}
function getShareTextForDeadend(): string {
  let res = "";
  return res;
}

function getShareTextForForfeit(): string {
  let res = "";
  return res;
}

export { handleShare };

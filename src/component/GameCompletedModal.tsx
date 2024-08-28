import { useEffect, useRef } from "react";
import { InlinePage } from "./InlinePage";
import { GameOverReason, GameResult } from "../model/GameState";
import { logger } from "../util/Logger";
import { Button } from "./Button";
import { GameOverReason, GameResult } from "../model/GameState";
import { logger } from "../util/Logger";

type GameCompletedModalProps = {
  result: GameResult;
  onClose: () => void;
  isOpen: boolean;
} & Omit<React.ComponentProps<"dialog">, "open">;

export const GameCompletedModal = ({
  className,
  result,
  onClose,
  isOpen,
  ...props
}: GameCompletedModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleShareClick = () => {
    handleShare(result);
  };

  const getModalTitle = () => {
    switch (result.reason) {
      case GameOverReason.Victory:
        return "You Win!";
      case GameOverReason.Deadend:
        return "Dead End!";
      case GameOverReason.Forfeit:
        return "Game Over";
    }
  };

  const getModalContent = () => {
    switch (result.reason) {
      case GameOverReason.Victory:
        return (
          <>
            You made it from <InlinePage page={result.history[0]} /> to{" "}
            <InlinePage page={result.history[result.history.length - 1]} /> in{" "}
            {result.history.length - 1} moves.
          </>
        );
      case GameOverReason.Deadend:
        return "You've reached a dead end with no more links to follow.";
      case GameOverReason.Forfeit:
        return "You've chosen to end the game.";
    }
  };

  return (
    <dialog
      className={`${className} p-4 rounded-lg shadow-lg`}
      ref={dialogRef}
      onClose={onClose}
      {...props}
    >
      <div className={"flex flex-col space-y-2"}>
        <h1>{getModalTitle()}</h1>
        <h2>{getModalContent()}</h2>
        <hr />
        <div className={"flex justify-between"}>
          <Button variant="primary" onClick={handleShareClick}>
            Share
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
};
function handleShare(result: GameResult) {
  logger.info(`Sharing ${result}`);
  throw new Error("Function not implemented.");
}

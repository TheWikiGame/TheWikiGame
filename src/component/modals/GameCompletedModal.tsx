import { useEffect, useRef } from "react";
import { Page } from "../../model/Page";
import { InlinePage } from "../ui/InlinePage";
import { Button } from "../ui/Button";
import { GameOverReason, GameResult } from "../../model/GameState";
import { handleShare } from "../../feature/share-results/CopyResultsToClipboard";

type GameCompletedModal = {
  win: boolean;
  start: Page;
  end: Page;
  history: Array<Page>;
  onClose: () => void;
  isOpen: boolean;
} & Omit<React.ComponentProps<"dialog">, "open">;

export const GameCompletedModal = ({
  className,
  win,
  start,
  end,
  history,
  onClose,
  isOpen,
  ...props
}: GameCompletedModal) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copiedTextRef = useRef<HTMLSpanElement>(null);

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

  function handleShareButtonClick() {
    const text = copiedTextRef.current;
    if (!text) {
      return;
    }
    handleShare({
      reason: GameOverReason.Victory,
      history,
    } as GameResult);
    text.classList.remove("opacity-0");
    setTimeout(() => {
      const text = copiedTextRef.current;
      if (!text) {
        return;
      }
      text.classList.add("opacity-0");
    }, 1250);
  }

  return (
    <dialog
      className={`${className} p-4 rounded-lg shadow-lg`}
      ref={dialogRef}
      onClose={onClose}
      {...props}
    >
      <div className={"flex flex-col space-y-2"}>
        <h1>You Win!</h1>
        <h2>
          You made it from <InlinePage page={start} /> to{" "}
          <InlinePage page={end} /> in {history.length - 1} pages.
        </h2>
        <hr />
        <div className={"flex justify-between"}>
          <Button variant="primary" onClick={handleShareButtonClick}>
            Share
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      <span
        ref={copiedTextRef}
        className="opacity-0 absolute left-12 bottom-8 rotate-12 transition duration-300"
        style={{
          animationDuration: "1.25s",
        }}
      >
        Copied!
      </span>
    </dialog>
  );
};

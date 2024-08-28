import { useEffect, useRef } from "react";
import { Page } from "../model/Page";
import { InlinePage } from "./InlinePage";
import { Button } from "./Button";

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
          <Button variant="primary">Share</Button>
          <Button variant="secondary">Close</Button>
        </div>
      </div>
    </dialog>
  );
};

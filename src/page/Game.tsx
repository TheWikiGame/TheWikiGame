import React from "react";
import { History } from "../component/History";
import { Options } from "../component/Options";
import { InlinePage } from "../component/InlinePage";
import { GameCompletedModal } from "../component/GameCompletedModal";
import { useGameViewModel } from "../viewmodel/GameViewModel";

type GameProps = {} & React.ComponentProps<"div">;

export const Game = ({ className, ...props }: GameProps) => {
  const {
    gameState,
    options,
    isLoading,
    optionsLoading,
    modalOpen,
    gameResult,
    handlePageSelected,
    handleForfeit,
    handleModalClose,
  } = useGameViewModel();

  const { start, end, current, history } = gameState;

  if (isLoading || !start || !end || !current) return <>Loading...</>;

  return (
    <div className={`${className} h-screen`} {...props}>
      <h2 className={""}>
        From <InlinePage page={start} /> to <InlinePage page={end} />
      </h2>
      <div className={`grid grid-cols-4 gap-4 h-full`}>
        <History className={"col-span-1"} pages={history} />
        <Options
          loading={optionsLoading}
          currentPage={current}
          className={"col-span-3"}
          onSelect={handlePageSelected}
          pages={options}
        />
      </div>
      <button onClick={handleForfeit}>Forfeit</button>
      {gameResult && (
        <GameCompletedModal
          result={gameResult}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

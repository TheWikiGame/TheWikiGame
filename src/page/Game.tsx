import { Page } from "../model/page";
import { History } from "../component/History";
import { Options } from "../component/Options";

type GameProps = {} & React.ComponentProps<"div">;

// Temp
const start = {
  page: "Pet_door",
  title: "Pet door",
  href: "https://en.wikipedia.org/wiki/Pet_door",
} as Page;

const end = {
  page: "Black-throated_loon",
  title: "Black-throated loon",
  href: "https://en.wikipedia.org/wiki/Black-throated_loon",
} as Page;

export const Game = ({ className, ...props }: GameProps) => {
  return (
    <div className={`${className} h-screen`} {...props}>
      <h2 className={""}>
        From{" "}
        <a href={start.href} target="_blank">
          {start.title}
        </a>{" "}
        to{" "}
        <a href={end.href} target="_blank">
          {end.title}
        </a>
      </h2>
      <div className={`grid grid-cols-4 gap-4 h-full`}>
        <History className={"col-span-1"} pages={[]} />
        <Options className={"col-span-3"} pages={[]} />
      </div>
    </div>
  );
};

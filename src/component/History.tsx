import { Page } from "../model/Page";
import { PageHistory } from "./PageHistory";
import { PageLink } from "./PageLink";

type HistoryProps = {
  pages: Page[];
} & React.ComponentProps<"div">;

export const History = ({ className, pages, ...props }: HistoryProps) => {
  return (
    <div className={`${className}`} {...props}>
      <h2>History</h2>
      <PageHistory pages={pages} />
      {/* {pages.map((page) => (
        <PageLink key={page.page} page={page} />
      ))} */}
    </div>
  );
};

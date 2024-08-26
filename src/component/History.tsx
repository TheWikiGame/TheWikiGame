import { Page } from "../model/page";

type HistoryProps = {
  pages: Page[];
} & React.ComponentProps<"div">;

export const History = ({ className, pages, ...props }: HistoryProps) => {
  return (
    <div className={`${className}`} {...props}>
      <h2>History</h2>
      {pages.map((page) => (
        <a href={page.href}>{page.title}</a>
      ))}
    </div>
  );
};

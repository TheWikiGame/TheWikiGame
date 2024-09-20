import { useEffect, useState } from "react";
import { dataSourceController } from "../../data/DataSourceController";
import { Page } from "../../model/Page";
import { ToolTip } from "./ToolTip";

type InlinePageProps = {
  page: Page;
} & React.ComponentProps<"a">;

export const InlinePage = ({ className, page, ...props }: InlinePageProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const [summary, setSummary] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    if (summary.length > 0 || !isHovering) {
      return;
    }
    async function fetchSummaryData() {
      const thumbnail =
        await dataSourceController.getFirstImageOfArticleWithTitle(page.title);
      const summary =
        await dataSourceController.getFirstParagraphOfArticleWithTitle(
          page.page
        );
      return {
        thumbnail,
        summary,
      };
    }

    fetchSummaryData().then(({ thumbnail, summary }) => {
      console.log(thumbnail, summary);
      setSummary(summary);
      setThumbnail(thumbnail);
    });
  }, [isHovering, page, summary]);

  return (
    <span>
      <ToolTip
        thumbnail={thumbnail}
        summary={summary}
        active={isHovering && summary!.length > 0}
      />
      <a
        {...props}
        href={page.href}
        target="_blank"
        className={`${className} inline-flex w-fit text-[var(--text-secondary)] hover:text-[var(--text-secondary-hover)] hover:underline`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {page.title}
      </a>
    </span>
  );
};

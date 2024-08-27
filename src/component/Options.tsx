import { useCallback, useMemo, useState } from "react";
import { Page } from "../model/Page";
import Fuse from "fuse.js";
import { Input, PageFilter } from "./PageFilter";
import { PageLink } from "./PageLink";
import { InlinePage } from "./InlinePage";
import { PageLinkSkeletonGroup } from "./PageLinkSkeletonGroup";
import { PagePreview } from "./PagePreview";

type OptionsProps = {
  loading: boolean;
  currentPage: Page;
  pages: Page[];
  onSelect: (page: Page) => void;
} & Omit<React.ComponentProps<"div">, "onSelect">;

export const Options = ({
  className,
  loading,
  currentPage,
  pages,
  onSelect,
  ...props
}: OptionsProps) => {
  const [searchText, setSearchText] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(pages, {
        keys: ["title", "page"],
      }),
    [pages]
  );

  const filteredPages = useMemo(() => {
    return searchText
      ? fuse.search(searchText).map((result) => result.item)
      : pages;
  }, [fuse, searchText, pages]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const handleOptionSelected = useCallback(
    (page: Page) => {
      setSearchText("");
      onSelect(page);
    },
    [onSelect]
  );

  return (
    <div className={`${className}`} {...props}>
      <h2>
        Links from <InlinePage page={currentPage} />
      </h2>
      <PageFilter
        value={searchText}
        onChange={handleSearchChange}
        disabled={loading}
      />
      {loading ? (
        <PageLinkSkeletonGroup className={"flex flex-col space-y-2"} />
      ) : (
        <div className={"flex flex-col space-y-2"}>
          {filteredPages.map((page) => (
            <PageLink
              key={page.page}
              page={page}
              onClick={handleOptionSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};

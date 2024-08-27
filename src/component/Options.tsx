import { useCallback, useMemo, useState } from "react";
import { Page } from "../model/Page";
import Fuse from "fuse.js";
import { Input } from "./Input";
import { PageLink } from "./PageLink";
import { InlinePage } from "./InlinePage";

type OptionsProps = {
  currentPage: Page;
  pages: Page[];
  onSelect: (page: Page) => void;
} & Omit<React.ComponentProps<"div">, "onSelect">;

export const Options = ({
  className,
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

  return (
    <div className={`${className}`} {...props}>
      <h2>
        Links from <InlinePage page={currentPage} />
      </h2>
      <Input
        label={"Link filter"}
        id={"link-filter"}
        type="text"
        value={searchText}
        placeholder="Link"
        onChange={handleSearchChange}
      />
      <div className={"flex flex-col"}>
        {filteredPages.map((page) => (
          <PageLink key={page.page} page={page} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
};

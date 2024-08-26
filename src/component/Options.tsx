import { useCallback, useMemo, useState } from "react";
import { Page } from "../model/page";
import Fuse from "fuse.js";

type OptionsProps = {
  pages: Page[];
} & React.ComponentProps<"div">;
export const Options = ({ className, pages, ...props }: OptionsProps) => {
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
      <h2>Choices</h2>
      <input type="text" value={searchText} onChange={handleSearchChange} />
      <div className={"flex flex-col"}>
        {filteredPages.map((page) => (
          <a key={page.page} href={page.href}>
            {page.title}
          </a>
        ))}
      </div>
    </div>
  );
};

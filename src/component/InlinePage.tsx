import { Page } from "../model/Page";

type InlinePageProps = {
  page: Page;
} & React.ComponentProps<"a">;

export const InlinePage = ({ className, page, ...props }: InlinePageProps) => {
  return (
    <a
      {...props}
      href={page.href}
      target="_blank"
      className={`${className} inline-flex w-fit text-[var(--text-secondary)] hover:text-[var(--text-secondary-hover)] hover:underline`}
    >
      {page.title}
    </a>
  );
};

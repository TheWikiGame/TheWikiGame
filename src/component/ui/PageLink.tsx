import { Page } from "../model/Page";
import { ExternalLink } from "lucide-react";

type PageLinkProps = {
  page: Page;
  onClick?: (page: Page) => void;
} & Omit<React.ComponentProps<"div">, "onClick">;

export const PageLink = ({
  className,
  page,
  onClick,
  ...props
}: PageLinkProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }
    event.stopPropagation();
    onClick(page);
  };

  return (
    <div
      className={`flex items-center justify-between p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors duration-200 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="font-medium truncate">{page.title}</span>
      <a
        href={page.href}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-200"
        aria-label={`Open ${page.title} in new tab`}
      >
        <ExternalLink size={18} />
      </a>
    </div>
  );
};

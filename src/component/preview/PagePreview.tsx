import { Page } from "../../model/Page";

type PagePreviewProps = {
  page: Page;
} & React.ComponentProps<"div">;

export const PagePreview = ({
  className,
  page,
  ...props
}: PagePreviewProps) => {
  return (
    <div
      className={`w-full border border-[--var(--text-secondary)] ${className}`}
      {...props}
    >
      <iframe
        src={page.href}
        className="w-full h-full"
        title={page.title}
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
};

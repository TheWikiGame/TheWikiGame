type PageLinkSkeletonProps = {} & React.ComponentProps<"div">;

export const PageLinkSkeleton = ({
  className,
  ...props
}: PageLinkSkeletonProps) => {
  return (
    <div
      className={`flex h-12 items-center justify-between p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors duration-200 ${className}`}
      {...props}
    ></div>
  );
};

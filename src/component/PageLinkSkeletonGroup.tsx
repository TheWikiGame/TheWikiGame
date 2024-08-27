import { PageLinkSkeleton } from "./PageLinkSkeleton";

type PageLinkSkeletonGroupProps = {} & React.ComponentProps<"div">;

export const PageLinkSkeletonGroup = ({
  className,
  ...props
}: PageLinkSkeletonGroupProps) => {
  const num = Math.floor(Math.random() * 5 + 1);

  return (
    <div className={`${className}`} {...props}>
      {[...Array(num)].map((_, index) => (
        <PageLinkSkeleton
          key={index}
          className={`animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%]`}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: "1.25s",
          }}
        />
      ))}
    </div>
  );
};

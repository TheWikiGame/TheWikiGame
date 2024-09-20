import { useEffect, useState } from "react";

type ToolTipProps = {
  active: boolean;
  summary: string;
  thumbnail?: string;
} & React.ComponentProps<"div">;

export const ToolTip = ({
  className,
  active,
  summary,
  thumbnail,
  ...props
}: ToolTipProps) => {
  const [isOpen, setIsOpen] = useState(active);
  const summaryLength = 200;

  useEffect(() => {
    if (active) {
      setTimeout(() => setIsOpen(active), 500);
    } else {
      setIsOpen(active);
    }
  }, [active, setIsOpen]);

  return (
    <div className={`inline-block relative ${className}`} {...props}>
      {active && (
        <div
          className={`${
            isOpen ? "mt-2 opacity-100" : "mt-4 opacity-0"
          } transition-all duration-250 ease-in-out 
         flex flex-row justify-center
         fixed z-50 shadow-md
         border border-[var(--bg-secondary)] bg-[var(--bg-primary)] rounded-sm 
         max-w-sm max-h-60 overflow-hidden`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-left text-sm p-2">
              {summary.substring(0, summaryLength)}
              {summary.length > summaryLength ? "..." : ""}
            </p>
          </div>

          {thumbnail && (
            <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
              <img
                src={thumbnail}
                className="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

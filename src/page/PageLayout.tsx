import { ReactNode } from "react";

type PageLayoutProps = {
  header: string;
  content: ReactNode;
};

export const PageLayout = ({ header, content }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="w-full flex items-center justify-center">
        <h1>{header}</h1>
      </div>
      {content}
    </div>
  );
};

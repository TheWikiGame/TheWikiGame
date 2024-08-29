import React, { ReactNode } from "react";

type ContentItem = {
  href: string;
  title: string;
};

// Contents Component
type ContentsProps = {
  items: ContentItem[];
  title: string;
} & React.ComponentProps<"nav">;

const Contents = ({ className, items, title, ...props }: ContentsProps) => (
  <nav className={`text-left sticky top-4 ${className}`} {...props}>
    <h2 className="font-bold">{title}</h2>
    <hr className="mb-2" />
    <ul className="list-inside">
      {items.map(({ href, title }) => (
        <li key={title} className="mb-1 flex">
          <a href={href} className="text-blue-600 hover:underline">
            {title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

type Section = {
  title: string;
  content: ReactNode;
};

// Body Component
type BodyProps = {
  sections: Section[];
  details: InfoBoxProps;
};

const Body = ({ sections, details }: BodyProps) => (
  <main>
    <div>
      <InfoBox className="w-25 h-fit float-right" {...details} />
      {sections.map(({ title, content }) => (
        <div className="text-left">
          <h2 className="font-bold">{title}</h2>
          <hr />
          {content}
        </div>
      ))}
    </div>
  </main>
);

// Details Component
type InfoBoxProps = {
  title: string;
  sections: Section[];
} & React.ComponentProps<"aside">;

const InfoBox = ({ className, title, sections, ...props }: InfoBoxProps) => (
  <aside
    className={`m-4 text-left border border-[var(--bg-primary-hover)] ${className}`}
    {...props}
  >
    <h2 className="text-xl font-bold bg-gray-100 p-2 mb-2 text-center">
      {title}
    </h2>
    <div className="mx-4 mb-4">
      {sections.map(({ title, content }) => (
        <div>
          <h2>{title}</h2>
          <hr />
          {content}
        </div>
      ))}
    </div>
  </aside>
);

// PageLayout Component
type PageLayoutProps = {
  title: string;
  contentsTitle: string;
  contents: ContentsProps;
  body: BodyProps;
};

const PageLayout = ({
  title,
  contentsTitle,
  contents,
  body,
}: PageLayoutProps) => (
  <div className="grid grid-cols-12 gap-x-8 text-left">
    <div className="col-span-2 h-8 row-span-1"></div>
    <div className="col-span-10 h-8 row-span-1">
      <h1 className="font-bold text-2xl">{title}</h1>
      <hr />
    </div>
    <div className="col-span-2 row-span-3">
      <Contents title={contentsTitle} items={contents.items} />
    </div>
    <div className="col-span-10 h-8 row-span-1">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <div>abc</div>
          <div>xyz</div>
        </div>
        <div className="flex space-x-3">
          <div>abc</div>
          <div>xyz</div>
        </div>
      </div>
      <hr />
    </div>
    <div className="col-span-10 h-8 row-span-1 flex justify-between ">
      <div>From Wikipedia, the free encyclopedia</div>
      <div className="flex space-x-3">
        <div>abc</div>
        <div>xyz</div>
      </div>
    </div>
    <div className="col-span-10 row-span-1">
      <Body {...body} />
    </div>
  </div>
);

// export { PageLayout, Header, Contents, Body, Details };

const li1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const li2 =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

const TestPage = () => {
  const title = "The Wikipedia Game";
  const content = [
    { title: "Test 1", href: "#test1" },
    { title: "Test 2", href: "#test2" },
  ];
  const body = [
    {
      title: "Lorem Ipusm",
      content: (
        <p>
          {li1} {li2}
        </p>
      ),
    },
    { title: "Sed Ut", content: <p>{li2}</p> },
  ];

  const sections = [
    { title: "Lorem Ipusm", content: <p>{li1.substring(0, 50)}</p> },
    { title: "Sed Ut", content: <p>{li2.substring(0, 50)}</p> },
  ];

  return (
    <PageLayout
      contentsTitle="Contents"
      contents={{ title: "Test", items: content }}
      title={title}
      body={{
        sections: body,
        details: { title, sections },
      }}
    />
  );
};

export default TestPage;

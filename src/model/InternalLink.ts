type InternalLink = {
  ns: number;
  exists: string;
  "*": string;
};

type InternalLinksResponse = {
  parse: {
    title: string;
    links: Array<InternalLink>;
  };
};

export type { InternalLink, InternalLinksResponse };

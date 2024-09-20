type WikimediaExtractResponse = {
  query: {
    pages: {
      [pageId: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
        images?: Array<{
          ns: number;
          title: string;
        }>;
      };
    };
  };
};

export type { WikimediaExtractResponse };

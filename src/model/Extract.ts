type WikimediaExtractResponse = {
  query: {
    pages: {
      [pageId: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
      };
    };
  };
};

export type { WikimediaExtractResponse };

type RandomPageResponse = {
  query: {
    random: Array<RandomPage>;
  };
};

type RandomPage = {
  id: number;
  ns: number;
  title: string;
};

export type { RandomPage, RandomPageResponse };

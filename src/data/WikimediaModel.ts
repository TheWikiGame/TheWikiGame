type WikimediaApiParams = {
  action: string;
  [key: string]: string | number | boolean;
};

enum WikimediaApiAction {
  Parse = "parse",
  Query = "query",
}

enum WikimediaApiProp {
  Links = "links",
  Random = "random",
  Extracts = "extracts",
}

enum WikimediaApiResponseFormat {
  JSON = "json",
}

enum WikimediaNamespace {
  MainNamespace = 0,
}

export {
  WikimediaApiAction,
  WikimediaApiProp,
  WikimediaApiResponseFormat,
  WikimediaNamespace,
};

export type { WikimediaApiParams };

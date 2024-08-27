// Interface for common API parameters
type WikimediaApiParams = {
  action: string;
  [key: string]: string | number | boolean;
};

export type { WikimediaApiParams };

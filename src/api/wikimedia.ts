import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://en.wikipedia.org/w/api.php";
const ORIGIN_FOR_CORS_SUPPORT = "*";
const JSON_RESPONSE_FORMAT = "json";

const wikimediaApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    origin: ORIGIN_FOR_CORS_SUPPORT,
    format: JSON_RESPONSE_FORMAT,
  },
});

// Interface for common API parameters
interface WikimediaApiParams {
  action: string;
  [key: string]: string | number | boolean;
}

// Generic function to make Wikimedia API calls
async function makeWikimediaRequest<T>(params: WikimediaApiParams): Promise<T> {
  try {
    const response = await wikimediaApiClient.get("", { params });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

interface InternalLinksResponse {
  parse: {
    title: string;
    links: Array<{
      ns: number;
      exists: string;
      "*": string;
    }>;
  };
}

async function getInternalLinksFromBodyOfArticle(
  articleTitle: string
): Promise<string[]> {
  const params: WikimediaApiParams = {
    action: "parse",
    page: articleTitle,
    prop: "links",
    format: "json",
  };

  try {
    const response = await makeWikimediaRequest<InternalLinksResponse>(params);
    return filterLinksInResponseForNamespace(response);
  } catch (error) {
    console.error("Failed to fetch internal links:", error);
    throw new Error("Failed to fetch internal links");
  }
}

const MAIN_WIKIPEDIA_NAMESPACE = 0;

function filterLinksInResponseForNamespace(
  response: InternalLinksResponse,
  namespace: number = MAIN_WIKIPEDIA_NAMESPACE
): string[] {
  return response.parse.links
    .filter((link) => link.ns === namespace)
    .map((link) => link["*"]);
}

export { getInternalLinksFromBodyOfArticle, filterLinksInResponseForNamespace };

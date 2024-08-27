import axios, { AxiosInstance } from "axios";
import { Page } from "../model/page";

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

type InternalLink = {
  ns: number;
  exists: string;
  "*": string;
};

interface InternalLinksResponse {
  parse: {
    title: string;
    links: Array<InternalLink>;
  };
}

async function getPageTitlesOfInternalLinksFromBodyOfArticle(
  articleTitle: string
): Promise<string[]> {
  const retrieveInternalLinksParams: WikimediaApiParams = {
    action: "parse",
    page: articleTitle,
    prop: "links",
    format: "json",
  };

  try {
    const response = await makeWikimediaRequest<InternalLinksResponse>(
      retrieveInternalLinksParams
    );
    return filterLinksInResponseByNamespace(response);
  } catch (error) {
    console.error("Failed to fetch internal links:", error);
    throw new Error("Failed to fetch internal links");
  }
}

const MAIN_WIKIPEDIA_NAMESPACE = 0;
function filterLinksInResponseByNamespace(
  response: InternalLinksResponse,
  namespace: number = MAIN_WIKIPEDIA_NAMESPACE
): string[] {
  return response.parse.links
    .filter((link) => link.ns === namespace)
    .map((link) => link["*"]);
}

function listOfTitlesToListOfPages(titles: Array<string>): Array<Page> {
  return titles.map((title) => buildPageFromArticleTitle(title));
}

function buildPageFromArticleTitle(articleTitle: string): Page {
  return {
    title: articleTitle.replace(" ", "_"),
    page: articleTitle,
    href: `https://en.wikipedia.org/wiki/${articleTitle}`,
  };
}

async function getLinkedInternalPagesFromArticle(
  articleTitle: string
): Promise<Array<Page>> {
  let pageTitlesOfInternalLinks =
    await getPageTitlesOfInternalLinksFromBodyOfArticle(articleTitle);
  return listOfTitlesToListOfPages(pageTitlesOfInternalLinks);
}

export {
  getLinkedInternalPagesFromArticle,
  buildPageFromArticleTitle,
  filterLinksInResponseByNamespace,
  listOfTitlesToListOfPages,
};

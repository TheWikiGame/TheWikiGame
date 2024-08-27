import axios, { AxiosInstance } from "axios";
import { Page } from "../model/Page";
import { InternalLinksResponse } from "../model/InternalLink";
import { WikimediaApiParams } from "../model/Wikimedia";

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
    title: articleTitle,
    page: articleTitle,
    href: `https://en.wikipedia.org/wiki/${articleTitle}`,
  };
}

async function getLinkedInternalPagesFromArticleTitle(
  articleTitle: string
): Promise<Array<Page>> {
  const pageTitlesOfInternalLinks =
    await getPageTitlesOfInternalLinksFromBodyOfArticle(articleTitle);
  return listOfTitlesToListOfPages(pageTitlesOfInternalLinks);
}

async function getRandomPage(): Promise<Page> {
  // Placeholder
  return {
    page: "Cat",
    title: "Cat",
    href: "https://en.wikipedia.org/wiki/Cat",
  } as Page;
}

export { getLinkedInternalPagesFromArticleTitle, getRandomPage };

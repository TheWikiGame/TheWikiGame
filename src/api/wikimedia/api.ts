import axios, { AxiosInstance } from "axios";
import { Page } from "../../model/Page";
import { InternalLinksResponse } from "../../model/InternalLink";
import { WikimediaApiParams } from "../../model/Wikimedia";
import {
  WikimediaApiAction,
  WikimediaApiProp,
  WikimediaApiResponseFormat,
  WikimediaNamespace,
} from "./model";
import { RandomPageResponse } from "../../model/Random";

const BASE_WIKIMEDIA_API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const ORIGIN_FOR_CORS_SUPPORT = "*";

const wikimediaApiClient: AxiosInstance = axios.create({
  baseURL: BASE_WIKIMEDIA_API_ENDPOINT,
  params: {
    origin: ORIGIN_FOR_CORS_SUPPORT,
    format: WikimediaApiResponseFormat.JSON,
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
    action: WikimediaApiAction.Parse,
    page: articleTitle,
    prop: WikimediaApiProp.Links,
    format: WikimediaApiResponseFormat.JSON,
  };

  try {
    const response = await makeWikimediaRequest<InternalLinksResponse>(
      retrieveInternalLinksParams
    );
    return filterLinksInResponseByNamespace(
      response,
      WikimediaNamespace.MainNamespace
    );
  } catch (error) {
    console.error("Failed to fetch internal links:", error);
    throw new Error("Failed to fetch internal links");
  }
}

function filterLinksInResponseByNamespace(
  response: InternalLinksResponse,
  namespace: number
): string[] {
  return response.parse.links
    .filter((link) => link.ns === namespace)
    .map((link) => link["*"]);
}

function listOfTitlesToListOfPages(titles: Array<string>): Array<Page> {
  return titles.map((title) => buildPageFromArticleTitle(title));
}

function buildPageFromArticleTitle(articleTitle: string): Page {
  let wikipediaArticleUrlPrefix = "https://en.wikipedia.org/wiki/";
  return {
    title: articleTitle,
    page: articleTitle,
    href: `${wikipediaArticleUrlPrefix}${articleTitle.replace(" ", "_")}`,
  } as Page;
}

async function getLinkedInternalPagesFromArticleTitle(
  articleTitle: string
): Promise<Array<Page>> {
  const pageTitlesOfInternalLinks =
    await getPageTitlesOfInternalLinksFromBodyOfArticle(articleTitle);
  return listOfTitlesToListOfPages(pageTitlesOfInternalLinks);
}

async function retrieveRandomWikipediaArticles(count: number): Promise<Page[]> {
  if (count < 1) return [];

  const retrieveRandomWikipediaArticleParams: WikimediaApiParams = {
    action: WikimediaApiAction.Query,
    list: WikimediaApiProp.Random,
    rnnamespace: WikimediaNamespace.MainNamespace,
    rnlimit: count.toString(),
  };

  try {
    const response = await makeWikimediaRequest<RandomPageResponse>(
      retrieveRandomWikipediaArticleParams
    );
    return response.query.random.map((page) =>
      buildPageFromArticleTitle(page.title)
    );
  } catch (error) {
    console.error("Failed to fetch random pages:", error);
    throw new Error("Failed to fetch random pages");
  }
}

export {
  getLinkedInternalPagesFromArticleTitle,
  retrieveRandomWikipediaArticles,
};

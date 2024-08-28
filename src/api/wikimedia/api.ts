import axios, { AxiosInstance } from "axios";
import { Page } from "../../model/Page";
import { InternalLinksResponse } from "../../model/InternalLink";
import {
  WikimediaApiAction,
  WikimediaApiParams,
  WikimediaApiProp,
  WikimediaApiResponseFormat,
  WikimediaNamespace,
} from "./model";
import { RandomPageResponse } from "../../model/Random";
import { logger } from "../../util/Logger";
import { WikimediaExtractResponse } from "../../model/Extract";

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
  emitDebugLogsForWikimediaRequest(params);
  try {
    const response = await wikimediaApiClient.get("", { params });
    return response.data;
  } catch (error) {
    logger.error("API call failed:", error);
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
    logger.error("Failed to fetch internal links:", error);
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

function emitDebugLogsForWikimediaRequest(params: WikimediaApiParams) {
  logger.debug(`makeWikimediaRequest ${JSON.stringify(params, null, 2)}`);
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
    logger.error("Failed to fetch random pages:", error);
    throw new Error("Failed to fetch random pages");
  }
}

async function getFirstParagraphOfArticleWithTitle(
  articleTitle: string
): Promise<string> {
  const retrievePlaintextFirstParagraphParams: WikimediaApiParams = {
    action: WikimediaApiAction.Query,
    prop: WikimediaApiProp.Extracts,
    exintro: true,
    exlimit: 1, // Querying for the first paragraph of one article, only need one extract
    titles: articleTitle,
    format: WikimediaApiResponseFormat.JSON,
    explaintext: true, // "ex[cerpt]Plaintext"; We want plaintext, not HTML
  };

  try {
    const response = await makeWikimediaRequest<WikimediaExtractResponse>(
      retrievePlaintextFirstParagraphParams
    );
    const pages = response.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].extract;
  } catch (error) {
    logger.error("Failed to fetch article abstract:", error);
    return "";
  }
}

export {
  getLinkedInternalPagesFromArticleTitle,
  retrieveRandomWikipediaArticles,
  getFirstParagraphOfArticleWithTitle,
};

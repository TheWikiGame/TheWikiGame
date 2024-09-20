import { listOfTitlesToListOfPages, Page } from "../model/Page";
import { logger } from "../util/Logger";
import { WikiGameDataSource } from "./WikiGameDataSource";

class MockedDataSource implements WikiGameDataSource {
  async getLinkedInternalPagesFromArticleTitle(
    articleTitle: string
  ): Promise<Array<Page>> {
    logger.debug(
      `Mocking getLinkedInternalPagesFromArticleTitle for ${articleTitle}`
    );
    const articleSet = new Set(this.mockArticleTitles);
    articleSet.delete(articleTitle);
    return listOfTitlesToListOfPages(Array.from(articleSet));
  }

  async retrieveRandomWikipediaArticles(count: number): Promise<Page[]> {
    const shuffledTitles = [...this.mockArticleTitles].sort(
      () => 0.5 - Math.random()
    );
    const slicedTitles = shuffledTitles.slice(0, count);
    return listOfTitlesToListOfPages(slicedTitles);
  }

  async getFirstParagraphOfArticleWithTitle(
    articleTitle: string
  ): Promise<string> {
    return `This is a mock first paragraph for the article "${articleTitle}".`;
  }

  async getFirstImageOfArticleWithTitle(articleTitle: string): Promise<string> {
    logger.debug(
      `Mocking getThumbnailImageOfArticleWithTitle for ${articleTitle}`
    );
    return "";
  }

  private mockArticleTitles: string[] = [
    "Mock Page 1",
    "Mock Page 2",
    "Mock Page 3",
    "Mock Page 4",
    "Mock Page 5",
  ];
}

export const mockedDataSource = new MockedDataSource();

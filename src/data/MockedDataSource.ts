import { listOfTitlesToListOfPages, Page } from "../model/Page";
import { WikiGameDataSource } from "./WikiGameDataSource";

class MockedDataSource implements WikiGameDataSource {
  async getLinkedInternalPagesFromArticleTitle(
    articleTitle: string
  ): Promise<Array<Page>> {
    return listOfTitlesToListOfPages([...this.mockArticleTitles, articleTitle]);
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

  private mockArticleTitles: string[] = [
    "Mock Page 1",
    "Mock Page 2",
    "Mock Page 3",
    "Mock Page 4",
    "Mock Page 5",
  ];
}

export const mockedDataSource = new MockedDataSource();

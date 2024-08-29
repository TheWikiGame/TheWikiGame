import { listOfTitlesToListOfPages, Page } from "../model/Page";
import { WikiGameDataSource } from "./WikiGameDataSource";

class MockedDataSource implements WikiGameDataSource {
  async getLinkedInternalPagesFromArticleTitle(
    articleTitle: string
  ): Promise<Array<Page>> {
    const titles = this.mockPages.map((page) => page.title);
    return listOfTitlesToListOfPages([...titles, articleTitle]);
  }

  async retrieveRandomWikipediaArticles(count: number): Promise<Page[]> {
    const shuffled = [...this.mockPages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async getFirstParagraphOfArticleWithTitle(
    articleTitle: string
  ): Promise<string> {
    return `This is a mock first paragraph for the article "${articleTitle}".`;
  }

  private mockPages: Page[] = [
    {
      title: "Mock Page 1",
      page: "Mock_Page_1",
      href: "https://en.wikipedia.org/wiki/Mock_Page_1",
    },
    {
      title: "Mock Page 2",
      page: "Mock_Page_2",
      href: "https://en.wikipedia.org/wiki/Mock_Page_2",
    },
    {
      title: "Mock Page 3",
      page: "Mock_Page_3",
      href: "https://en.wikipedia.org/wiki/Mock_Page_3",
    },
    {
      title: "Mock Page 4",
      page: "Mock_Page_4",
      href: "https://en.wikipedia.org/wiki/Mock_Page_4",
    },
    {
      title: "Mock Page 5",
      page: "Mock_Page_5",
      href: "https://en.wikipedia.org/wiki/Mock_Page_5",
    },
  ];
}

export const mockedDataSource = new MockedDataSource();

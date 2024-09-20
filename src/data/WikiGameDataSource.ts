import { Page } from "../model/Page";

export interface WikiGameDataSource {
  getLinkedInternalPagesFromArticleTitle(
    articleTitle: string
  ): Promise<Array<Page>>;
  retrieveRandomWikipediaArticles(count: number): Promise<Page[]>;
  getFirstParagraphOfArticleWithTitle(articleTitle: string): Promise<string>;
  getFirstImageOfArticleWithTitle(articleTitle: string): Promise<string>;
}

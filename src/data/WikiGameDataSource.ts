import { Page } from "../model/Page";

export interface WikiGameDataSource {
  getLinkedInternalPagesFromArticleTitle(
    articleTitle: string
  ): Promise<Array<Page>>;
  retrieveRandomWikipediaArticles(count: number): Promise<Page[]>;
}

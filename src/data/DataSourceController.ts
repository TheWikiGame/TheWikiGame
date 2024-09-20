import { logger } from "../util/Logger";
import { mockedDataSource } from "./MockedDataSource";
import { WikiGameDataSource } from "./WikiGameDataSource";
import { wikimediaDataSource } from "./WikimediaDataSource";

class DataSourceController {
  private currentDataSource: WikiGameDataSource;

  constructor() {
    this.currentDataSource = this.selectDataSource();
  }

  async getLinkedInternalPagesFromArticleTitle(articleTitle: string) {
    return this.currentDataSource.getLinkedInternalPagesFromArticleTitle(
      articleTitle
    );
  }

  async retrieveRandomWikipediaArticles(count: number) {
    return this.currentDataSource.retrieveRandomWikipediaArticles(count);
  }

  async getFirstParagraphOfArticleWithTitle(articleTitle: string) {
    return this.currentDataSource.getFirstParagraphOfArticleWithTitle(
      articleTitle
    );
  }

  async getFirstImageOfArticleWithTitle(articleTitle: string) {
    return this.currentDataSource.getFirstImageOfArticleWithTitle(articleTitle);
  }

  private selectDataSource(): WikiGameDataSource {
    const isOnline = navigator.onLine;
    logger.debug(
      `Selecting datasource implementation :: isOnline? ${isOnline}`
    );
    return isOnline ? wikimediaDataSource : mockedDataSource;
  }
}

export const dataSourceController = new DataSourceController();

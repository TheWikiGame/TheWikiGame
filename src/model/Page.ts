type Page = {
  title: string;
  page: string;
  href: string;
};

function listOfTitlesToListOfPages(titles: Array<string>): Array<Page> {
  return titles.map((title) => buildPageFromArticleTitle(title));
}

function buildPageFromArticleTitle(articleTitle: string): Page {
  const wikipediaArticleUrlPrefix = "https://en.wikipedia.org/wiki/";
  const pageName = articleTitle.replace(" ", "_");
  return {
    title: articleTitle,
    page: pageName,
    href: wikipediaArticleUrlPrefix + pageName,
  } as Page;
}

export type { Page };
export { listOfTitlesToListOfPages, buildPageFromArticleTitle };

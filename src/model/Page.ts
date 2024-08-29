type Page = {
  title: string;
  page: string;
  href: string;
};

function listOfTitlesToListOfPages(titles: Array<string>): Array<Page> {
  return titles.map((title) => buildPageFromArticleTitle(title));
}

function buildPageFromArticleTitle(articleTitle: string): Page {
  let wikipediaArticleUrlPrefix = "https://en.wikipedia.org/wiki/";
  let pageName = articleTitle.replace(" ", "_");
  return {
    title: articleTitle,
    page: pageName,
    href: wikipediaArticleUrlPrefix + pageName,
  } as Page;
}

export type { Page };
export { listOfTitlesToListOfPages, buildPageFromArticleTitle };

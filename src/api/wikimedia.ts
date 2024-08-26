import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://en.wikipedia.org/w/api.php";

const wikimediaApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    origin: "*", // Required for CORS support
    format: "json", // We want the API to return JSON
  },
});

// Interface for common API parameters
interface WikimediaApiParams {
  action: string;
  [key: string]: string | number | boolean;
}

// Generic function to make API calls
async function makeApiCall<T>(params: WikimediaApiParams): Promise<T> {
  try {
    const response = await wikimediaApiClient.get("", { params });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

interface InternalLinksResponse {
  parse: {
    title: string;
    links: Array<{
      ns: number;
      exists: string;
      "*": string;
    }>;
  };
}

// API call function to get internal links of an article
async function getInternalLinks(title: string): Promise<string[]> {
  const params: WikimediaApiParams = {
    action: "parse",
    page: title,
    prop: "links",
    format: "json",
  };

  try {
    const response = await makeApiCall<InternalLinksResponse>(params);

    // Filter links to keep only internal Wikipedia article links (namespace 0)
    const internalLinks = response.parse.links
      .filter((link) => link.ns === 0)
      .map((link) => link["*"]);

    return internalLinks;
  } catch (error) {
    console.error("Failed to fetch internal links:", error);
    throw new Error("Failed to fetch internal links");
  }
}

export { getInternalLinks };

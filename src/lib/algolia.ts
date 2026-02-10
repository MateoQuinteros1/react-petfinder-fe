import { algoliasearch } from "algoliasearch";

export const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY,
);

export const indexName = "pets";

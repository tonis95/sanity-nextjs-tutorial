import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "8lt3hb7n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
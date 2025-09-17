import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const EVENTS_Query = `*[
  _type == "event"
  && defined(slug.current)
  ]{_id, name, slug, eventType}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const events = await client.fetch<SanityDocument[]>(EVENTS_Query, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="text-4xl font-bold mb-8">Events</h3>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2 m-4">
        {events.map((event) => (
          <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20" key={event._id}>
            <Link className="hover:underline block" href={`/${event.slug.current}`}>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                {event.name}
              </h4>
              <p className="text-m font-semibold text-gray-900 dark:text-white">
                {event.eventType}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
import { posts } from "@/.velite";
import { notFound } from "next/navigation";
import { MDXContent } from "../../../components/mdx-content";
import Link from "next/link";
interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug.replace("posts/", "") }));
}
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === `posts/${slug}`);
  if (!post) notFound();
  const sortedPosts = [...posts].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const nextPost =
    sortedPosts.length > 1
      ? sortedPosts[(currentIndex + 1) % sortedPosts.length]
      : undefined;
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(post.date));
  return (
    <main id="main-content" className="reading-shell">
      <Link href="/" className="pill">
        <span aria-hidden="true">←</span> Back home
      </Link>
      <article>
        <header className="reading-header">
          <time dateTime={post.date}>{date}</time>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        <div className="prose">
          <MDXContent code={post.body} />
        </div>
      </article>
      <nav className="reading-nav" aria-label="Post navigation">
        <Link href="/" className="pill">
          Home
        </Link>
        {nextPost ? (
          <Link href={`/${nextPost.slug}`} className="pill">
            Next post <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}

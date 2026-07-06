import { posts } from "@/.velite";
import { notFound } from "next/navigation";
import { MDXContent } from "../../../components/mdx-content";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug.replace("posts/", ""),
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === `posts/${slug}`);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  // Sort posts by date descending to find the next chronological post
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === `posts/${slug}`);
  const nextPost = sortedPosts[(currentIndex + 1) % sortedPosts.length];
  const nextPostHref = `/${nextPost.slug}`;

  return (
    <div className="bg-white text-black min-h-screen font-serif flex items-center justify-center p-4">
      {/* Main card box: covers 90vh on desktop, full screen minus margins (m-4) on mobile */}
      <main className="w-full max-w-2xl border border-gray-200 h-[calc(100vh-2rem)] md:h-[90vh] flex flex-col justify-between bg-white relative">
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Back to home link - visible on desktop only */}
          <div className="hidden md:block mb-6">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              ← Back to home
            </Link>
          </div>

          <article>
            <header className="mb-6 pb-6 border-b border-gray-100">
              <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
              <h1 className="text-3xl font-bold mt-1 text-black">{post.title}</h1>
              <p className="text-md text-gray-600 mt-2 italic">{post.excerpt}</p>
            </header>

            <div className="prose prose-sm text-gray-800 leading-relaxed">
              <MDXContent code={post.body} />
            </div>
          </article>
        </div>

        {/* Footer Navigation Bar: aligned at the bottom inside the border box - visible on mobile only */}
        <footer className="border-t border-gray-200 bg-white grid grid-cols-2 divide-x divide-gray-200 text-center text-sm font-medium select-none md:hidden">
          <Link
            href="/"
            className="py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href={nextPostHref}
            className="py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            next
          </Link>
        </footer>
      </main>
    </div>
  );
}

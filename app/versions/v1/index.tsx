import { data } from "../../portfolio-data";
import { posts, Post } from "@/.velite";
import Link from "next/link";

// 1. Reusable Avatar Component
const Avatar = ({ avatar, name }: { avatar: string; name: string }) => {
  const sizeClass = "h-12 w-12 border border-gray-200 ";
  if (avatar.startsWith("/") || avatar.startsWith("http") || avatar.startsWith("data:")) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClass} object-cover`}
      />
    );
  }
  return (
    <div className={`${sizeClass} flex items-center justify-center text-2xl bg-gray-50`}>
      {avatar}
    </div>
  );
};

// 2. Reusable App Grid Component
const AppGrid = ({ apps, isMobile = false }: { apps: typeof data.apps; isMobile?: boolean }) => (
  <div className="grid grid-cols-3 gap-2 p-2">
    {apps.map((app, index) => (
      <a
        key={`${app.name}-${isMobile ? "mobile-" : ""}${index}`}
        href={app.url}
        className="aspect-square flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors"
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-12 h-12 object-contain"
        />
        <span className="mt-2 text-xs text-gray-500 text-center">
          {app.name}
        </span>
      </a>
    ))}
  </div>
);

// 3. Reusable Post List Component
const PostList = ({
  posts,
  formatDate,
  isMobile = false,
}: {
  posts: Post[];
  formatDate: (dateStr: string) => string;
  isMobile?: boolean;
}) => (
  <div className={`space-y-1 ${isMobile ? "p-2" : "p-1 overflow-y-auto"}`}>
    {posts.map((post) => (
      <Link key={post.slug} href={`/${post.slug}`} className="block group">
        <article className={isMobile ? "pb-3 last:pb-0" : "p-1 rounded hover:bg-gray-50 transition-colors"}>
          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
          <h3 className="font-semibold text-black mt-0.5 group-hover:underline">
            {post.title}
          </h3>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
            {post.excerpt}
          </p>
        </article>
      </Link>
    ))}
  </div>
);

export default function HomeV1() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  // Sort posts by date descending
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white text-black min-h-screen font-serif flex items-center justify-center p-4">
      
      {/* Web Layout (Desktop / Tablet) */}
      <div className="hidden md:flex min-h-[500px] w-full max-w-5xl border border-gray-200">
        
        {/* Profile Sidebar */}
        <aside className="flex w-64 flex-col justify-between border-r border-gray-200">
          <div>
            <header className="p-4">
              <div className="flex items-center gap-3">
                <Avatar avatar={data.info.avatar} name={data.info.name} />
                <div>
                  <h1 className="text-xl font-bold text-black">
                    {data.info.name}
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {data.info.bio}
              </p>
            </header>
          </div>

          <nav className="mt-auto">
            {data.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="flex items-center text-sm justify-between p-2 border-t border-gray-200 text-black hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <span>→</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Apps Column */}
        <section className="flex-1 border-r border-gray-200 flex flex-col">
          <header className="border-b border-gray-200 p-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              Apps
            </h2>
          </header>
          <AppGrid apps={data.apps} />
        </section>

        {/* Posts Column */}
        <section className="flex-1 flex flex-col">
          <header className="border-b border-gray-200 p-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              Posts
            </h2>
          </header>
          <PostList posts={sortedPosts} formatDate={formatDate} />
        </section>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full max-w-md border border-gray-200 min-h-[600px] flex flex-col bg-white relative">
        <main className="flex-1 flex flex-col">
          
          {/* Profile Section */}
          <section className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex items-center gap-4 p-4">
              <Avatar avatar={data.info.avatar} name={data.info.name} />
              <div>
                <h1 className="text-xl font-bold text-black">
                  {data.info.name}
                </h1>
              </div>
            </div>
            <p className="p-4 pt-0 text-sm text-gray-600 leading-relaxed">
              {data.info.bio}
            </p>
          </section>

          {/* Apps Section */}
          <section className="border-b border-gray-200">
            <header className="border-b border-gray-200 p-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                APPS
              </h2>
            </header>
            <AppGrid apps={data.apps} isMobile />
          </section>

          {/* Posts Section */}
          <section className="flex-1">
            <header className="border-b border-gray-200 p-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                POSTS
              </h2>
            </header>
            <PostList posts={sortedPosts} formatDate={formatDate} isMobile />
          </section>

          {/* Links Footer (Sticky inside the mobile container border box) */}
          <footer className="sticky bottom-0 border-t border-gray-200 bg-white grid grid-cols-3 divide-x divide-gray-200 text-center z-10">
            {data.links.map((link) => (
              <a
                key={`${link.name}-mobile`}
                href={link.url}
                className="p-3 text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </footer>
        </main>
      </div>

    </div>
  );
}

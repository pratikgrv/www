import Image from "next/image";
import Link from "next/link";
import { posts } from "@/.velite";
import { data } from "../../portfolio-data";
import { SocialIcon } from "@/components/social-icon";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function HomeV1() {
  const sortedPosts = [...posts].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
  return (
    <main id="main-content" className="portfolio-shell">
      <header className="profile">
        <div className="profile-heading">
          {data.info.avatar.startsWith("/") ? (
            <Image
              src={data.info.avatar}
              alt={data.info.name}
              width={64}
              height={64}
              priority
              className="avatar"
            />
          ) : (
            <span className="avatar avatar-fallback">{data.info.avatar}</span>
          )}
          <div>
            <h1>{data.info.name}</h1>
            <p className="bio">{data.info.bio}</p>
          </div>
        </div>
        <nav aria-label="Social links" className="social-links">
          {data.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className={`pill social-pill ${link.url.startsWith("mailto:") ? "pill-primary" : ""}`}
              title={link.label}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              <SocialIcon name={link.name} />
              <span>{link.label}</span>
              {link.url.startsWith("http") ? (
                <span className="sr-only"> (opens in a new tab)</span>
              ) : null}
            </a>
          ))}
        </nav>
      </header>
      <section aria-labelledby="apps-heading" className="portfolio-section">
        <h2 id="apps-heading" className="section-heading">
          Apps
        </h2>
        <div className="apps-grid">
          {data.apps.map((app) => {
            const content = (
              <>
                <div className="app-inset">
                  <Image
                    src={app.icon}
                    alt=""
                    width={72}
                    height={72}
                    className="app-icon"
                  />
                </div>
                <div className="app-caption">
                  <h3>{app.name}</h3>
                  <span aria-hidden="true">{app.url === "#" ? "" : "↗"}</span>
                </div>
              </>
            );
            return app.url === "#" ? (
              <article key={app.name} className="app-card">
                {content}
              </article>
            ) : (
              <a
                key={app.name}
                className="app-card app-card-link"
                href={app.url}
                target={app.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  app.url.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {content}
                {app.url.startsWith("http") ? (
                  <span className="sr-only">Opens in a new tab</span>
                ) : null}
              </a>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="posts-heading" className="portfolio-section">
        <h2 id="posts-heading" className="section-heading">
          Posts
        </h2>
        <div className="post-list">
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="post-row">
              <article>
                <time dateTime={post.date}>
                  {dateFormatter.format(new Date(post.date))}
                </time>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </article>
              <span className="post-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

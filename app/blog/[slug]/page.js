import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getBlogBySlug, getBlogs } from "../../lib/blogs";

export async function generateStaticParams() {
  const blogs = getBlogs();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#18251f]">
      <article>
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#dce5dc] bg-white px-4 py-2 text-sm font-semibold text-[#315f49] transition-colors hover:border-[#467461] hover:text-[#e36243]"
          >
            <span aria-hidden="true">←</span>
            Back to journal
          </Link>

          <div className="mt-7 overflow-hidden rounded-3xl border border-[#dce5dc] bg-white shadow-[0_12px_36px_rgba(24,37,31,0.07)]">
            {blog.featuredImage ? (
              <div className="overflow-hidden bg-[#e4eee5]">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={1200}
                  height={630}
                  priority
                  sizes="(max-width: 1279px) 100vw, 1280px"
                  className="block h-auto w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-3 bg-[#e36243]" />
            )}

            <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              {blog.tags?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d9e7dc] bg-[#eaf2e9] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#315f49]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="mb-5 inline-flex rounded-full bg-[#e5f1e8] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#315f49]">
                {blog.category}
              </p>

              <h1 className="max-w-5xl font-serif text-4xl font-bold leading-[1.06] text-[#18251f] sm:text-5xl md:text-6xl">
                {blog.title}
              </h1>

              <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-[#65766c]">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>

              {blog.excerpt && (
                <p className="mt-6 max-w-3xl border-l-4 border-[#e36243] pl-5 text-lg leading-8 text-[#53645b] sm:text-xl">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_250px] md:gap-8 lg:px-12">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#e1e8e1] bg-white px-6 py-8 shadow-[0_5px_20px_rgba(24,37,31,0.04)] sm:px-10 sm:py-12">
            <div
              className="wp-content text-base leading-8 text-[#53645b]"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>

          <aside className="h-fit rounded-2xl border border-[#d9e7dc] bg-[#eaf2e9] p-6 md:sticky md:top-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#53645b]">
              Published
            </p>

            <p className="mt-2 font-serif text-xl font-bold text-[#18251f]">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>

            <div className="my-5 border-t border-[#c7d9ca]" />

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#53645b]">
              Filed under
            </p>

            <p className="mt-2 font-semibold text-[#315f49]">
              {blog.category}
            </p>

            <Link
              href="/blog"
              className="mt-7 inline-flex items-center text-sm font-bold text-[#315f49] hover:text-[#e36243]"
            >
              More stories
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
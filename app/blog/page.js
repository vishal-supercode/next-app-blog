import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "../lib/wordpress";
import {
  formatPostDate,
  getBlogTags,
  getFeaturedImage,
  getPostCategory,
  stripHtml,
} from "../lib/wordpress-utils";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#18251f]">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:px-12">
        <h1 className="font-serif text-5xl font-bold sm:text-6xl">Our Blog</h1>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        {blogs.length > 0 ? (
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const image = getFeaturedImage(blog);
              const title = stripHtml(blog.title.rendered);
              const tags = getBlogTags(blog);

              return (
                <article key={blog.id} className="h-full">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce5dc] bg-white shadow-[0_5px_20px_rgba(24,37,31,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(24,37,31,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e36243]"
                  >
                    <div className="relative shrink-0 overflow-hidden bg-[#e4eee5]">
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
                          unoptimized
                          width={1200}
                          height={630}
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"
                          className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex aspect-[1.42] items-center justify-center font-serif text-2xl text-[#467461]">
                          Blog
                        </div>
                      )}
                      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-[#f7f7f2]/95 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#18251f]">
                        {getPostCategory(blog)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <time className="min-h-4 font-mono text-[11px] uppercase tracking-wider text-[#738078]">
                        {formatPostDate(blog.date)}
                      </time>
                      <h2
                        className="mt-3 line-clamp-2 min-h-14 font-serif text-2xl font-bold leading-tight text-[#18251f] transition-colors group-hover:text-[#467461]"
                        dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
                      />
                      <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-[#53645b]">
                        {stripHtml(blog.excerpt.rendered)}
                      </p>
                      {tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2" aria-label="Blog tags">
                          {tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="rounded-full border border-[#d9e7dc] bg-[#eaf2e9] px-3 py-1 font-mono text-[10px] font-semibold text-[#315f49]"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#315f49]">
                        Read article
                        <span
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="py-10 text-[#53645b]">
            No blog posts have been published yet.
          </p>
        )}
      </section>
    </main>
  );
}

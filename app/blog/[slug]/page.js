import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "../../lib/wordpress";
import { getBlogTags, getFeaturedImage, getPostCategory, formatPostDate, stripHtml } from "../../lib/wordpress-utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title.rendered,
    description: stripHtml(post.excerpt?.rendered || post.acf?.intro || ""),
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    notFound();
  }

  const acf = post.acf || {};
  const sections = Array.isArray(acf.sections) ? acf.sections : [];
  const tags = getBlogTags(post);

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
            {getFeaturedImage(post) ? (
              <div className="overflow-hidden bg-[#e4eee5]">
                <Image
                  src={getFeaturedImage(post)}
                  alt={stripHtml(post.title.rendered)}
                  unoptimized
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
              {tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2" aria-label="Blog tags">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border border-[#d9e7dc] bg-[#eaf2e9] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#315f49]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              <p className="mb-5 inline-flex rounded-full bg-[#e5f1e8] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#315f49]">
                {getPostCategory(post)}
              </p>
              <h1
                className="max-w-5xl font-serif text-4xl font-bold leading-[1.06] text-[#18251f] sm:text-5xl md:text-6xl"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#65766c]">
                <span>{formatPostDate(post.date)}</span>
              </div>
              {post.excerpt?.rendered && (
                <p className="mt-6 max-w-3xl border-l-4 border-[#e36243] pl-5 text-lg leading-8 text-[#53645b] sm:text-xl">
                  {stripHtml(post.excerpt.rendered)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_250px] md:gap-8 lg:px-12">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#e1e8e1] bg-white px-6 py-8 shadow-[0_5px_20px_rgba(24,37,31,0.04)] sm:px-10 sm:py-12">
            {acf.intro && (
              <p className="mb-10 font-serif text-2xl leading-relaxed text-[#34483d] sm:text-3xl">
                {acf.intro}
              </p>
            )}

            {sections.length > 0 ? (
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <section key={`${index}-${section.heading || "section"}`}>
                    {section.heading && (
                      <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-[#18251f] sm:text-3xl">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs && (
                      <div
                        className="wp-content text-base leading-8 text-[#53645b]"
                        dangerouslySetInnerHTML={{ __html: section.paragraphs }}
                      />
                    )}
                  </section>
                ))}
              </div>
            ) : post.content?.rendered ? (
              <div
                className="wp-content text-base leading-8 text-[#53645b]"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            ) : null}
          </div>
          <aside className="h-fit rounded-2xl border border-[#d9e7dc] bg-[#eaf2e9] p-6 md:sticky md:top-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#53645b]">Published</p>
            <p className="mt-2 font-serif text-xl font-bold text-[#18251f]">{formatPostDate(post.date)}</p>
            <div className="my-5 border-t border-[#c7d9ca]" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#53645b]">Filed under</p>
            <p className="mt-2 font-semibold text-[#315f49]">{getPostCategory(post)}</p>
            <Link href="/blog" className="mt-7 inline-flex items-center text-sm font-bold text-[#315f49] hover:text-[#e36243]">
              More stories <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
export function getFeaturedImage(post) {
  return (
    post.featured_image_url ??
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url ?? null
  );
}

export function getPostCategory(post) {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const category = terms.find(
    (term) => term.taxonomy === "category" || term.taxonomy?.endsWith("-category")
  );
  return category?.name ?? "Blog";
}

export function getBlogTags(blog) {
  const terms = blog._embedded?.["wp:term"]?.flat() ?? [];
  return terms.filter((term) => term.taxonomy === "blog-tag");
}

export function formatPostDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}
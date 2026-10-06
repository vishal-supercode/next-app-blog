import blogs from "../../data/blog.json";

export function getBlogs() {
  return blogs;
}

export function getBlogBySlug(slug) {
  return blogs.find((blog) => blog.slug === slug) ?? null;
}
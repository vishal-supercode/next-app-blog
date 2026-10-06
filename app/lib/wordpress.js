const API_URL = process.env.WORDPRESS_API_URL;

export async function getBlogs() {
  const response = await fetch(
    `${API_URL}/wp/v2/blog?_embed`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress blogs");
  }
  return response.json();
}

export async function getBlogBySlug(slug) {
  const response = await fetch(
    `${API_URL}/wp/v2/blog?slug=${encodeURIComponent(slug)}&_embed`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch WordPress blog");
  }
  const blogs = await response.json();
  return blogs[0] ?? null;
}
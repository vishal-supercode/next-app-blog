import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f2] px-5 text-[#18251f]">
      <section className="w-full max-w-3xl text-center">
        <Link
          href="/blog"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#315f49] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#e36243] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e36243]"
        >
          View blogs
        </Link>
      </section>
    </main>
  );
}

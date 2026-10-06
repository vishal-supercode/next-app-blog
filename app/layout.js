import "./globals.css";

export const metadata = {
  title: "goodgoods Journal | Notes on modern commerce",
  description: "Practical perspectives on shopping, selling, and growing a little better.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

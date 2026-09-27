import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="mt-2 text-ink/60">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block text-pine hover:underline">
        Back to shop
      </Link>
    </div>
  );
}

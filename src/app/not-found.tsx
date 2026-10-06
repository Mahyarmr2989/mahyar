import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-cc flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-serif text-section text-charcoal">Page not found</h1>
      <p className="mt-3 text-[15px] text-charcoal-muted">The page you are looking for has moved or no longer exists.</p>
      <Link href="/" className="btn-outline mt-8 inline-flex">Back to home</Link>
    </section>
  );
}

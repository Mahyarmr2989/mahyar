import Link from 'next/link';
import { User } from 'lucide-react';

export const metadata = { title: 'Account — CarryClub' };

export default function AccountPage() {
  return (
    <section className="container-cc py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-sage-200 text-sage-600">
        <User size={26} strokeWidth={1.4} />
      </div>
      <h1 className="mt-6 font-serif text-section text-charcoal">My Account</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal-muted">
        Sign in to track orders, save your wishlist and check out faster. Account features are coming soon.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/shop" className="btn-outline">Browse the shop</Link>
      </div>
    </section>
  );
}

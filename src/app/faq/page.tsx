import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'FAQ — CarryClub' };

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Orders are processed within 1–2 business days. Standard delivery takes 3–5 business days; express options are available at checkout.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes — standard shipping is free on all orders over $75. Orders below that threshold incur a flat $8 fee.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of delivery on unworn items in their original packaging. Return shipping is complimentary on orders over $150.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you will receive an email with a tracking link. You can also reach out to our customer care team at any time.',
  },
  {
    q: 'Which size should I choose?',
    a: 'Most bags come in a single “One Size”. For totes and travel bags that offer size variants, refer to the dimensions listed in the product features. If unsure, our team is happy to advise.',
  },
  {
    q: 'How should I care for my bag?',
    a: 'Store your bag in its dust bag away from direct sunlight. Wipe with a soft, dry cloth and use a leather conditioner sparingly. Avoid prolonged contact with water and perfume.',
  },
];

export default function FaqPage() {
  return (
    <section className="container-cc py-16 lg:py-24">
      <Reveal className="mb-12 max-w-xl">
        <p className="eyebrow mb-3">Help center</p>
        <h1 className="font-serif text-section text-charcoal">Frequently asked questions</h1>
      </Reveal>

      <div className="divide-y divide-ivory-200 border-y border-ivory-200">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-charcoal">
                {f.q}
                <span className="text-2xl text-sage-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-charcoal-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 rounded-sm bg-ivory-200/60 p-8 text-center">
        <p className="font-serif text-xl text-charcoal">Still have questions?</p>
        <Link href="/contact" className="btn-ghost mt-2 inline-flex">Contact our team</Link>
      </div>
    </section>
  );
}

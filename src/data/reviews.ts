export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  verified: boolean;
};

export const REVIEWS: Review[] = [
  {
    name: 'Eleanor M.',
    location: 'London, UK',
    rating: 5,
    text: 'Beautiful quality and even better in person. The bag has quickly become my everyday favorite — the leather only gets better with wear.',
    product: 'Stylish Saffiano',
    verified: true,
  },
  {
    name: 'Priya S.',
    location: 'Amsterdam, NL',
    rating: 5,
    text: 'Genuinely the most elegant bag I own. The structure holds perfectly and the hardware feels premium without being loud.',
    product: 'Structured City Bag',
    verified: true,
  },
  {
    name: 'Camille R.',
    location: 'Paris, FR',
    rating: 4,
    text: 'Soft, light and exactly the sage tone I hoped for. It fits more than it looks like it should. Shipping was quick too.',
    product: 'Sage Mini Shoulder Bag',
    verified: true,
  },
  {
    name: 'Sofia L.',
    location: 'Milan, IT',
    rating: 5,
    text: 'The quilted crossbody is the perfect size for everyday. The chain strap detail is so refined — I get compliments constantly.',
    product: 'Soft Quilted Crossbody',
    verified: true,
  },
  {
    name: 'Hannah K.',
    location: 'Berlin, DE',
    rating: 5,
    text: 'My weekend bag has been on three trips already and still looks immaculate. The leather trim is impeccable.',
    product: 'Premium Weekend Bag',
    verified: true,
  },
  {
    name: 'Maya T.',
    location: 'Copenhagen, DK',
    rating: 4,
    text: 'Minimal, well-made and exactly as photographed. The tote holds my laptop and still looks sharp for meetings.',
    product: 'Classic Leather Tote',
    verified: true,
  },
];

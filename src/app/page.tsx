import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import HottestPicks from '@/components/HottestPicks';
import FindYourBag from '@/components/FindYourBag';
import NewArrivals from '@/components/NewArrivals';
import BestSellers from '@/components/BestSellers';
import BrandValues from '@/components/BrandValues';
import Reviews from '@/components/Reviews';
import InstagramSection from '@/components/InstagramSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <HottestPicks />
      <FindYourBag />
      <NewArrivals />
      <BrandValues />
      <BestSellers />
      <Reviews />
      <InstagramSection />
    </>
  );
}

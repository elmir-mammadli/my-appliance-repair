import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandsGrid from '@/components/BrandsGrid';
import Services from '@/components/Services';
import RecentRepairs from '@/components/RecentRepairs';
import WhyUs from '@/components/WhyUs';
import Discounts from '@/components/Discounts';
import Coverage from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import BookingModal from '@/components/BookingModal';
import ContactForm from '@/components/ContactForm';
import JoinUs from '@/components/JoinUs';
import HiringModal from '@/components/HiringModal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandsGrid />
      <Services />
      <RecentRepairs />
      <WhyUs />
      <Discounts />
      <Coverage />
      <Testimonials />
      <FAQ />
      <BookingModal />
      <ContactForm />
      <JoinUs />
      <HiringModal />
      <Footer />
    </main>
  );
}

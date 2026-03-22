import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandsGrid from '@/components/BrandsGrid';
import Services from '@/components/Services';
import RecentRepairs from '@/components/RecentRepairs';
import WhyUs from '@/components/WhyUs';
import Coverage from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
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
      <Coverage />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}

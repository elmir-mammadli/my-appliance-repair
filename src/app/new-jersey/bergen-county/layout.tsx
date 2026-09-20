import Navbar from '@/components/Navbar';
import BergenFooter from '@/components/BergenFooter';
import BookingModal from '@/components/BookingModal';
export default function BergenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <BookingModal />
      <BergenFooter />
    </>
  );
}

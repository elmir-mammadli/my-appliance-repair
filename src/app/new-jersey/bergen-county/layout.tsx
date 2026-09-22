import Navbar from '@/components/Navbar';
import BergenFooter from '@/components/BergenFooter';
import BookingModal from '@/components/BookingModal';
export default function BergenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[&_a]:cursor-pointer [&_button]:cursor-pointer [&_summary]:cursor-pointer">
      <Navbar />
      {children}
      <BookingModal />
      <BergenFooter />
    </div>
  );
}

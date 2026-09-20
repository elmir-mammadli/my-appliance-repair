import BergenPage from '@/components/BergenPage';
import { bergenMetadata } from '@/lib/bergen-metadata';
export const metadata = bergenMetadata();
export default function Page() {
  return <BergenPage />;
}

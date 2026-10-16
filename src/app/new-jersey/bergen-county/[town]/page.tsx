import { notFound } from 'next/navigation';
import BergenPage from '@/components/BergenPage';
import { BERGEN_TOWNS } from '@/lib/bergen';
import { bergenMetadata } from '@/lib/bergen-metadata';

export const dynamicParams = false;
export function generateStaticParams() {
  return BERGEN_TOWNS.map(({ slug }) => ({ town: slug }));
}
type Props = { params: Promise<{ town: string }> };
export async function generateMetadata({ params }: Props) {
  const { town: slug } = await params;
  const town = BERGEN_TOWNS.find((entry) => entry.slug === slug);
  if (!town) notFound();
  return bergenMetadata(town);
}
export default async function Page({ params }: Props) {
  const { town: slug } = await params;
  const town = BERGEN_TOWNS.find((entry) => entry.slug === slug);
  if (!town) notFound();
  return <BergenPage town={town} />;
}

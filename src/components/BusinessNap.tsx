import { BUSINESS } from '@/lib/business';

type BusinessNapProps = {
  className?: string;
  itemClassName?: string;
};

/** A semantic, schema-aligned presentation of the canonical business identity. */
export default function BusinessNap({ className, itemClassName }: BusinessNapProps) {
  return (
    <address
      className={className}
      itemScope
      itemType="https://schema.org/LocalBusiness"
      aria-label={`${BUSINESS.name} contact information`}
    >
      <span className={`business-name not-italic ${itemClassName ?? ''}`} itemProp="name">
        {BUSINESS.name}
      </span>
      <span
        className={`business-address not-italic ${itemClassName ?? ''}`}
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
      >
        <span itemProp="streetAddress">{BUSINESS.address.streetAddress}</span>,{' '}
        <span itemProp="addressLocality">{BUSINESS.address.addressLocality}</span>,{' '}
        <span itemProp="addressRegion">{BUSINESS.address.addressRegion}</span>{' '}
        <span itemProp="postalCode">{BUSINESS.address.postalCode}</span>
      </span>
      <a
        className={`business-phone not-italic ${itemClassName ?? ''}`}
        href={BUSINESS.phone.href}
        itemProp="telephone"
      >
        {BUSINESS.phone.display}
      </a>
    </address>
  );
}

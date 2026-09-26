This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Address autocomplete

The booking page and booking modal share an accessible address autocomplete field.
Selecting a suggestion fills the service address and ZIP code; both remain editable.
Customers can also type an address manually if Google is unavailable or has no match.

Set `GOOGLE_PLACES_API_KEY` in `.env.local` and your deployment environment. Enable
[Places API (New)](https://developers.google.com/maps/documentation/places/web-service/cloud-setup)
and billing for its Google Cloud project. Restrict the key to Places API (New) and,
where your hosting supports a fixed outbound IP, to the server's IP. The key is used
only by `/api/places`; do not prefix it with `NEXT_PUBLIC_` or paste it into components.
No Maps JavaScript API or map widget is required. Restart the server after changing
environment variables.

Lookups use Connecticut address suggestions, a session token per search/selection,
and Place Details to retrieve the ZIP. They do not guarantee service coverage.
Run `npx playwright test tests/address-autocomplete.spec.ts` against a current local
server (or build first); these tests mock Places and do not submit real bookings.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

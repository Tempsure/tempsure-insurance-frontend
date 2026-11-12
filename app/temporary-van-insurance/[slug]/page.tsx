import type { Metadata } from 'next';
import InsurancePageTemplate from '@/components/InsurancePageTemplate';
import AdditionalPageTemplate from '@/components/AdditionalPageTemplate';
import JsonLd from '@/components/JsonLd';
import { insurancePagesData } from '@/data/insurancePages';
import { additionalPagesData } from '@/data/additionalPages';
import { vanInsuranceSlugs } from '@/lib/public-routes';
import { breadcrumbJsonLd, buildPageMetadata, faqJsonLd } from '@/lib/seo';
import { insurancePath, resolveInsurancePage } from '@/lib/insurance-page-data';

export async function generateStaticParams() {
  return vanInsuranceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = resolveInsurancePage('van', slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: insurancePath('van', slug),
    image: page.image,
    keywords: [page.title, 'temporary van insurance', 'short term van insurance UK'],
  });
}

export default async function TemporaryVanInsurancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = insurancePath('van', slug);
  const resolved = resolveInsurancePage('van', slug);
  
  // Check if it's a duration page
  const durations = ['hourly', 'daily', 'weekly', 'monthly'];
  if (durations.includes(slug)) {
    const validDuration = slug as 'hourly' | 'daily' | 'weekly' | 'monthly';
    const data = insurancePagesData.van[validDuration];

    if (!data) {
      return <div>Page not found</div>;
    }

    return (
      <>
        {resolved && (
          <JsonLd
            data={[
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Temporary Van Insurance', path: '/temporary-van-insurance/hourly' },
                { name: resolved.title, path },
              ]),
              ...(resolved.faqs?.length ? [faqJsonLd(resolved.faqs)] : []),
            ]}
          />
        )}
        <InsurancePageTemplate data={data} />
      </>
    );
  }

  // Otherwise, it's an additional page
  const data = additionalPagesData[slug as keyof typeof additionalPagesData];

  if (!data) {
    return <div>Page not found</div>;
  }

  return (
    <>
      {resolved && (
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Temporary Van Insurance', path: '/temporary-van-insurance/hourly' },
              { name: resolved.title, path },
            ]),
            ...(resolved.faqs?.length ? [faqJsonLd(resolved.faqs)] : []),
          ]}
        />
      )}
      <AdditionalPageTemplate data={data} />
    </>
  );
}


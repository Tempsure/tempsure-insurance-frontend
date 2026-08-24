import InsurancePageTemplate from '@/components/InsurancePageTemplate';
import AdditionalPageTemplate from '@/components/AdditionalPageTemplate';
import { insurancePagesData } from '@/data/insurancePages';
import { additionalPagesData } from '@/data/additionalPages';
import { vanInsuranceSlugs } from '@/lib/public-routes';

export async function generateStaticParams() {
  return vanInsuranceSlugs.map((slug) => ({ slug }));
}

export default async function TemporaryVanInsurancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Check if it's a duration page
  const durations = ['hourly', 'daily', 'weekly', 'monthly'];
  if (durations.includes(slug)) {
    const validDuration = slug as 'hourly' | 'daily' | 'weekly' | 'monthly';
    const data = insurancePagesData.van[validDuration];

    if (!data) {
      return <div>Page not found</div>;
    }

    return <InsurancePageTemplate data={data} />;
  }

  // Otherwise, it's an additional page
  const data = additionalPagesData[slug as keyof typeof additionalPagesData];

  if (!data) {
    return <div>Page not found</div>;
  }

  return <AdditionalPageTemplate data={data} />;
}


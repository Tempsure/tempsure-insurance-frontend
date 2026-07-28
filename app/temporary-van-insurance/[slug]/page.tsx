import InsurancePageTemplate from '@/components/InsurancePageTemplate';
import AdditionalPageTemplate from '@/components/AdditionalPageTemplate';
import { insurancePagesData } from '@/data/insurancePages';
import { additionalPagesData } from '@/data/additionalPages';

export async function generateStaticParams() {
  const durations = [
    { slug: 'hourly' },
    { slug: 'daily' },
    { slug: 'weekly' },
    { slug: 'monthly' },
  ];

  const additionalPages = [
    { slug: 'van-impound-release' },
    { slug: 'temporary-business-van' },
    { slug: 'pay-as-you-go-van' },
    { slug: 'temporary-food-delivery-van' },
    { slug: 'temporary-courier-van' },
    { slug: 'temporary-carriage-of-own-goods-van' },
    { slug: 'pay-as-you-go-hire-and-reward-van' },
  ];

  return [...durations, ...additionalPages];
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


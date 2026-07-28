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
    { slug: 'driving-test' },
    { slug: 'learner-drivers-on-parents-car' },
    { slug: 'pay-as-you-go-learner' },
    { slug: 'learner-driver-practice' },
  ];

  return [...durations, ...additionalPages];
}

export default async function LearnerDriverInsurancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Check if it's a duration page
  const durations = ['hourly', 'daily', 'weekly', 'monthly'];
  if (durations.includes(slug)) {
    const validDuration = slug as 'hourly' | 'daily' | 'weekly' | 'monthly';
    const data = insurancePagesData.learner[validDuration];

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


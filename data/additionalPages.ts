export interface AdditionalPageData {
  title: string;
  subtitle: string;
  description: string;
  mainContent: {
    title: string;
    paragraphs: string[];
    benefits: string[];
  };
  whatIsContent: {
    title: string;
    paragraphs: string[];
    imagePath: string;
  };
  cards: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imagePath?: string;
  heroImagePath?: string;
}

// Pay As You Go Car Insurance
export const payAsYouGoCarInsurance: AdditionalPageData = {
  title: 'Pay As You Go Car Insurance',
  subtitle: 'Get car insurance as you need it from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for PAYG insurance instantly.',
  mainContent: {
    title: 'Pay As You Go Car Insurance offers cover when you need it',
    paragraphs: [
      'Pay As You Go car insurance gives you the flexibility to get coverage exactly when you need it, without committing to a long-term policy. Whether you need insurance for just an hour or up to 28 days, you only pay for the time you use.',
      'This flexible approach to car insurance is perfect for those who don\'t drive regularly or need temporary coverage for specific situations. You won\'t have to worry about paying for insurance when you\'re not using your car, making it a cost-effective solution for many drivers.',
      'With TempSure\'s Pay As You Go insurance, you can protect your vehicle and your no-claims bonus without the commitment of an annual policy. This means you can drive with confidence knowing you\'re covered, while only paying for the coverage you actually need.',
      'TempSure offers flexible Pay As You Go car insurance solutions to fit every need, so you can worry less about insurance costs and focus more on driving safely and confidently.',
    ],
    benefits: [
      'Fully comprehensive cover',
      '1 hour to 24 weeks flexible cover',
      'Low Excess',
      'Drivers aged 17 to 75',
      'Maximum car value is £65,000',
      'Protect the car owner\'s No Claims Discount',
    ],
  },
  whatIsContent: {
    title: 'Pay As You Go Car Insurance',
    paragraphs: [
      'Pay As You Go car insurance is a flexible insurance solution that allows you to purchase coverage for exactly the duration you need, from as little as 1 hour up to 28 days. Unlike traditional annual policies, you only pay for the time you actually use the car.',
      'This type of insurance is perfect for occasional drivers, those borrowing a car, or anyone who needs temporary coverage without committing to a full year. It\'s also ideal for protecting your no-claims bonus, as any claims made under a Pay As You Go policy won\'t affect your main insurance policy.',
      'With Pay As You Go insurance, you have complete control over when you\'re covered. You can activate coverage just before you need to drive and deactivate it when you\'re done, ensuring you never pay for coverage you don\'t need.',
      'TempSure makes it easy to get Pay As You Go car insurance. Simply enter your details, choose your coverage duration, and you can be on the road in minutes with comprehensive protection that fits your schedule and budget.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Pay As You Go car insurance?',
      answer: 'Pay As You Go car insurance allows you to purchase coverage for exactly the duration you need, from 1 hour to 28 days. You only pay for the time you use, making it a flexible and cost-effective solution for temporary car insurance needs.',
    },
    {
      question: 'How does PAYG insurance work?',
      answer: 'PAYG insurance works by allowing you to select the exact duration of coverage you need. You can start with as little as 1 hour and extend as needed. The policy is active only for the period you\'ve paid for, and you can easily purchase additional coverage if required.',
    },
    {
      question: 'Can I extend my PAYG policy?',
      answer: 'Yes, you can extend your Pay As You Go policy at any time. Simply purchase additional coverage for the extended period you need. The new coverage will seamlessly continue from where your previous policy ended.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Car Impound Release Insurance
export const carImpoundReleaseInsurance: AdditionalPageData = {
  title: 'Car Impound Release Insurance',
  subtitle: 'Get your impounded car released quickly with temporary insurance',
  description: 'Tell us your details: get a quote for impound release insurance instantly.',
  mainContent: {
    title: 'Car Impound Release Insurance offers immediate coverage',
    paragraphs: [
      'If your car has been impounded, you need insurance to release it. Car Impound Release Insurance provides the temporary coverage you need to get your vehicle back from the impound lot quickly and legally.',
      'This specialized insurance is designed specifically for impounded vehicles and can be arranged quickly, often within hours. You don\'t need to wait for a full annual policy - just get the temporary coverage you need to release your car.',
      'With TempSure\'s Car Impound Release Insurance, you can get your vehicle back without the hassle of arranging long-term insurance. This temporary policy covers you just long enough to retrieve your car and arrange permanent coverage if needed.',
      'TempSure makes it easy to get impound release insurance, so you can get back on the road as quickly as possible.',
    ],
    benefits: [
      'Quick release coverage',
      'Available within hours',
      'Covers impounded vehicles',
      'Temporary policy option',
      'No long-term commitment',
      'Protect your vehicle',
    ],
  },
  whatIsContent: {
    title: 'Car Impound Release Insurance',
    paragraphs: [
      'Car Impound Release Insurance is a specialized temporary insurance policy designed to cover vehicles that have been impounded by authorities. This type of insurance is required to legally release your vehicle from an impound lot.',
      'When your car is impounded, you typically need proof of insurance before you can retrieve it. Regular insurance policies may not cover impounded vehicles, or you might not have insurance at all. That\'s where impound release insurance comes in.',
      'This temporary policy provides the minimum coverage required to release your vehicle. It\'s a quick solution that allows you to get your car back without waiting for a full annual insurance policy to be processed.',
      'TempSure offers fast and efficient Car Impound Release Insurance, helping you get your vehicle back quickly while meeting all legal requirements.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Car Impound Release Insurance?',
      answer: 'Car Impound Release Insurance is a temporary insurance policy specifically designed to cover vehicles that have been impounded. It provides the minimum coverage required to legally release your vehicle from an impound lot.',
    },
    {
      question: 'How quickly can I get impound release insurance?',
      answer: 'TempSure can arrange Car Impound Release Insurance quickly, often within hours. This allows you to retrieve your vehicle from the impound lot as soon as possible.',
    },
    {
      question: 'Do I need this if I already have insurance?',
      answer: 'If your existing insurance policy covers impounded vehicles, you may not need separate impound release insurance. However, many standard policies don\'t cover impounded vehicles, so this temporary policy can be essential.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Courtesy Car Insurance
export const courtesyCarInsurance: AdditionalPageData = {
  title: 'Courtesy Car Insurance',
  subtitle: 'Get temporary insurance for courtesy cars while yours is being repaired',
  description: 'Tell us your details: get a quote for courtesy car insurance instantly.',
  mainContent: {
    title: 'Courtesy Car Insurance offers coverage when you need it',
    paragraphs: [
      'When your car is in the garage for repairs, you may be offered a courtesy car. However, you\'ll need insurance to drive it legally. Courtesy Car Insurance provides temporary coverage for these loan vehicles.',
      'This insurance ensures you\'re fully covered while driving a courtesy car, protecting both you and the vehicle. It\'s a cost-effective way to stay mobile while your own car is being serviced or repaired.',
      'With TempSure\'s Courtesy Car Insurance, you can drive with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need the courtesy car.',
      'TempSure makes it easy to get courtesy car insurance, so you can stay on the road even when your car is in the shop.',
    ],
    benefits: [
      'Coverage for loan vehicles',
      'Comprehensive protection',
      'Flexible duration',
      'Quick activation',
      'No long-term commitment',
      'Peace of mind',
    ],
  },
  whatIsContent: {
    title: 'Courtesy Car Insurance',
    paragraphs: [
      'Courtesy Car Insurance is temporary insurance coverage for vehicles provided by garages or repair shops while your own car is being serviced or repaired. These loan vehicles require insurance before you can legally drive them.',
      'Many garages provide courtesy cars as a service, but they typically don\'t include insurance. You\'re responsible for arranging your own coverage, which is where courtesy car insurance comes in.',
      'This temporary policy covers you for the duration you need the courtesy car, whether that\'s a few hours, days, or weeks. It provides comprehensive coverage so you can drive safely and legally.',
      'TempSure offers flexible Courtesy Car Insurance that can be arranged quickly, ensuring you can take advantage of courtesy car services without worrying about insurance coverage.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Courtesy Car Insurance?',
      answer: 'Courtesy Car Insurance is temporary insurance coverage for loan vehicles provided by garages or repair shops while your own car is being serviced or repaired.',
    },
    {
      question: 'Do I need insurance for a courtesy car?',
      answer: 'Yes, you need insurance to legally drive a courtesy car. The garage typically provides the vehicle but not the insurance, so you must arrange your own coverage.',
    },
    {
      question: 'How long can I get courtesy car insurance for?',
      answer: 'TempSure offers flexible courtesy car insurance from 1 hour to 28 days, depending on how long you need the courtesy car while your vehicle is being repaired.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary European Car Insurance
export const temporaryEuropeanCarInsurance: AdditionalPageData = {
  title: 'Temporary European Car Insurance',
  subtitle: 'Get coverage for driving in Europe from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for European car insurance instantly.',
  mainContent: {
    title: 'Temporary European Car Insurance offers international coverage',
    paragraphs: [
      'Planning a trip to Europe? You\'ll need insurance that covers you for driving abroad. Temporary European Car Insurance provides the coverage you need for driving in EU countries.',
      'This insurance ensures you\'re fully protected while driving in Europe, meeting all legal requirements for international travel. It\'s perfect for holidays, business trips, or any European journey.',
      'With TempSure\'s Temporary European Car Insurance, you can drive with confidence across Europe knowing you have comprehensive coverage. This temporary policy covers you for the duration of your trip.',
      'TempSure makes it easy to get European car insurance, so you can focus on enjoying your trip without worrying about coverage.',
    ],
    benefits: [
      'EU-wide coverage',
      'Comprehensive protection',
      'Flexible duration',
      'Quick activation',
      'Legal compliance',
      'Peace of mind abroad',
    ],
  },
  whatIsContent: {
    title: 'Temporary European Car Insurance',
    paragraphs: [
      'Temporary European Car Insurance provides coverage for driving in European Union countries. This insurance is essential if you\'re planning to drive your car in Europe, as it ensures you meet all legal requirements.',
      'While your UK insurance may provide some European coverage, it\'s often limited to third-party only. Temporary European Car Insurance offers comprehensive coverage specifically designed for European travel.',
      'This temporary policy covers you for the duration of your European trip, from as little as 1 hour to up to 28 days. It provides the peace of mind you need when driving in unfamiliar countries.',
      'TempSure offers flexible Temporary European Car Insurance that can be arranged quickly, ensuring you\'re fully covered for your European adventure.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary European Car Insurance?',
      answer: 'Temporary European Car Insurance provides coverage for driving in European Union countries. It ensures you meet all legal requirements for driving abroad.',
    },
    {
      question: 'Do I need separate insurance for driving in Europe?',
      answer: 'While your UK insurance may provide some European coverage, it\'s often limited. Temporary European Car Insurance offers comprehensive coverage specifically designed for European travel.',
    },
    {
      question: 'Which countries are covered?',
      answer: 'TempSure\'s Temporary European Car Insurance covers all European Union countries, ensuring you\'re protected throughout your European journey.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Car Insurance For Non-UK Residents
export const temporaryCarInsuranceForNonUKResidents: AdditionalPageData = {
  title: 'Temporary Car Insurance For Non-UK Residents',
  subtitle: 'Get temporary car insurance in the UK even if you\'re not a UK resident',
  description: 'Tell us your details: get a quote for non-UK resident car insurance instantly.',
  mainContent: {
    title: 'Temporary Car Insurance For Non-UK Residents offers UK coverage',
    paragraphs: [
      'Visiting the UK and need to drive? Non-UK residents can get temporary car insurance to drive legally in the UK. This insurance provides the coverage you need for driving during your visit.',
      'This insurance is designed specifically for visitors to the UK, making it easy to get coverage even if you don\'t have a UK address or UK driving license. It\'s perfect for tourists, business travelers, or anyone visiting the UK.',
      'With TempSure\'s Temporary Car Insurance For Non-UK Residents, you can drive with confidence in the UK knowing you have comprehensive coverage. This temporary policy covers you for the duration of your visit.',
      'TempSure makes it easy for non-UK residents to get car insurance, so you can enjoy your time in the UK without worrying about coverage.',
    ],
    benefits: [
      'Available for non-UK residents',
      'No UK address required',
      'Flexible duration',
      'Quick activation',
      'Comprehensive coverage',
      'Legal compliance',
    ],
  },
  whatIsContent: {
    title: 'Temporary Car Insurance For Non-UK Residents',
    paragraphs: [
      'Temporary Car Insurance For Non-UK Residents provides coverage for visitors to the UK who need to drive during their stay. This insurance is designed specifically for people who don\'t have a UK address or permanent UK insurance.',
      'If you\'re visiting the UK from abroad, you may need temporary insurance to drive legally. This insurance ensures you meet all UK legal requirements for driving, regardless of where you\'re from.',
      'This temporary policy covers you for the duration of your UK visit, from as little as 1 hour to up to 28 days. It provides comprehensive coverage so you can drive safely and legally in the UK.',
      'TempSure offers flexible Temporary Car Insurance For Non-UK Residents that can be arranged quickly, ensuring you\'re fully covered for your UK visit.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'Can non-UK residents get temporary car insurance?',
      answer: 'Yes, TempSure offers Temporary Car Insurance For Non-UK Residents, allowing visitors to the UK to get coverage even without a UK address or permanent UK insurance.',
    },
    {
      question: 'What documents do I need?',
      answer: 'You\'ll need a valid driving license from your home country and proof of your visit to the UK. TempSure can guide you through the specific requirements.',
    },
    {
      question: 'How long can I get coverage for?',
      answer: 'TempSure offers flexible coverage from 1 hour to 28 days, depending on the length of your UK visit.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Business Car Insurance
export const temporaryBusinessCarInsurance: AdditionalPageData = {
  title: 'Temporary Business Car Insurance',
  subtitle: 'Get business use coverage from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for business car insurance instantly.',
  mainContent: {
    title: 'Temporary Business Car Insurance offers commercial coverage',
    paragraphs: [
      'Need to use a car for business purposes? Temporary Business Car Insurance provides the commercial coverage you need for business-related driving.',
      'This insurance covers business use beyond your regular commute, including driving to meetings, client visits, and other business activities. It\'s perfect for professionals who need temporary business coverage.',
      'With TempSure\'s Temporary Business Car Insurance, you can drive for business purposes with confidence knowing you have comprehensive commercial coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get business car insurance, so you can focus on your work without worrying about coverage.',
    ],
    benefits: [
      'Business use coverage',
      'Beyond regular commute',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'Professional coverage',
    ],
  },
  whatIsContent: {
    title: 'Temporary Business Car Insurance',
    paragraphs: [
      'Temporary Business Car Insurance provides coverage for business-related driving activities. This insurance covers business use beyond your regular daily commute, including driving to meetings, client visits, and other commercial activities.',
      'Many standard car insurance policies only cover commuting to and from work, not business use. If you need to drive for business purposes, you\'ll need business car insurance to ensure you\'re fully covered.',
      'This temporary policy covers you for the duration you need business coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your business driving needs.',
      'TempSure offers flexible Temporary Business Car Insurance that can be arranged quickly, ensuring you\'re fully covered for your business activities.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary Business Car Insurance?',
      answer: 'Temporary Business Car Insurance provides coverage for business-related driving activities beyond your regular commute, including meetings, client visits, and other commercial activities.',
    },
    {
      question: 'Do I need business insurance for work trips?',
      answer: 'If you\'re driving for business purposes beyond your regular commute, you may need business car insurance. Standard policies often only cover commuting, not business use.',
    },
    {
      question: 'How long can I get business coverage for?',
      answer: 'TempSure offers flexible business car insurance from 1 hour to 28 days, depending on your business needs.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temp Under 21 Car Insurance
export const tempUnder21CarInsurance: AdditionalPageData = {
  title: 'Temp Under 21 Car Insurance',
  subtitle: 'Get temporary car insurance for drivers under 21 from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for under 21 car insurance instantly.',
  mainContent: {
    title: 'Temp Under 21 Car Insurance offers coverage for young drivers',
    paragraphs: [
      'Are you under 21 and need temporary car insurance? Temp Under 21 Car Insurance provides coverage specifically designed for young drivers.',
      'Young drivers often face higher insurance costs, but temporary insurance can be a more affordable option for short-term needs. This insurance provides comprehensive coverage for drivers under 21.',
      'With TempSure\'s Temp Under 21 Car Insurance, young drivers can get the coverage they need without committing to expensive annual policies. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy for drivers under 21 to get car insurance, so you can drive with confidence.',
    ],
    benefits: [
      'Designed for under 21s',
      'Affordable temporary option',
      'Flexible duration',
      'Quick activation',
      'Comprehensive coverage',
      'No long-term commitment',
    ],
  },
  whatIsContent: {
    title: 'Temp Under 21 Car Insurance',
    paragraphs: [
      'Temp Under 21 Car Insurance provides temporary coverage specifically designed for drivers under the age of 21. This insurance offers a flexible and often more affordable option for young drivers who need short-term coverage.',
      'Young drivers typically face higher insurance premiums due to their lack of driving experience. Temporary insurance can be a cost-effective solution, allowing young drivers to get coverage only when they need it.',
      'This temporary policy covers drivers under 21 for the duration they need, from as little as 1 hour to up to 28 days. It provides comprehensive protection without the commitment of an annual policy.',
      'TempSure offers flexible Temp Under 21 Car Insurance that can be arranged quickly, ensuring young drivers can get the coverage they need.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'Can drivers under 21 get temporary car insurance?',
      answer: 'Yes, TempSure offers Temp Under 21 Car Insurance specifically designed for drivers under the age of 21, providing flexible and affordable temporary coverage.',
    },
    {
      question: 'Is it more expensive for under 21s?',
      answer: 'While young drivers typically face higher premiums, temporary insurance can be more affordable than annual policies as you only pay for the coverage you need.',
    },
    {
      question: 'What age restrictions apply?',
      answer: 'Temp Under 21 Car Insurance is available for drivers aged 17 to 20, providing coverage for young drivers who need temporary insurance.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temp Student Car Insurance
export const tempStudentCarInsurance: AdditionalPageData = {
  title: 'Temp Student Car Insurance',
  subtitle: 'Get temporary car insurance for students from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for student car insurance instantly.',
  mainContent: {
    title: 'Temp Student Car Insurance offers coverage for students',
    paragraphs: [
      'Are you a student who needs temporary car insurance? Temp Student Car Insurance provides coverage specifically designed for students.',
      'Students often need flexible insurance that fits their schedule and budget. This insurance provides comprehensive coverage for students who need temporary car insurance.',
      'With TempSure\'s Temp Student Car Insurance, students can get the coverage they need without committing to expensive annual policies. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy for students to get car insurance, so you can drive with confidence while focusing on your studies.',
    ],
    benefits: [
      'Designed for students',
      'Affordable temporary option',
      'Flexible duration',
      'Quick activation',
      'Comprehensive coverage',
      'Budget-friendly',
    ],
  },
  whatIsContent: {
    title: 'Temp Student Car Insurance',
    paragraphs: [
      'Temp Student Car Insurance provides temporary coverage specifically designed for students. This insurance offers a flexible and often more affordable option for students who need short-term coverage.',
      'Students often have unique insurance needs, requiring coverage during term time, holidays, or specific periods. Temporary insurance allows students to get coverage only when they need it, making it a cost-effective solution.',
      'This temporary policy covers students for the duration they need, from as little as 1 hour to up to 28 days. It provides comprehensive protection without the commitment of an annual policy.',
      'TempSure offers flexible Temp Student Car Insurance that can be arranged quickly, ensuring students can get the coverage they need while managing their budget.',
    ],
    imagePath: '/images/carcard.jpg',
  },
  cards: [
    {
      title: 'Hourly Car Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and test drives.',
    },
    {
      title: 'Daily Car Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term car usage.',
    },
    {
      title: 'Weekly Car Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Car Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'Can students get temporary car insurance?',
      answer: 'Yes, TempSure offers Temp Student Car Insurance specifically designed for students, providing flexible and affordable temporary coverage.',
    },
    {
      question: 'Is student insurance more affordable?',
      answer: 'Temporary student insurance can be more affordable than annual policies as you only pay for the coverage you need, making it ideal for students on a budget.',
    },
    {
      question: 'What documentation do students need?',
      answer: 'Students will need a valid driving license and proof of student status. TempSure can guide you through the specific requirements.',
    },
  ],
  imagePath: '/images/payimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Van Impound Release Insurance
export const vanImpoundReleaseInsurance: AdditionalPageData = {
  title: 'Van Impound Release Insurance',
  subtitle: 'Get your impounded van released quickly with temporary insurance',
  description: 'Tell us your details: get a quote for van impound release insurance instantly.',
  mainContent: {
    title: 'Van Impound Release Insurance offers immediate coverage',
    paragraphs: [
      'If your van has been impounded, you need insurance to release it. Van Impound Release Insurance provides the temporary coverage you need to get your vehicle back from the impound lot quickly and legally.',
      'This specialized insurance is designed specifically for impounded vans and can be arranged quickly, often within hours. You don\'t need to wait for a full annual policy - just get the temporary coverage you need to release your van.',
      'With TempSure\'s Van Impound Release Insurance, you can get your vehicle back without the hassle of arranging long-term insurance. This temporary policy covers you just long enough to retrieve your van and arrange permanent coverage if needed.',
      'TempSure makes it easy to get van impound release insurance, so you can get back on the road as quickly as possible.',
    ],
    benefits: [
      'Quick release coverage',
      'Available within hours',
      'Covers impounded vans',
      'Temporary policy option',
      'No long-term commitment',
      'Protect your vehicle',
    ],
  },
  whatIsContent: {
    title: 'Van Impound Release Insurance',
    paragraphs: [
      'Van Impound Release Insurance is a specialized temporary insurance policy designed to cover vans that have been impounded by authorities. This type of insurance is required to legally release your vehicle from an impound lot.',
      'When your van is impounded, you typically need proof of insurance before you can retrieve it. Regular insurance policies may not cover impounded vehicles, or you might not have insurance at all. That\'s where impound release insurance comes in.',
      'This temporary policy provides the minimum coverage required to release your vehicle. It\'s a quick solution that allows you to get your van back without waiting for a full annual insurance policy to be processed.',
      'TempSure offers fast and efficient Van Impound Release Insurance, helping you get your vehicle back quickly while meeting all legal requirements.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Van Impound Release Insurance?',
      answer: 'Van Impound Release Insurance is a temporary insurance policy specifically designed to cover vans that have been impounded. It provides the minimum coverage required to legally release your vehicle from an impound lot.',
    },
    {
      question: 'How quickly can I get van impound release insurance?',
      answer: 'TempSure can arrange Van Impound Release Insurance quickly, often within hours. This allows you to retrieve your vehicle from the impound lot as soon as possible.',
    },
    {
      question: 'Do I need this if I already have insurance?',
      answer: 'If your existing insurance policy covers impounded vehicles, you may not need separate impound release insurance. However, many standard policies don\'t cover impounded vehicles, so this temporary policy can be essential.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Business Van Insurance
export const temporaryBusinessVanInsurance: AdditionalPageData = {
  title: 'Temporary Business Van Insurance',
  subtitle: 'Get business use van coverage from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for business van insurance instantly.',
  mainContent: {
    title: 'Temporary Business Van Insurance offers commercial coverage',
    paragraphs: [
      'Need to use a van for business purposes? Temporary Business Van Insurance provides the commercial coverage you need for business-related driving.',
      'This insurance covers business use including deliveries, trades work, and other commercial activities. It\'s perfect for tradesmen, couriers, and businesses who need temporary van coverage.',
      'With TempSure\'s Temporary Business Van Insurance, you can drive for business purposes with confidence knowing you have comprehensive commercial coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get business van insurance, so you can focus on your work without worrying about coverage.',
    ],
    benefits: [
      'Business use coverage',
      'Includes deliveries and trades',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'Professional coverage',
    ],
  },
  whatIsContent: {
    title: 'Temporary Business Van Insurance',
    paragraphs: [
      'Temporary Business Van Insurance provides coverage for business-related van driving activities. This insurance covers business use including deliveries, trades work, courier services, and other commercial activities.',
      'Many standard van insurance policies don\'t include business use, or only cover limited business activities. If you need to use a van for business purposes, you\'ll need business van insurance to ensure you\'re fully covered.',
      'This temporary policy covers you for the duration you need business coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your business van needs.',
      'TempSure offers flexible Temporary Business Van Insurance that can be arranged quickly, ensuring you\'re fully covered for your business activities.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary Business Van Insurance?',
      answer: 'Temporary Business Van Insurance provides coverage for business-related van driving activities, including deliveries, trades work, courier services, and other commercial activities.',
    },
    {
      question: 'Do I need business insurance for work?',
      answer: 'If you\'re using a van for business purposes, you may need business van insurance. Standard policies often don\'t cover business use, so this insurance is essential for commercial activities.',
    },
    {
      question: 'How long can I get business coverage for?',
      answer: 'TempSure offers flexible business van insurance from 1 hour to 28 days, depending on your business needs.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Pay As You Go Van Insurance
export const payAsYouGoVanInsurance: AdditionalPageData = {
  title: 'Pay As You Go Van Insurance',
  subtitle: 'Get van insurance as you need it from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for PAYG van insurance instantly.',
  mainContent: {
    title: 'Pay As You Go Van Insurance offers cover when you need it',
    paragraphs: [
      'Pay As You Go van insurance gives you the flexibility to get coverage exactly when you need it, without committing to a long-term policy. Whether you need insurance for just an hour or up to 28 days, you only pay for the time you use.',
      'This flexible approach to van insurance is perfect for those who don\'t use a van regularly or need temporary coverage for specific situations. You won\'t have to worry about paying for insurance when you\'re not using your van, making it a cost-effective solution.',
      'With TempSure\'s Pay As You Go van insurance, you can protect your vehicle and your no-claims bonus without the commitment of an annual policy. This means you can drive with confidence knowing you\'re covered, while only paying for the coverage you actually need.',
      'TempSure offers flexible Pay As You Go van insurance solutions to fit every need, so you can worry less about insurance costs and focus more on driving safely and confidently.',
    ],
    benefits: [
      'Fully comprehensive cover',
      '1 hour to 28 days flexible cover',
      'Business use included',
      'Low Excess',
      'Drivers aged 21 to 75',
      'Maximum van value is £65,000',
    ],
  },
  whatIsContent: {
    title: 'Pay As You Go Van Insurance',
    paragraphs: [
      'Pay As You Go van insurance is a flexible insurance solution that allows you to purchase coverage for exactly the duration you need, from as little as 1 hour up to 28 days. Unlike traditional annual policies, you only pay for the time you actually use the van.',
      'This type of insurance is perfect for occasional van users, those borrowing a van, or anyone who needs temporary coverage without committing to a full year. It\'s also ideal for protecting your no-claims bonus, as any claims made under a Pay As You Go policy won\'t affect your main insurance policy.',
      'With Pay As You Go insurance, you have complete control over when you\'re covered. You can activate coverage just before you need to drive and deactivate it when you\'re done, ensuring you never pay for coverage you don\'t need.',
      'TempSure makes it easy to get Pay As You Go van insurance. Simply enter your details, choose your coverage duration, and you can be on the road in minutes with comprehensive protection that fits your schedule and budget.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Pay As You Go van insurance?',
      answer: 'Pay As You Go van insurance allows you to purchase coverage for exactly the duration you need, from 1 hour to 28 days. You only pay for the time you use, making it a flexible and cost-effective solution for temporary van insurance needs.',
    },
    {
      question: 'How does PAYG van insurance work?',
      answer: 'PAYG van insurance works by allowing you to select the exact duration of coverage you need. You can start with as little as 1 hour and extend as needed. The policy is active only for the period you\'ve paid for, and you can easily purchase additional coverage if required.',
    },
    {
      question: 'Can I extend my PAYG van policy?',
      answer: 'Yes, you can extend your Pay As You Go van policy at any time. Simply purchase additional coverage for the extended period you need. The new coverage will seamlessly continue from where your previous policy ended.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Food Delivery Van Insurance
export const temporaryFoodDeliveryVanInsurance: AdditionalPageData = {
  title: 'Temporary Food Delivery Van Insurance',
  subtitle: 'Get coverage for food delivery vans from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for food delivery van insurance instantly.',
  mainContent: {
    title: 'Temporary Food Delivery Van Insurance offers delivery coverage',
    paragraphs: [
      'Running a food delivery service? Temporary Food Delivery Van Insurance provides the specialized coverage you need for food delivery operations.',
      'This insurance covers food delivery activities, ensuring you\'re fully protected while making deliveries. It\'s perfect for food delivery businesses, restaurants, and catering services who need temporary van coverage.',
      'With TempSure\'s Temporary Food Delivery Van Insurance, you can operate your delivery service with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get food delivery van insurance, so you can focus on serving your customers without worrying about coverage.',
    ],
    benefits: [
      'Food delivery coverage',
      'Specialized for delivery operations',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'Business use included',
    ],
  },
  whatIsContent: {
    title: 'Temporary Food Delivery Van Insurance',
    paragraphs: [
      'Temporary Food Delivery Van Insurance provides specialized coverage for vans used in food delivery operations. This insurance covers food delivery activities, ensuring you\'re fully protected while making deliveries to customers.',
      'Food delivery operations have specific insurance requirements that standard van insurance may not cover. This specialized insurance ensures you meet all legal requirements and are fully protected for your delivery activities.',
      'This temporary policy covers you for the duration you need food delivery coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your food delivery needs.',
      'TempSure offers flexible Temporary Food Delivery Van Insurance that can be arranged quickly, ensuring you\'re fully covered for your food delivery operations.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary Food Delivery Van Insurance?',
      answer: 'Temporary Food Delivery Van Insurance provides specialized coverage for vans used in food delivery operations, ensuring you\'re fully protected while making deliveries to customers.',
    },
    {
      question: 'Do I need special insurance for food delivery?',
      answer: 'Yes, food delivery operations have specific insurance requirements. Standard van insurance may not cover food delivery activities, so specialized insurance is essential.',
    },
    {
      question: 'How long can I get food delivery coverage for?',
      answer: 'TempSure offers flexible food delivery van insurance from 1 hour to 28 days, depending on your delivery needs.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Courier Van Insurance
export const temporaryCourierVanInsurance: AdditionalPageData = {
  title: 'Temporary Courier Van Insurance',
  subtitle: 'Get coverage for courier vans from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for courier van insurance instantly.',
  mainContent: {
    title: 'Temporary Courier Van Insurance offers courier coverage',
    paragraphs: [
      'Working as a courier? Temporary Courier Van Insurance provides the specialized coverage you need for courier operations.',
      'This insurance covers courier activities, ensuring you\'re fully protected while making deliveries. It\'s perfect for courier services, delivery companies, and independent couriers who need temporary van coverage.',
      'With TempSure\'s Temporary Courier Van Insurance, you can operate your courier service with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get courier van insurance, so you can focus on your deliveries without worrying about coverage.',
    ],
    benefits: [
      'Courier coverage',
      'Specialized for courier operations',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'Business use included',
    ],
  },
  whatIsContent: {
    title: 'Temporary Courier Van Insurance',
    paragraphs: [
      'Temporary Courier Van Insurance provides specialized coverage for vans used in courier operations. This insurance covers courier activities, ensuring you\'re fully protected while making deliveries.',
      'Courier operations have specific insurance requirements that standard van insurance may not cover. This specialized insurance ensures you meet all legal requirements and are fully protected for your courier activities.',
      'This temporary policy covers you for the duration you need courier coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your courier needs.',
      'TempSure offers flexible Temporary Courier Van Insurance that can be arranged quickly, ensuring you\'re fully covered for your courier operations.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary Courier Van Insurance?',
      answer: 'Temporary Courier Van Insurance provides specialized coverage for vans used in courier operations, ensuring you\'re fully protected while making deliveries.',
    },
    {
      question: 'Do I need special insurance for courier work?',
      answer: 'Yes, courier operations have specific insurance requirements. Standard van insurance may not cover courier activities, so specialized insurance is essential.',
    },
    {
      question: 'How long can I get courier coverage for?',
      answer: 'TempSure offers flexible courier van insurance from 1 hour to 28 days, depending on your courier needs.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Temporary Carriage Of Own Goods Van Insurance
export const temporaryCarriageOfOwnGoodsVanInsurance: AdditionalPageData = {
  title: 'Temporary Carriage Of Own Goods Van Insurance',
  subtitle: 'Get coverage for carrying your own goods from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for carriage of own goods van insurance instantly.',
  mainContent: {
    title: 'Temporary Carriage Of Own Goods Van Insurance offers goods coverage',
    paragraphs: [
      'Need to transport your own goods? Temporary Carriage Of Own Goods Van Insurance provides the coverage you need for carrying your own goods in a van.',
      'This insurance covers the carriage of your own goods, ensuring you\'re fully protected while transporting items. It\'s perfect for moving house, transporting equipment, or carrying personal goods.',
      'With TempSure\'s Temporary Carriage Of Own Goods Van Insurance, you can transport your goods with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get carriage of own goods van insurance, so you can move your goods safely and legally.',
    ],
    benefits: [
      'Own goods coverage',
      'Specialized for goods transport',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'No hire and reward',
    ],
  },
  whatIsContent: {
    title: 'Temporary Carriage Of Own Goods Van Insurance',
    paragraphs: [
      'Temporary Carriage Of Own Goods Van Insurance provides coverage for vans used to transport your own goods. This insurance covers the carriage of your own goods, ensuring you\'re fully protected while transporting items.',
      'This type of insurance is different from hire and reward insurance, as it only covers transporting your own goods, not goods belonging to others for payment. It\'s perfect for personal moves, transporting equipment, or carrying your own items.',
      'This temporary policy covers you for the duration you need goods transport coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your goods transport needs.',
      'TempSure offers flexible Temporary Carriage Of Own Goods Van Insurance that can be arranged quickly, ensuring you\'re fully covered for transporting your own goods.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Temporary Carriage Of Own Goods Van Insurance?',
      answer: 'Temporary Carriage Of Own Goods Van Insurance provides coverage for vans used to transport your own goods, ensuring you\'re fully protected while transporting items.',
    },
    {
      question: 'What\'s the difference between own goods and hire and reward?',
      answer: 'Own goods insurance covers transporting your own goods, while hire and reward covers transporting goods belonging to others for payment. Make sure you choose the right type for your needs.',
    },
    {
      question: 'How long can I get own goods coverage for?',
      answer: 'TempSure offers flexible carriage of own goods van insurance from 1 hour to 28 days, depending on your transport needs.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Pay As You Go (PAYG) Hire And Reward Van Insurance
export const payAsYouGoHireAndRewardVanInsurance: AdditionalPageData = {
  title: 'Pay As You Go (PAYG) Hire And Reward Van Insurance',
  subtitle: 'Get hire and reward van coverage as you need it from 1 hour to 28 days',
  description: 'Tell us your details: get a quote for PAYG hire and reward van insurance instantly.',
  mainContent: {
    title: 'Pay As You Go Hire And Reward Van Insurance offers commercial coverage',
    paragraphs: [
      'Transporting goods for payment? Pay As You Go Hire And Reward Van Insurance provides the commercial coverage you need for hire and reward operations.',
      'This insurance covers transporting goods belonging to others for payment, ensuring you\'re fully protected while operating a commercial delivery service. It\'s perfect for couriers, delivery drivers, and commercial transport operations.',
      'With TempSure\'s Pay As You Go Hire And Reward Van Insurance, you can operate your commercial transport service with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get hire and reward van insurance, so you can focus on your business without worrying about coverage.',
    ],
    benefits: [
      'Hire and reward coverage',
      'Commercial transport protection',
      'Flexible duration',
      'Quick activation',
      'Comprehensive protection',
      'Pay as you go pricing',
    ],
  },
  whatIsContent: {
    title: 'Pay As You Go Hire And Reward Van Insurance',
    paragraphs: [
      'Pay As You Go Hire And Reward Van Insurance provides coverage for vans used to transport goods belonging to others for payment. This insurance covers commercial transport operations, ensuring you\'re fully protected while operating a hire and reward service.',
      'Hire and reward insurance is essential if you\'re transporting goods for payment, as standard van insurance doesn\'t cover commercial transport activities. This specialized insurance ensures you meet all legal requirements and are fully protected.',
      'This temporary policy covers you for the duration you need hire and reward coverage, from as little as 1 hour to up to 28 days. It provides comprehensive protection for all your commercial transport needs.',
      'TempSure offers flexible Pay As You Go Hire And Reward Van Insurance that can be arranged quickly, ensuring you\'re fully covered for your commercial transport operations.',
    ],
    imagePath: '/images/vancard.jpg',
  },
  cards: [
    {
      title: 'Hourly Van Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick trips and deliveries.',
    },
    {
      title: 'Daily Van Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long journeys. Ideal for short-term van usage.',
    },
    {
      title: 'Weekly Van Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended periods of use.',
    },
    {
      title: 'Monthly Van Insurance',
      icon: '🗓️',
      description: 'Up to 28 days of flexible coverage. Perfect for longer temporary needs.',
    },
  ],
  faqs: [
    {
      question: 'What is Pay As You Go Hire And Reward Van Insurance?',
      answer: 'Pay As You Go Hire And Reward Van Insurance provides coverage for vans used to transport goods belonging to others for payment, ensuring you\'re fully protected while operating a commercial transport service.',
    },
    {
      question: 'Do I need hire and reward insurance?',
      answer: 'Yes, if you\'re transporting goods for payment, you need hire and reward insurance. Standard van insurance doesn\'t cover commercial transport activities, so specialized insurance is essential.',
    },
    {
      question: 'How does PAYG hire and reward work?',
      answer: 'PAYG hire and reward insurance works by allowing you to purchase coverage for exactly the duration you need, from 1 hour to 28 days. You only pay for the time you use, making it a flexible and cost-effective solution.',
    },
  ],
  imagePath: '/images/vanimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Driving Test Insurance
export const drivingTestInsurance: AdditionalPageData = {
  title: 'Driving Test Insurance',
  subtitle: 'Get coverage for your driving test from 1 hour to 1 day',
  description: 'Tell us your details: get a quote for driving test insurance instantly.',
  mainContent: {
    title: 'Driving Test Insurance offers coverage for your test',
    paragraphs: [
      'Taking your driving test? Driving Test Insurance provides the coverage you need for your practical driving test.',
      'This insurance ensures you\'re fully covered during your driving test, giving you peace of mind on this important day. It\'s perfect for learner drivers who want extra protection during their test.',
      'With TempSure\'s Driving Test Insurance, you can take your test with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration of your test.',
      'TempSure makes it easy to get driving test insurance, so you can focus on passing your test without worrying about coverage.',
    ],
    benefits: [
      'Test day coverage',
      'Comprehensive protection',
      'Quick activation',
      'Peace of mind',
      'Flexible duration',
      'No long-term commitment',
    ],
  },
  whatIsContent: {
    title: 'Driving Test Insurance',
    paragraphs: [
      'Driving Test Insurance provides temporary coverage specifically for your practical driving test. This insurance ensures you\'re fully covered during your test, giving you peace of mind on this important day.',
      'While you may already have learner driver insurance, having specific test day coverage can provide extra protection and peace of mind. This insurance covers you for the duration of your driving test.',
      'This temporary policy is designed to cover you just for your test day, from as little as 1 hour to a full day. It provides comprehensive protection so you can focus on passing your test.',
      'TempSure offers flexible Driving Test Insurance that can be arranged quickly, ensuring you\'re fully covered for your driving test.',
    ],
    imagePath: '/images/licensecard.jpg',
  },
  cards: [
    {
      title: 'Hourly Learner Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick practice sessions.',
    },
    {
      title: 'Daily Learner Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long practice. Ideal for intensive learning days.',
    },
    {
      title: 'Weekly Learner Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended practice periods.',
    },
    {
      title: 'Monthly Learner Insurance',
      icon: '🗓️',
      description: 'Up to 24 weeks of flexible coverage. Perfect for longer learning periods.',
    },
  ],
  faqs: [
    {
      question: 'What is Driving Test Insurance?',
      answer: 'Driving Test Insurance provides temporary coverage specifically for your practical driving test, ensuring you\'re fully covered during your test day.',
    },
    {
      question: 'Do I need separate insurance for my test?',
      answer: 'While you may already have learner driver insurance, having specific test day coverage can provide extra protection and peace of mind on your test day.',
    },
    {
      question: 'How long does test insurance last?',
      answer: 'TempSure offers Driving Test Insurance from 1 hour to a full day, covering you for the duration of your driving test.',
    },
  ],
  imagePath: '/images/learnerimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Insurance For Learner Drivers On Their Parent's Car
export const insuranceForLearnerDriversOnTheirParentsCar: AdditionalPageData = {
  title: 'Insurance For Learner Drivers On Their Parent\'s Car',
  subtitle: 'Get coverage for learner drivers on their parent\'s car from 1 hour to 24 weeks',
  description: 'Tell us your details: get a quote for learner driver insurance on parent\'s car instantly.',
  mainContent: {
    title: 'Insurance For Learner Drivers On Their Parent\'s Car offers cover when you need it',
    paragraphs: [
      'While you and your child may be excited about the fact that they have received their provisional licence, you might be worried about what will happen to your car while they are learning to drive.',
      'Having your child learn to drive can be lengthy and expensive if your car ends up being damaged in the process. You may even be worried about not receiving your no-claims bonus from your insurance company if anything were to happen.',
      'Thankfully, you won\'t need to worry about all of these factors if you take out a temporary learner driver insurance policy on your car with TempSure, as you will be able to protect both your peace of mind and your no-claims bonus.',
      'TempSure has different learner driver car insurance solutions to fit every need, so you and your child can worry less about damaging your car and focus more on learning to drive.',
    ],
    benefits: [
      'Fully comprehensive cover',
      '1 hour to 24 weeks flexible cover',
      'Low Excess',
      'Drivers aged 17 to 75',
      'Maximum car value is £65,000',
      'Protect the car owner\'s No Claims Discount',
    ],
  },
  whatIsContent: {
    title: 'Insurance For Learner Drivers On Their Parent\'s Car',
    paragraphs: [
      'Insurance For Learner Drivers On Their Parent\'s Car is effectively a type of insurance policy that will cover you if your child damages your car while learning to drive.',
      'Driving lessons can sometimes be out of budget for some parents, so many will opt to teach their kids in their own cars. While this may seem like a cheaper option on paper, if your child ends up damaging your car while learning, you could incur some extra costs.',
      'If you end up having to make an insurance claim if your child damages your car, your insurance premium will go up, and you will not be able to receive a no-claims bonus.',
      'However, suppose you take out a provisional driver insurance policy. In that case, you will be covered if anything goes wrong without losing your no-claims bonus or having your premiums go up. You can also pay for this insurance policy for as long as you use it, so once your child has taken their driving test, you will not be stuck with a bill you don\'t need! Consider our monthly learner driver insurance if you only need a couple of months\' cover before your child sits their driving test.',
    ],
    imagePath: '/images/licensecard.jpg',
  },
  cards: [
    {
      title: 'Hourly Learner Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick practice sessions.',
    },
    {
      title: 'Daily Learner Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long practice. Ideal for intensive learning days.',
    },
    {
      title: 'Weekly Learner Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended practice periods.',
    },
    {
      title: 'Monthly Learner Insurance',
      icon: '🗓️',
      description: 'Up to 24 weeks of flexible coverage. Perfect for longer learning periods.',
    },
  ],
  faqs: [
    {
      question: 'What is Insurance For Learner Drivers On Their Parent\'s Car?',
      answer: 'This insurance policy covers you if your child damages your car while learning to drive, protecting both your vehicle and your no-claims bonus.',
    },
    {
      question: 'Will this affect my no-claims bonus?',
      answer: 'No, claims made under a temporary learner driver insurance policy won\'t affect your main insurance policy\'s no-claims bonus, protecting your premium.',
    },
    {
      question: 'How long can I get coverage for?',
      answer: 'TempSure offers flexible learner driver insurance from 1 hour to 24 weeks, depending on how long your child needs to practice before their test.',
    },
  ],
  imagePath: '/images/learnerimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Pay As You Go Learner Driver Insurance
export const payAsYouGoLearnerDriverInsurance: AdditionalPageData = {
  title: 'Pay As You Go Learner Driver Insurance',
  subtitle: 'Get learner driver insurance as you need it from 1 hour to 24 weeks',
  description: 'Tell us your details: get a quote for PAYG learner driver insurance instantly.',
  mainContent: {
    title: 'Pay As You Go Learner Driver Insurance offers flexible coverage',
    paragraphs: [
      'Learning to drive? Pay As You Go Learner Driver Insurance provides the flexible coverage you need for practice driving.',
      'This insurance gives you the flexibility to get coverage exactly when you need it, without committing to a long-term policy. Whether you need insurance for just an hour of practice or up to 24 weeks, you only pay for the time you use.',
      'With TempSure\'s Pay As You Go Learner Driver Insurance, you can practice driving with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get learner driver insurance, so you can focus on learning to drive without worrying about coverage.',
    ],
    benefits: [
      'Fully comprehensive cover',
      '1 hour to 24 weeks flexible cover',
      'Low Excess',
      'Pay as you go pricing',
      'Protect the car owner\'s No Claims Discount',
      'Flexible duration',
    ],
  },
  whatIsContent: {
    title: 'Pay As You Go Learner Driver Insurance',
    paragraphs: [
      'Pay As You Go Learner Driver Insurance is a flexible insurance solution that allows you to purchase coverage for exactly the duration you need, from as little as 1 hour up to 24 weeks. Unlike traditional annual policies, you only pay for the time you actually practice driving.',
      'This type of insurance is perfect for learner drivers who practice irregularly or need temporary coverage for specific practice sessions. It\'s also ideal for protecting the car owner\'s no-claims bonus, as any claims made under a Pay As You Go policy won\'t affect their main insurance policy.',
      'With Pay As You Go insurance, you have complete control over when you\'re covered. You can activate coverage just before you need to practice and deactivate it when you\'re done, ensuring you never pay for coverage you don\'t need.',
      'TempSure makes it easy to get Pay As You Go Learner Driver Insurance. Simply enter your details, choose your coverage duration, and you can be practicing in minutes with comprehensive protection that fits your schedule and budget.',
    ],
    imagePath: '/images/licensecard.jpg',
  },
  cards: [
    {
      title: 'Hourly Learner Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick practice sessions.',
    },
    {
      title: 'Daily Learner Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long practice. Ideal for intensive learning days.',
    },
    {
      title: 'Weekly Learner Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended practice periods.',
    },
    {
      title: 'Monthly Learner Insurance',
      icon: '🗓️',
      description: 'Up to 24 weeks of flexible coverage. Perfect for longer learning periods.',
    },
  ],
  faqs: [
    {
      question: 'What is Pay As You Go Learner Driver Insurance?',
      answer: 'Pay As You Go Learner Driver Insurance allows you to purchase coverage for exactly the duration you need, from 1 hour to 24 weeks. You only pay for the time you use, making it a flexible and cost-effective solution for learner driver insurance needs.',
    },
    {
      question: 'How does PAYG learner insurance work?',
      answer: 'PAYG learner insurance works by allowing you to select the exact duration of coverage you need. You can start with as little as 1 hour and extend as needed. The policy is active only for the period you\'ve paid for, and you can easily purchase additional coverage if required.',
    },
    {
      question: 'Can I extend my PAYG learner policy?',
      answer: 'Yes, you can extend your Pay As You Go learner driver policy at any time. Simply purchase additional coverage for the extended period you need. The new coverage will seamlessly continue from where your previous policy ended.',
    },
  ],
  imagePath: '/images/learnerimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Learner Driver Practice Insurance
export const learnerDriverPracticeInsurance: AdditionalPageData = {
  title: 'Learner Driver Practice Insurance',
  subtitle: 'Get coverage for practice driving from 1 hour to 24 weeks',
  description: 'Tell us your details: get a quote for learner driver practice insurance instantly.',
  mainContent: {
    title: 'Learner Driver Practice Insurance offers practice coverage',
    paragraphs: [
      'Practicing for your driving test? Learner Driver Practice Insurance provides the coverage you need for practice driving sessions.',
      'This insurance ensures you\'re fully covered while practicing driving, giving you peace of mind during your learning journey. It\'s perfect for learner drivers who want comprehensive protection while practicing.',
      'With TempSure\'s Learner Driver Practice Insurance, you can practice driving with confidence knowing you have comprehensive coverage. This temporary policy covers you for the duration you need.',
      'TempSure makes it easy to get learner driver practice insurance, so you can focus on learning to drive without worrying about coverage.',
    ],
    benefits: [
      'Practice session coverage',
      'Comprehensive protection',
      'Flexible duration',
      'Quick activation',
      'Protect car owner\'s no-claims',
      'Peace of mind',
    ],
  },
  whatIsContent: {
    title: 'Learner Driver Practice Insurance',
    paragraphs: [
      'Learner Driver Practice Insurance provides temporary coverage specifically for practice driving sessions. This insurance ensures you\'re fully covered while practicing driving, giving you peace of mind during your learning journey.',
      'Practice driving is essential for passing your driving test, but it can be risky. Having proper insurance coverage ensures you\'re protected if anything goes wrong during practice sessions, without affecting the car owner\'s main insurance policy.',
      'This temporary policy covers you for the duration you need practice coverage, from as little as 1 hour to up to 24 weeks. It provides comprehensive protection so you can practice safely and confidently.',
      'TempSure offers flexible Learner Driver Practice Insurance that can be arranged quickly, ensuring you\'re fully covered for your practice driving sessions.',
    ],
    imagePath: '/images/licensecard.jpg',
  },
  cards: [
    {
      title: 'Hourly Learner Insurance',
      icon: '🕐',
      description: 'Get comprehensive cover from just 1 hour. Perfect for quick practice sessions.',
    },
    {
      title: 'Daily Learner Insurance',
      icon: '📅',
      description: '24-hour coverage for day-long practice. Ideal for intensive learning days.',
    },
    {
      title: 'Weekly Learner Insurance',
      icon: '📆',
      description: '7 days of comprehensive protection. Great for extended practice periods.',
    },
    {
      title: 'Monthly Learner Insurance',
      icon: '🗓️',
      description: 'Up to 24 weeks of flexible coverage. Perfect for longer learning periods.',
    },
  ],
  faqs: [
    {
      question: 'What is Learner Driver Practice Insurance?',
      answer: 'Learner Driver Practice Insurance provides temporary coverage specifically for practice driving sessions, ensuring you\'re fully covered while practicing driving.',
    },
    {
      question: 'Do I need separate insurance for practice?',
      answer: 'Yes, if you\'re practicing in someone else\'s car, you\'ll need learner driver practice insurance to ensure you\'re fully covered and to protect the car owner\'s no-claims bonus.',
    },
    {
      question: 'How long can I get practice coverage for?',
      answer: 'TempSure offers flexible learner driver practice insurance from 1 hour to 24 weeks, depending on how long you need to practice before your test.',
    },
  ],
  imagePath: '/images/learnerimage.jpg',
  heroImagePath: '/images/tempsure-min.jpg',
};

// Export all additional pages
export const additionalPagesData = {
  // Car Insurance
  'pay-as-you-go': payAsYouGoCarInsurance,
  'car-impound-release': carImpoundReleaseInsurance,
  'courtesy-car': courtesyCarInsurance,
  'temporary-european': temporaryEuropeanCarInsurance,
  'non-uk-residents': temporaryCarInsuranceForNonUKResidents,
  'temporary-business': temporaryBusinessCarInsurance,
  'under-21': tempUnder21CarInsurance,
  'student': tempStudentCarInsurance,
  // Van Insurance
  'van-impound-release': vanImpoundReleaseInsurance,
  'temporary-business-van': temporaryBusinessVanInsurance,
  'pay-as-you-go-van': payAsYouGoVanInsurance,
  'temporary-food-delivery-van': temporaryFoodDeliveryVanInsurance,
  'temporary-courier-van': temporaryCourierVanInsurance,
  'temporary-carriage-of-own-goods-van': temporaryCarriageOfOwnGoodsVanInsurance,
  'pay-as-you-go-hire-and-reward-van': payAsYouGoHireAndRewardVanInsurance,
  // Learner Driver Insurance
  'driving-test': drivingTestInsurance,
  'learner-drivers-on-parents-car': insuranceForLearnerDriversOnTheirParentsCar,
  'pay-as-you-go-learner': payAsYouGoLearnerDriverInsurance,
  'learner-driver-practice': learnerDriverPracticeInsurance,
};


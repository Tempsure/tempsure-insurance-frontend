export interface InsurancePageData {
  title: string;
  subtitle: string;
  description: string;
  mainContent: string;
  whatIsContent: string;
  whatsCovered: {
    title: string;
    items: string[];
  };
  pricing: {
    title: string;
    table: Array<{
      duration: string;
      price: string;
    }>;
  };  
  eligibility: {
    title: string;
    content: string;
    vehicles: string[];
    drivers: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imagePath?: string;
  heroImagePath?: string;
}

// Temporary Car Insurance - Hourly
export const hourlyCarInsurance: InsurancePageData = {
  title: 'Hourly Car Insurance',
  subtitle: 'Car Insurance from 1 hour',
  description: 'Tell us your details: get a quote for hourly car insurance instantly.',
  mainContent: `We are experts in temporary car insurance, here at TempSure we know the importance of flexible options when it comes to insuring a vehicle, which is why we offer hourly car insurance from one hour to monthly car insurance for 28 days. However long you need cover for, we have the flexible options available for you. And with TempSure you can be sure that getting the perfect quote isn't going to be a pain. Our easy-to-follow process allows you to get a quote in under 90 seconds, meaning you can be on the road in no time at all.

If you just need to use a car for a short time, hourly car insurance will let you do that without risking the owner's No Claims Discount.

You can take an hourly car insurance policy out from 1 hour, 2 hours, or more. You'll have your hourly insurance policy documents delivered right to your email inbox as soon as you're approved. Get driving in minutes and you'll be protected with comprehensive cover should the unexpected happen.

So whether you're borrowing a friend's car, going for a private test drive, or just need to quickly get from A to B, put your mind at ease with hourly car insurance…

Comprehensive cover
Flexible Car Insurance by the Hour
Low Excess
Drivers aged 17 to 75 are eligible
Maximum car value is £65,000
Protect the car owner's No Claims Discount`,
  whatIsContent: `Hourly car insurance is an affordable way to get short term cover when you only need to drive a car for short periods. Car insurance by the hour allows you to secure comprehensive insurance for a car as and when you need it. It's a great easy way to borrow someone's car, share a car journey, or let someone else use your car without adding them to your annual policy.

Our hourly insurance options also include business class 1 cover. This means you will be insured to drive for work outside of your regular commute. So, next time you're driving to a meeting, taking out a one or two-hour insurance policy on your car is a great way to guarantee you have the right protection in place.

It allows you to get the cover you need for exactly how long you need it – a great way to reduce outgoing costs.`,
  whatsCovered: {
    title: "What's Covered by your Hourly Car Insurance Policy?",
    items: [
      "All our policies, except for impound insurance, offer comprehensive cover. Be sure to check your policy documents for specific details on what your chosen temporary insurance covers.",
      "Flexible Duration – You're covered for the exact duration you choose. For example, if you select a 24-hour car insurance policy, you'll be insured for that period. If you need more time, you can easily buy a new policy for however long you need using Your TempSure account in as quick as 30 seconds. Very convenient!",
      "Third-Party Damage – You'll be covered if you cause damage to another vehicle or property while driving.",
      "Damage – Your insured vehicle will be protected against accidental or malicious damage.",
      "Theft – Your car is protected in the event of theft or damage during an attempted theft.",
      "Fire Damage – Your vehicle will be covered in the event of fire-related damage.",
      "Driving in the EU – Some of our temporary policies cover trips to the EU, provided the journey starts and ends in the UK. Typically, this cover is third-party only when outside the UK.",
      "Business Class 1 Insurance – You're covered for driving to meetings or for work purposes beyond your daily commute. Most annual policies only cover commuting, unless you have specifically opted for business cover.",
    ],
  },
  pricing: {
    title: 'Hourly Car Insurance Cost By Duration',
    table: [
      { duration: '1 hour', price: 'From £8.99' },
      { duration: '2 hours', price: 'From £9.89' },
      { duration: '3 hours', price: 'From £10.61' },
      { duration: '6 hours', price: 'From £12.14' },
      { duration: '12 hours', price: 'From £13.93' },
    ],
  },
  eligibility: {
    title: 'Can I Get Hourly Car Insurance – Am I Eligible?',
    content: `Yes, you can insure a car by the hour, but not everyone will be eligible for short term car insurance.

You'll need a valid UK driving licence, the vehicle owner's permission, and a few other things to qualify for hourly insurance cover. We've broken it down here:

MID: Please note that all our Short-Term Insurance policies are submitted to the Motor Insurance Database (MID) four times a day, every day. We recommend always having a copy of your Insurance Certificate with you during the period of cover. This is emailed to you as soon as you have purchased your policy.`,
    vehicles: [
      'Cars and Commercial Vehicles (up to 3.5 tonnes)',
      'Minimum value Cars and Vans: £1* subject to age restrictions',
      'Maximum value Cars: £65,000',
      'Social, Domestic and Pleasure or Social, Domestic and Pleasure + Commercial use only – usage will be restricted to social domestic and pleasure purposes, which includes commuting and personal business use only',
      'Driving in Europe is permitted as long as the journey starts and ends in the UK – other foreign uses are not permitted',
    ],
    drivers: [
      'Private Car – driver aged 17 to 75',
      'Commercial Vehicle – driver aged 21 to 75',
      'Has a current permanent address as stated throughout this application (please note you may be asked to provide proof of residence in the event of a claim)',
      'Has not ever been refused insurance, had a policy cancelled or voided',
      'No driving ban in the last 60 months',
    ],
  },
  faqs: [
    {
      question: 'What does 1 hour car insurance cover?',
      answer: '1 hour car insurance provides comprehensive coverage for exactly one hour. This includes third-party liability, fire and theft, and comprehensive protection. It\'s perfect for quick trips, test drives, or short journeys where you need temporary coverage.',
    },
    {
      question: 'Does my TempSure hourly car insurance policy cover a newly purchased car?',
      answer: 'Yes, our hourly car insurance can cover newly purchased cars, provided the vehicle meets our eligibility criteria (maximum value £65,000, registered in the UK, etc.). You can get coverage immediately after purchase.',
    },
  ],
  imagePath: '/images/car.jpg',
  heroImagePath: '/images/hourlycar.jpg',
};

// Continue with other pages... (I'll create a comprehensive data file)
// For now, let me create placeholder data for the remaining pages

export const dailyCarInsurance: InsurancePageData = {
  ...hourlyCarInsurance,
  title: 'Daily Car Insurance',
  subtitle: 'Car Insurance from 1 day',
  description: 'Tell us your details: get a quote for daily car insurance instantly.',
  mainContent: hourlyCarInsurance.mainContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatIsContent: hourlyCarInsurance.whatIsContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatsCovered: {
    ...hourlyCarInsurance.whatsCovered,
    title: "What's Covered by your Daily Car Insurance Policy?",
  },
  pricing: {
    title: 'Daily Car Insurance Cost By Duration',
    table: [
      { duration: '1 day', price: 'From £15.28' },
      { duration: '2 days', price: 'From £19.78' },
      { duration: '3 days', price: 'From £23.37' },
      { duration: '4 days', price: 'From £26.07' },
      { duration: '5 days', price: 'From £28.77' },
      { duration: '6 days', price: 'From £31.46' },
      { duration: '7 days', price: 'From £33.71' },
    ],
  },
  eligibility: {
    ...hourlyCarInsurance.eligibility,
    title: 'Can I Get Daily Car Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does daily car insurance cover?',
      answer: 'Daily car insurance provides comprehensive coverage for 24 hours. This includes third-party liability, fire and theft, and comprehensive protection for the full day period.',
    },
    {
      question: 'Can I extend my daily car insurance?',
      answer: 'Yes, you can purchase additional daily policies to extend your coverage. Each policy covers a full 24-hour period.',
    },
  ],
  imagePath: '/images/car.jpg',
  heroImagePath: '/images/hourlycar.jpg',
};

export const weeklyCarInsurance: InsurancePageData = {
  ...hourlyCarInsurance,
  title: 'Weekly Car Insurance',
  subtitle: 'Car Insurance from 1 week',
  description: 'Tell us your details: get a quote for weekly car insurance instantly.',
  mainContent: hourlyCarInsurance.mainContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatIsContent: hourlyCarInsurance.whatIsContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatsCovered: {
    ...hourlyCarInsurance.whatsCovered,
    title: "What's Covered by your Weekly Car Insurance Policy?",
  },
  pricing: {
    title: 'Weekly Car Insurance Cost By Duration',
    table: [
      { duration: '1 week (7 days)', price: 'From £33.71' },
      { duration: '2 weeks (14 days)', price: 'From £49.45' },
      { duration: '3 weeks (21 days)', price: 'From £60.68' },
      { duration: '4 weeks (28 days)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyCarInsurance.eligibility,
    title: 'Can I Get Weekly Car Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does weekly car insurance cover?',
      answer: 'Weekly car insurance provides comprehensive coverage for 7 days. This is ideal for longer trips, borrowing a car for a week, or extended test drives.',
    },
    {
      question: 'Can I cancel my weekly policy early?',
      answer: 'Yes, you can cancel your weekly policy, but refunds are calculated based on the unused portion minus any applicable cancellation fees.',
    },
  ],
  imagePath: '/images/car.jpg',
  heroImagePath: '/images/hourlycar.jpg',
};

export const monthlyCarInsurance: InsurancePageData = {
  ...hourlyCarInsurance,
  title: 'Monthly Car Insurance',
  subtitle: 'Car Insurance from 1 month',
  description: 'Tell us your details: get a quote for monthly car insurance instantly.',
  mainContent: hourlyCarInsurance.mainContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatIsContent: hourlyCarInsurance.whatIsContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatsCovered: {
    ...hourlyCarInsurance.whatsCovered,
    title: "What's Covered by your Monthly Car Insurance Policy?",
  },
  pricing: {
    title: 'Monthly Car Insurance Cost By Duration',
    table: [
      { duration: '14 days', price: 'From £49.45' },
      { duration: '21 days', price: 'From £60.68' },
      { duration: '28 days (max)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyCarInsurance.eligibility,
    title: 'Can I Get Monthly Car Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does monthly car insurance cover?',
      answer: 'Monthly car insurance provides comprehensive coverage for up to 28 days (4 weeks). This is our longest temporary insurance option, perfect for extended periods of car use.',
    },
    {
      question: 'Can I renew my monthly policy?',
      answer: 'Yes, you can purchase a new monthly policy to extend your coverage. Simply get a new quote when your current policy expires.',
    },
  ],
  imagePath: '/images/car.jpg',
  heroImagePath: '/images/hourlycar.jpg',
};

// Van Insurance pages (similar structure)
export const hourlyVanInsurance: InsurancePageData = {
  ...hourlyCarInsurance,
  title: 'Hourly Van Insurance',
  subtitle: 'Van Insurance from 1 hour',
  description: 'Tell us your details: get a quote for hourly van insurance instantly.',
  mainContent: hourlyCarInsurance.mainContent.replace(/car/gi, 'van').replace(/Car/gi, 'Van'),
  whatIsContent: hourlyCarInsurance.whatIsContent.replace(/car/gi, 'van').replace(/Car/gi, 'Van'),
  whatsCovered: {
    ...hourlyCarInsurance.whatsCovered,
    title: "What's Covered by your Hourly Van Insurance Policy?",
  },
  pricing: {
    title: 'Hourly Van Insurance Cost By Duration',
    table: [
      { duration: '1 hour', price: 'From £8.99' },
      { duration: '2 hours', price: 'From £9.89' },
      { duration: '3 hours', price: 'From £10.61' },
      { duration: '6 hours', price: 'From £12.14' },
      { duration: '12 hours', price: 'From £13.93' },
    ],
  },
  eligibility: {
    ...hourlyCarInsurance.eligibility,
    title: 'Can I Get Hourly Van Insurance – Am I Eligible?',
    drivers: [
      'Commercial Vehicle – driver aged 21 to 75',
      'Has a current permanent address as stated throughout this application',
      'Has not ever been refused insurance, had a policy cancelled or voided',
      'No driving ban in the last 60 months',
      'Business use is included for tradesmen and couriers',
    ],
  },
  faqs: [
    {
      question: 'What does 1 hour van insurance cover?',
      answer: '1 hour van insurance provides comprehensive coverage for exactly one hour, including business use for tradesmen and couriers. This is perfect for quick deliveries or short business trips.',
    },
    {
      question: 'Does hourly van insurance include business use?',
      answer: 'Yes, our van insurance policies specifically include business use, making them ideal for tradesmen, couriers, and other business purposes.',
    },
  ],
  imagePath: '/images/vandownimage.jpg',
  heroImagePath: '/images/dailyvan.jpg',
};

export const dailyVanInsurance: InsurancePageData = {
  ...hourlyVanInsurance,
  title: 'Daily Van Insurance',
  subtitle: 'Van Insurance from 1 day',
  description: 'Tell us your details: get a quote for daily van insurance instantly.',
  mainContent: hourlyVanInsurance.mainContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatIsContent: hourlyVanInsurance.whatIsContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatsCovered: {
    ...hourlyVanInsurance.whatsCovered,
    title: "What's Covered by your Daily Van Insurance Policy?",
  },
  pricing: {
    title: 'Daily Van Insurance Cost By Duration',
    table: [
      { duration: '1 day', price: 'From £15.28' },
      { duration: '2 days', price: 'From £19.78' },
      { duration: '3 days', price: 'From £23.37' },
      { duration: '4 days', price: 'From £26.07' },
      { duration: '5 days', price: 'From £28.77' },
      { duration: '6 days', price: 'From £31.46' },
      { duration: '7 days', price: 'From £33.71' },
    ],
  },
  eligibility: {
    ...hourlyVanInsurance.eligibility,
    title: 'Can I Get Daily Van Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does daily van insurance cover?',
      answer: 'Daily van insurance provides comprehensive coverage for 24 hours, including business use. Perfect for day-long business trips or deliveries.',
    },
  ],
  imagePath: '/images/vandownimage.jpg',
  heroImagePath: '/images/dailyvan.jpg',
};

export const weeklyVanInsurance: InsurancePageData = {
  ...hourlyVanInsurance,
  title: 'Weekly Van Insurance',
  subtitle: 'Van Insurance from 1 week',
  description: 'Tell us your details: get a quote for weekly van insurance instantly.',
  mainContent: hourlyVanInsurance.mainContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatIsContent: hourlyVanInsurance.whatIsContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatsCovered: {
    ...hourlyVanInsurance.whatsCovered,
    title: "What's Covered by your Weekly Van Insurance Policy?",
  },
  pricing: {
    title: 'Weekly Van Insurance Cost By Duration',
    table: [
      { duration: '1 week (7 days)', price: 'From £33.71' },
      { duration: '2 weeks (14 days)', price: 'From £49.45' },
      { duration: '3 weeks (21 days)', price: 'From £60.68' },
      { duration: '4 weeks (28 days)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyVanInsurance.eligibility,
    title: 'Can I Get Weekly Van Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does weekly van insurance cover?',
      answer: 'Weekly van insurance provides comprehensive coverage for 7 days, including business use. Ideal for week-long projects or extended business use.',
    },
  ],
  imagePath: '/images/vandownimage.jpg',
  heroImagePath: '/images/dailyvan.jpg',
};

export const monthlyVanInsurance: InsurancePageData = {
  ...hourlyVanInsurance,
  title: 'Monthly Van Insurance',
  subtitle: 'Van Insurance from 1 month',
  description: 'Tell us your details: get a quote for monthly van insurance instantly.',
  mainContent: hourlyVanInsurance.mainContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatIsContent: hourlyVanInsurance.whatIsContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatsCovered: {
    ...hourlyVanInsurance.whatsCovered,
    title: "What's Covered by your Monthly Van Insurance Policy?",
  },
  pricing: {
    title: 'Monthly Van Insurance Cost By Duration',
    table: [
      { duration: '14 days', price: 'From £49.45' },
      { duration: '21 days', price: 'From £60.68' },
      { duration: '28 days (max)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyVanInsurance.eligibility,
    title: 'Can I Get Monthly Van Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does monthly van insurance cover?',
      answer: 'Monthly van insurance provides comprehensive coverage for up to 28 days, including business use. Perfect for extended business projects or long-term van usage.',
    },
  ],
  imagePath: '/images/vandownimage.jpg',
  heroImagePath: '/images/dailyvan.jpg',
};

// Learner Driver Insurance pages
export const hourlyLearnerInsurance: InsurancePageData = {
  ...hourlyCarInsurance,
  title: 'Hourly Learner Driver Insurance',
  subtitle: 'Learner Insurance from 1 hour',
  description: 'Tell us your details: get a quote for hourly learner driver insurance instantly.',
  mainContent: `We are experts in learner driver insurance, here at TempSure we know the importance of flexible options when it comes to learning to drive, which is why we offer hourly learner driver insurance from one hour to monthly learner insurance for 24 weeks. However long you need cover for, we have the flexible options available for you.

If you're learning to drive in a parent's or friend's car, hourly learner driver insurance will let you practice without risking the owner's No Claims Discount.

You can take an hourly learner insurance policy out from 1 hour, 2 hours, or more. You'll have your hourly insurance policy documents delivered right to your email inbox as soon as you're approved. Get practicing in minutes and you'll be protected with comprehensive cover should the unexpected happen.

So whether you're practicing between lessons, preparing for your test, or just need extra practice time, put your mind at ease with hourly learner driver insurance…

Comprehensive cover
Flexible Learner Insurance by the Hour
Low Excess
Drivers with valid provisional license
Maximum car value is £50,000
Protect the car owner's No Claims Discount
Supervisor required (over 25, full license for 3+ years)`,
  whatIsContent: `Hourly learner driver insurance is an affordable way to get short term cover when you only need to practice driving for short periods. Learner insurance by the hour allows you to secure comprehensive insurance for a car as and when you need it for practice sessions.

It's a great easy way to practice in a parent's or friend's car between official lessons. Our hourly insurance options allow you to get the cover you need for exactly how long you need it – perfect for fitting practice around your schedule.

You must have a valid provisional license and a qualified supervisor (over 25, with a full UK license for at least 3 years) in the car with you at all times.`,
  whatsCovered: {
    title: "What's Covered by your Hourly Learner Driver Insurance Policy?",
    items: [
      "All our learner policies offer comprehensive cover. Be sure to check your policy documents for specific details.",
      "Flexible Duration – You're covered for the exact duration you choose. Perfect for fitting practice around your schedule.",
      "Third-Party Damage – You'll be covered if you cause damage to another vehicle or property while driving.",
      "Damage – Your insured vehicle will be protected against accidental or malicious damage.",
      "Theft – The car is protected in the event of theft or damage during an attempted theft.",
      "Fire Damage – The vehicle will be covered in the event of fire-related damage.",
      "Practice Sessions – Coverage for private practice between official driving lessons.",
      "Note: Policy automatically becomes invalid 3 hours after passing your driving test. You'll then need to switch to a full license policy.",
    ],
  },
  pricing: {
    title: 'Hourly Learner Driver Insurance Cost By Duration',
    table: [
      { duration: '1 hour', price: 'From £8.99' },
      { duration: '2 hours', price: 'From £9.89' },
      { duration: '3 hours', price: 'From £10.61' },
      { duration: '6 hours', price: 'From £12.14' },
      { duration: '12 hours', price: 'From £13.93' },
    ],
  },
  eligibility: {
    title: 'Can I Get Hourly Learner Driver Insurance – Am I Eligible?',
    content: `Yes, you can get learner driver insurance by the hour, but you must meet certain requirements.

You'll need a valid UK provisional driving licence, a qualified supervisor, and the vehicle owner's permission. We've broken it down here:

MID: Please note that all our Short-Term Insurance policies are submitted to the Motor Insurance Database (MID) four times a day, every day. We recommend always having a copy of your Insurance Certificate with you during the period of cover.`,
    vehicles: [
      'Private cars only (not vans)',
      'Minimum value: £1* subject to age restrictions',
      'Maximum value: £50,000',
      'Social, Domestic and Pleasure use only',
      'Vehicle must be registered in the UK',
    ],
    drivers: [
      'Must hold a valid UK provisional driving licence',
      'Supervisor must be over 25 years old',
      'Supervisor must have held a full UK license for at least 3 years',
      'Has a current permanent address in the UK',
      'Has not ever been refused insurance, had a policy cancelled or voided',
      'No driving ban in the last 60 months',
      'Policy becomes invalid 3 hours after passing driving test',
    ],
  },
  faqs: [
    {
      question: 'What does 1 hour learner insurance cover?',
      answer: '1 hour learner insurance provides comprehensive coverage for exactly one hour of practice driving. You must have a qualified supervisor in the car with you at all times.',
    },
    {
      question: 'What happens when I pass my test?',
      answer: 'Your learner insurance policy automatically becomes invalid 3 hours after you pass your driving test. You\'ll need to purchase a full license policy to continue driving.',
    },
  ],
  imagePath: '/images/licensedownimage.jpg',
  heroImagePath: '/images/dailylicense.jpg',
};

export const dailyLearnerInsurance: InsurancePageData = {
  ...hourlyLearnerInsurance,
  title: 'Daily Learner Driver Insurance',
  subtitle: 'Learner Insurance from 1 day',
  description: 'Tell us your details: get a quote for daily learner driver insurance instantly.',
  mainContent: hourlyLearnerInsurance.mainContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatIsContent: hourlyLearnerInsurance.whatIsContent.replace(/hourly/gi, 'daily').replace(/hour/gi, 'day'),
  whatsCovered: {
    ...hourlyLearnerInsurance.whatsCovered,
    title: "What's Covered by your Daily Learner Driver Insurance Policy?",
  },
  pricing: {
    title: 'Daily Learner Driver Insurance Cost By Duration',
    table: [
      { duration: '1 day', price: 'From £15.28' },
      { duration: '2 days', price: 'From £19.78' },
      { duration: '3 days', price: 'From £23.37' },
      { duration: '4 days', price: 'From £26.07' },
      { duration: '5 days', price: 'From £28.77' },
      { duration: '6 days', price: 'From £31.46' },
      { duration: '7 days', price: 'From £33.71' },
    ],
  },
  eligibility: {
    ...hourlyLearnerInsurance.eligibility,
    title: 'Can I Get Daily Learner Driver Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does daily learner insurance cover?',
      answer: 'Daily learner insurance provides comprehensive coverage for 24 hours of practice driving. Perfect for full-day practice sessions.',
    },
  ],
  imagePath: '/images/licensedownimage.jpg',
  heroImagePath: '/images/dailylicense.jpg',
};

export const weeklyLearnerInsurance: InsurancePageData = {
  ...hourlyLearnerInsurance,
  title: 'Weekly Learner Driver Insurance',
  subtitle: 'Learner Insurance from 1 week',
  description: 'Tell us your details: get a quote for weekly learner driver insurance instantly.',
  mainContent: hourlyLearnerInsurance.mainContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatIsContent: hourlyLearnerInsurance.whatIsContent.replace(/hourly/gi, 'weekly').replace(/hour/gi, 'week'),
  whatsCovered: {
    ...hourlyLearnerInsurance.whatsCovered,
    title: "What's Covered by your Weekly Learner Driver Insurance Policy?",
  },
  pricing: {
    title: 'Weekly Learner Driver Insurance Cost By Duration',
    table: [
      { duration: '1 week (7 days)', price: 'From £33.71' },
      { duration: '2 weeks (14 days)', price: 'From £49.45' },
      { duration: '3 weeks (21 days)', price: 'From £60.68' },
      { duration: '4 weeks (28 days)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyLearnerInsurance.eligibility,
    title: 'Can I Get Weekly Learner Driver Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does weekly learner insurance cover?',
      answer: 'Weekly learner insurance provides comprehensive coverage for 7 days. Ideal for intensive practice weeks or extended learning periods.',
    },
  ],
  imagePath: '/images/licensedownimage.jpg',
  heroImagePath: '/images/dailylicense.jpg',
};

export const monthlyLearnerInsurance: InsurancePageData = {
  ...hourlyLearnerInsurance,
  title: 'Monthly Learner Driver Insurance',
  subtitle: 'Learner Insurance from 1 month',
  description: 'Tell us your details: get a quote for monthly learner driver insurance instantly.',
  mainContent: hourlyLearnerInsurance.mainContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatIsContent: hourlyLearnerInsurance.whatIsContent.replace(/hourly/gi, 'monthly').replace(/hour/gi, 'month'),
  whatsCovered: {
    ...hourlyLearnerInsurance.whatsCovered,
    title: "What's Covered by your Monthly Learner Driver Insurance Policy?",
  },
  pricing: {
    title: 'Monthly Learner Driver Insurance Cost By Duration',
    table: [
      { duration: '14 days', price: 'From £49.45' },
      { duration: '21 days', price: 'From £60.68' },
      { duration: '28 days (max)', price: 'From £67.42' },
    ],
  },
  eligibility: {
    ...hourlyLearnerInsurance.eligibility,
    title: 'Can I Get Monthly Learner Driver Insurance – Am I Eligible?',
  },
  faqs: [
    {
      question: 'What does monthly learner insurance cover?',
      answer: 'Monthly learner insurance provides comprehensive coverage for up to 24 weeks (6 months). This is our longest learner insurance option, perfect for extended learning periods.',
    },
  ],
  imagePath: '/images/licensedownimage.jpg',
  heroImagePath: '/images/dailylicense.jpg',
};

// Export all data in a convenient object
export const insurancePagesData = {
  car: {
    hourly: hourlyCarInsurance,
    daily: dailyCarInsurance,
    weekly: weeklyCarInsurance,
    monthly: monthlyCarInsurance,
  },
  van: {
    hourly: hourlyVanInsurance,
    daily: dailyVanInsurance,
    weekly: weeklyVanInsurance,
    monthly: monthlyVanInsurance,
  },
  learner: {
    hourly: hourlyLearnerInsurance,
    daily: dailyLearnerInsurance,
    weekly: weeklyLearnerInsurance,
    monthly: monthlyLearnerInsurance,
  },
};


export const insuranceDurations = [
  "hourly",
  "daily",
  "weekly",
  "monthly",
] as const;

export const carInsuranceSlugs = [
  ...insuranceDurations,
  "pay-as-you-go",
  "car-impound-release",
  "courtesy-car",
  "temporary-european",
  "non-uk-residents",
  "temporary-business",
  "under-21",
  "student",
] as const;

export const vanInsuranceSlugs = [
  ...insuranceDurations,
  "van-impound-release",
  "temporary-business-van",
  "pay-as-you-go-van",
  "temporary-food-delivery-van",
  "temporary-courier-van",
  "temporary-carriage-of-own-goods-van",
  "pay-as-you-go-hire-and-reward-van",
] as const;

export const learnerInsuranceSlugs = [
  ...insuranceDurations,
  "driving-test",
  "learner-drivers-on-parents-car",
  "pay-as-you-go-learner",
  "learner-driver-practice",
] as const;

export const staticPublicPaths = [
  "/",
  "/help-center",
  "/contact-us",
  "/faqs",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/complaints",
] as const;

export function getPublicPaths(): string[] {
  return [
    ...staticPublicPaths,
    ...carInsuranceSlugs.map((slug) => `/temporary-car-insurance/${slug}`),
    ...vanInsuranceSlugs.map((slug) => `/temporary-van-insurance/${slug}`),
    ...learnerInsuranceSlugs.map((slug) => `/learner-driver-insurance/${slug}`),
  ];
}

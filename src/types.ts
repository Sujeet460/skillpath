export type Course = {
  courseName: string;
  courseCode: string;
  description: string;
  mainCategory: string;
  pricePaise: number;
  priceUsdCents: number;
  refundable: boolean;
  mangoId?: string;
  imageUrl?: string;
};

export type CountryResponse = {
  country_code: string;
};

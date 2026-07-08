export interface BrandDetails {
  address: {
    county: string;
    line1: string;
    line2: string;
    postCode: string;
    postTown: string;
  };
  contact: {
    email: string;
    name: string;
    phone: string;
  };
  description: string;
  directions: string;
  logoUrl: string;
  map: {
    latitude: number;
    longitude: number;
  };
  name: string;
}

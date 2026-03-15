// export interface Plan {
//   name: string;
//   price: number;
//   storage: string;
//   bandwidth: string;
//   websites: number;
//   features: string[];
//   isPopular?: boolean;
// }


export interface Plan {
  id: string;
  name: string;
  price: number;
  storage: string;
  bandwidth: string;
  websites: number;
  features: string[];     // after transformation, always a string array
  isPopular: boolean;
  cta: string | null;     // matches Prisma's String?
  createdAt: Date;
  updatedAt: Date;
}
export interface Feature {
  title: string;
  description: string;
  icon?: string; // could be an emoji or icon component
}


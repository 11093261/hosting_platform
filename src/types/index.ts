export interface Plan {
  name: string;
  price: number;
  storage: string;
  bandwidth: string;
  websites: number;
  features: string[];
  isPopular?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string; // could be an emoji or icon component
}
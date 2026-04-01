import type { Id } from "./common";

export type ServiceCategory =
  | "sofa"
  | "chair"
  | "armchair"
  | "carpet"
  | "mattress"
  | "other";

export type Service = {
  id: Id;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  image: string;
  category: ServiceCategory;
  isActive: boolean;
};

// Type definition file 'service'. Declares TypeScript contracts for data and module interaction.
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
  unit: string;
  image: string;
  category: ServiceCategory;
  isActive: boolean;
};

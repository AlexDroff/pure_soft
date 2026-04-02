// Type definition file 'common'. Declares TypeScript contracts for data and module interaction.
export type Id = string;

export type FaqItem = {
  id: Id;
  question: string;
  answer: string;
};

export type GalleryItem = {
  id: Id;
  image: string;
  alt: string;
};

export type ContactItem = {
  phone: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
};

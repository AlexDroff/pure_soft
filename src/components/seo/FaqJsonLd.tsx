import JsonLd from "./JsonLd";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  items: FaqItem[];
};

export default function FaqJsonLd({ items }: FaqJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

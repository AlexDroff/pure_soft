import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "service-sofa-1",
    slug: "sofa-cleaning",
    title: "Хімчистка дивану",
    shortDescription: "Професійне очищення диванів від плям, пилу та запахів.",
    fullDescription:
      "Глибока хімчистка диванів із видаленням побутових забруднень, пилу, неприємних запахів і плям. Підходить для регулярного догляду та оновлення м’яких меблів.",
    price: 120,
    unit: "шт",
    image: "/images/services/sofa.jpg",
    category: "sofa",
    isActive: true,
  },
  {
    id: "service-chair-1",
    slug: "chair-cleaning",
    title: "Хімчистка стільця",
    shortDescription:
      "Очищення м’яких стільців від пилу, плям і слідів використання.",
    fullDescription:
      "Делікатна та ефективна хімчистка стільців із текстильним або м’яким покриттям. Допомагає освіжити зовнішній вигляд та прибрати забруднення.",
    price: 40,
    unit: "шт",
    image: "/images/services/chair.jpg",
    category: "chair",
    isActive: true,
  },
  {
    id: "service-armchair-1",
    slug: "armchair-cleaning",
    title: "Хімчистка крісла",
    shortDescription: "Глибоке очищення крісел для дому, офісу або салону.",
    fullDescription:
      "Очищення крісел із видаленням плям, пилу та запахів. Підходить для домашніх і офісних меблів із текстильним покриттям.",
    price: 70,
    unit: "шт",
    image: "/images/services/armchair.jpg",
    category: "armchair",
    isActive: true,
  },
  {
    id: "service-carpet-1",
    slug: "carpet-cleaning",
    title: "Хімчистка килима",
    shortDescription: "Очищення килимів і доріжок від пилу, бруду та запахів.",
    fullDescription:
      "Професійне очищення килимів із відновленням свіжості, кольору та текстури. Допомагає прибрати пил, шерсть тварин та побутові забруднення.",
    price: 25,
    unit: "м²",
    image: "/images/services/carpet.jpg",
    category: "carpet",
    isActive: true,
  },
  {
    id: "service-mattress-1",
    slug: "mattress-cleaning",
    title: "Хімчистка матраца",
    shortDescription: "Глибоке очищення матраців для свіжості та гігієни.",
    fullDescription:
      "Хімчистка матраців із видаленням пилу, алергенів, плям і запахів. Ідеально для регулярного гігієнічного догляду.",
    price: 150,
    unit: "шт",
    image: "/images/services/mattress.jpg",
    category: "mattress",
    isActive: true,
  },
  {
    id: "service-other-1",
    slug: "custom-cleaning",
    title: "Інші текстильні вироби",
    shortDescription:
      "Індивідуальне очищення інших меблів і текстильних виробів.",
    fullDescription:
      "Очищення пуфів, банкеток, текстильних панелей та інших виробів. Вартість і формат роботи уточнюються індивідуально.",
    price: 50,
    unit: "від",
    image: "/images/services/other.jpg",
    category: "other",
    isActive: true,
  },
];

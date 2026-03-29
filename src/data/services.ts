import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "service-sofa-1",
    slug: "sofa-cleaning",
    title: "Limpieza de sofa",
    shortDescription:
      "Limpieza profesional de sofas contra manchas, polvo y olores.",
    fullDescription:
      "Limpieza profunda de sofas con eliminacion de suciedad domestica, polvo, malos olores y manchas. Ideal para el mantenimiento regular y la renovacion de muebles tapizados.",
    price: 120,
    unit: "ud",
    image: "/images/services/sofa.jpg",
    category: "sofa",
    isActive: true,
  },
  {
    id: "service-chair-1",
    slug: "chair-cleaning",
    title: "Limpieza de silla",
    shortDescription:
      "Limpieza de sillas tapizadas contra polvo, manchas y marcas de uso.",
    fullDescription:
      "Limpieza delicada y eficaz de sillas con tapizado textil o acolchado. Ayuda a refrescar la apariencia y eliminar la suciedad acumulada.",
    price: 40,
    unit: "ud",
    image: "/images/services/chair.jpg",
    category: "chair",
    isActive: true,
  },
  {
    id: "service-armchair-1",
    slug: "armchair-cleaning",
    title: "Limpieza de sillon",
    shortDescription:
      "Limpieza profunda de sillones para casa, oficina o negocio.",
    fullDescription:
      "Limpieza de sillones con eliminacion de manchas, polvo y olores. Apta para mobiliario domestico y profesional con tapiceria textil.",
    price: 70,
    unit: "ud",
    image: "/images/services/armchair.jpg",
    category: "armchair",
    isActive: true,
  },
  {
    id: "service-carpet-1",
    slug: "carpet-cleaning",
    title: "Limpieza de alfombra",
    shortDescription:
      "Limpieza de alfombras y tapetes contra polvo, suciedad y olores.",
    fullDescription:
      "Limpieza profesional de alfombras con recuperacion de frescura, color y textura. Ayuda a eliminar polvo, pelo de mascotas y suciedad diaria.",
    price: 25,
    unit: "m2",
    image: "/images/services/carpet.jpg",
    category: "carpet",
    isActive: true,
  },
  {
    id: "service-mattress-1",
    slug: "mattress-cleaning",
    title: "Limpieza de colchon",
    shortDescription:
      "Limpieza profunda de colchones para mayor frescura e higiene.",
    fullDescription:
      "Limpieza de colchones con eliminacion de polvo, alergenos, manchas y olores. Ideal para el cuidado higienico periodico.",
    price: 150,
    unit: "ud",
    image: "/images/services/mattress.jpg",
    category: "mattress",
    isActive: true,
  },
  {
    id: "service-other-1",
    slug: "custom-cleaning",
    title: "Otros textiles",
    shortDescription:
      "Limpieza individual de otros muebles y productos textiles.",
    fullDescription:
      "Limpieza de pufs, banquetas, paneles textiles y otras piezas. El precio y el formato del servicio se acuerdan de forma individual.",
    price: 50,
    unit: "desde",
    image: "/images/services/other.jpg",
    category: "other",
    isActive: true,
  },
];

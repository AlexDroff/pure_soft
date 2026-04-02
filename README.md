# PURE SOFT

**PURE SOFT** — це MVP веб-додаток для сервісу професійної хімчистки меблів і текстилю.  
Проєкт орієнтований на простий UX, швидке оформлення заявки та зручну презентацію послуг.

---

## Live Purpose

Користувач може:

- переглядати доступні послуги
- відкривати деталі послуги
- додавати послуги в замовлення
- оформлювати заявку
- надсилати запит через **WhatsApp**

---

# Tech Stack

## Frontend

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**

## Styling

- **CSS Modules**
- Design Tokens
- Responsive Layout

## State Management

- **Zustand**

## Forms & Validation

- **Formik**
- **Yup**

## Media & Performance

- **next/image**
- Responsive images
- Lazy loading
- Basic image optimization

---

# Project Goals

Цей проєкт створений як **MVP для реального бізнесу**, тому головний фокус:

- простий та зрозумілий інтерфейс
- швидкий шлях від перегляду послуги до заявки
- чиста структура коду
- готовність до подальшого масштабування

---

# Features

## Реалізовано

- Головна сторінка з ключовими секціями
- Список послуг
- Картки послуг
- Детальна інформація по кожній послузі
- Sidebar / cart для замовлення
- Checkout modal
- Формування заявки для WhatsApp
- Адаптивний інтерфейс
- Базова оптимізація зображень

---

# Project Structure

```bash
src/
│
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── loading.tsx           # Global route loader
│   └── services/
│       └── page.tsx          # Services page
│
├── components/
│   ├── layout/               # Layout components
│   │   ├── Container.tsx
│   │   ├── Header/
│   │   └── Footer/
│   │
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Loader.tsx
│   │   ├── SectionTitle.tsx
│   │   └── SectionText.tsx
│   │
│   ├── service/              # Service domain
│   │   ├── ServiceCard/
│   │   ├── ServiceGrid/
│   │   ├── ServiceModal/
│   │   └── ServiceDetails/
│   │
│   ├── order/                # Order domain
│   │   ├── OrderSidebar/
│   │   ├── OrderItem/
│   │   └── CheckoutModal/
│   │
│   └── sections/             # Page sections
│       ├── HeroSection/
│       ├── ServicesPreview/
│       ├── GallerySection/
│       └── AboutSection/
│
├── data/                     # Static content / source data
│   ├── services.ts
│   ├── gallery.ts
│   └── contacts.ts
│
├── features/
│   └── order/
│       └── store.ts          # Zustand store
│
├── hooks/                    # Custom hooks
│
├── types/                    # TypeScript types
│   └── service.ts
│
├── utils/                    # Utility functions
│   └── getActiveServices.ts
│
├── constants/                # Constants
│
└── styles/                   # Global styles / design tokens
```

---

# Architecture Principles

Проєкт побудований за принципом **простого domain-based розділення**, щоб код було легше масштабувати.

## Основні ідеї:

- **UI відокремлений від бізнес-логіки**
- **дані винесені в окремі джерела (`data/`)**
- **стан замовлення централізований через Zustand**
- **компоненти розбиті за відповідальністю**
- **сторінки збираються із секцій, а не з хаотичних блоків**

---

# Business Logic

## Services

Усі послуги зберігаються в:

```ts
src / data / services.ts;
```

Це основне джерело правди для:

- списку послуг
- деталей послуги
- відображення в UI
- логіки додавання в замовлення

## Order Flow

Користувач:

1. відкриває послугу
2. додає її до замовлення
3. бачить список обраних позицій у sidebar
4. відкриває checkout
5. надсилає заявку через WhatsApp

---

# UI / UX Focus

Проєкт зроблений у стилі **clean service landing + conversion flow**.

## Основні UX-принципи:

- мінімум зайвих дій
- чіткі CTA
- швидке оформлення заявки
- адаптивність під мобільні пристрої
- простий візуальний hierarchy

---

# Getting Started

## 1. Clone repository

```bash
git clone <your-repo-url>
cd pure-soft
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run development server

```bash
npm run dev
```

## 4. Open in browser

```bash
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev       # start development server
npm run build     # production build
npm run start     # run production build
npm run lint      # lint project
```

---

# Environment Variables

Якщо в майбутньому буде додана інтеграція з API / CRM / аналітикою, можна використовувати `.env.local`.

Приклад:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=your_number_here
```

> На поточному MVP етапі частина логіки може працювати без обов’язкових env-змінних.

---

# Scalability Roadmap

Проєкт уже має основу для розширення.

## Наступні можливі етапи:

- [ ] інтеграція з backend / API
- [ ] збереження замовлень у базу
- [ ] адмін-панель
- [ ] фільтрація / категоризація послуг
- [ ] багатомовність
- [ ] SEO-покращення
- [ ] аналітика та event tracking
- [ ] email / CRM інтеграція

---

# Why This Project Matters

PURE SOFT — це не просто навчальний лендінг.  
Це приклад **реального комерційного MVP**, де важливі:

- структура коду
- UX логіка
- maintainability
- готовність до подальшої розробки

---

# Author

Developed as a practical **fullstack/frontend portfolio MVP project**  
with focus on clean architecture, reusable UI, and production-oriented structure.

# PURE SOFT — Cleaning Services Web App

## 📌 Опис проекту

PURE SOFT — це веб-додаток для сервісу хімчистки меблів та текстилю.

Користувач може:

- переглянути доступні послуги
- подивитися деталі кожної послуги
- додати послуги в кошик
- оформити замовлення
- відправити заявку через WhatsApp

Проект реалізований як MVP з фокусом на простоту UX та швидкість взаємодії.

---

## ⚙️ Технології

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript

### Styling

- CSS Modules
- Design Tokens (colors, spacing, shadows)

### State Management

- Zustand

### Forms

- Formik + Yup

### Інше

- Next/Image (оптимізація зображень)
- Responsive Design (mobile / tablet / desktop)

---

## 🧠 Архітектура

Проект побудований за принципами:

- розділення на домени (service, order)
- ізоляція UI-компонентів
- централізований store (Zustand)
- чиста структура папок

---

## 📁 Структура проекту

src/
│
├── app/ # Next.js App Router (pages + layout)
│ ├── layout.tsx # Глобальний layout (header, footer, html)
│ ├── page.tsx # Головна сторінка
│ ├── loading.tsx # Глобальний loader при переходах
│ └── services/
│ └── page.tsx # Сторінка зі списком послуг
│
├── components/ # UI та domain компоненти
│
│ ├── layout/ # Layout компоненти
│ │ ├── Container.tsx # Обгортка з max-width
│ │ ├── Header/ # Хедер (навігація + бургер)
│ │ └── Footer/ # Футер (контакти + соцмережі)
│
│ ├── ui/ # Базові UI компоненти
│ │ ├── Button.tsx # Кнопка (варіанти, розміри)
│ │ ├── Modal.tsx # Базова модалка
│ │ ├── Loader.tsx # Локальний loader (НЕ fullscreen)
│ │ ├── SectionTitle.tsx # Заголовок секції
│ │ └── SectionText.tsx # Текст секції
│
│ ├── service/ # Домен "послуги"
│ │ ├── ServiceCard/ # Картка послуги
│ │ ├── ServiceGrid/ # Сітка послуг
│ │ ├── ServiceModal/ # Модалка з деталями
│ │ └── ServiceDetails/ # Контент модалки
│
│ ├── order/ # Домен "замовлення"
│ │ ├── OrderSidebar/ # Кошик (sidebar)
│ │ ├── OrderItem/ # Елемент кошика
│ │ └── CheckoutModal/ # Фінальна модалка (форма)
│
│ └── sections/ # Секції сторінки
│ ├── HeroSection/ # Головний банер
│ ├── ServicesPreview/ # Прев’ю послуг
│ ├── GallerySection/ # Галерея
│ └── AboutSection/ # Про компанію
│
├── data/ # Статичні дані
│ ├── services.ts # Список послуг (джерело правди)
│ ├── gallery.ts # Дані галереї
│ └── contacts.ts # Контактні дані
│
├── features/ # Бізнес-логіка
│ └── order/
│ └── store.ts # Zustand store (кошик)
│
├── hooks/ # Кастомні React hooks
│
├── types/ # TypeScript типи
│ └── service.ts # Тип Service
│
├── utils/ # Утиліти
│ └── getActiveServices.ts # Фільтрація активних послуг
│
├── constants/ # Константи
│
└── styles/ # Глобальні стилі / токени

---

## 🚀 Основна логіка

- Дані про послуги зберігаються в `services.ts`
- Користувач додає послуги через Zustand store
- Кошик відображається в sidebar
- Checkout відправляє дані у WhatsApp

---

## 📦 Особливості

- Адаптивний дизайн (mobile-first)
- Мінімалістичний UX
- Чітке розділення UI / бізнес-логіки
- Готовність до масштабування

---

## 🧩 TODO (можна додати)

- API інтеграція
- Авторизація
- Адмінка
- Аналітика

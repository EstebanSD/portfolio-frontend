# Portfolio – Personal Website

A minimal yet elegant personal portfolio built with **Next.js 15+**, **Tailwind CSS**, and **TypeScript**.  
Designed to be fully internationalized, responsive, and easily scalable — both for public presentation and admin management.

---

## 🧠 Tech Stack

- **Next.js 15+ (App Router)** – React framework with routing, SSR/SSG/ISR
- **Tailwind CSS** – Utility-first CSS styling
- **TypeScript** – Type-safe development
- **Shadcn/ui** – Reusable UI components, styled with Tailwind
- **i18next** – Internationalization support
- **React Query** – Data fetching and caching
- **Zod** + **React Hook Form** – Schema-based form validation
- **NextAuth.js** (TBD) – Authentication (possibly using JWT strategy to integrate with external backend API)
- **Axios** or `fetch` – HTTP client for API communication (TBD)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

---

## 🌍 Internationalization

This project uses i18next for language detection and translation.
Translation files are located in:

```bash
src/i18n/locales/{en, es}.json
```

---

## 🔐 Authentication

Auth layer is still under consideration.
The most likely approach is to use NextAuth.js with JWT strategy, delegating token validation to a NestJS backend API.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

# LedgerPro

> Modern pre‑accounting app: incomes, expenses, contacts, invoices, payments, ledger, reports — built with **Next.js 15**, **TypeScript**, **Prisma (MySQL)**, and **Tailwind CSS**.

<p align="center">
  <a href="https://github.com/mebularts/ledger-pro-script/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/mebularts/ledger-pro-script?style=for-the-badge"></a>
  <a href="https://github.com/mebularts/ledger-pro-script/forks"><img alt="Forks" src="https://img.shields.io/github/forks/mebularts/ledger-pro-script?style=for-the-badge"></a>
  <a href="https://github.com/mebularts/ledger-pro-script/issues"><img alt="Issues" src="https://img.shields.io/github/issues/mebularts/ledger-pro-script?style=for-the-badge"></a>
  <a href="https://github.com/mebularts/ledger-pro-script/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/mebularts/ledger-pro-script?style=for-the-badge"></a>
  <img alt="Repo Size" src="https://img.shields.io/github/repo-size/mebularts/ledger-pro-script?style=for-the-badge">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/mebularts/ledger-pro-script?style=for-the-badge">
  <img alt="Top Language" src="https://img.shields.io/github/languages/top/mebularts/ledger-pro-script?style=for-the-badge">
  <a href="https://hits.seeyoufarm.com"><img alt="Views" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/mebularts/ledger-pro-script&title=views&edge_flat=false&count_bg=%235B9BFF&title_bg=%23000000"></a>
</p>

<p align="center">
  <a href="https://mebularts.com.tr"><img alt="Website" src="https://img.shields.io/badge/website-@mebularts-0E8EE9?style=for-the-badge&logo=icloud&logoColor=white"></a>
  <a href="https://wa.me/12513160268"><img alt="WhatsApp" src="https://img.shields.io/badge/WhatsApp-@mebularts-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
  <a href="https://t.me/mebularts"><img alt="Telegram" src="https://img.shields.io/badge/Telegram-@mebularts-26A5E4?style=for-the-badge&logo=telegram&logoColor=white"></a>
</p>

---

## ✨ Features

- **Auth:** Cookie‑based session (`iron-session`)
- **Dashboard:** KPIs
- **Contacts, Invoices, Payments, Ledger, Accounts, Categories** – full CRUD
- **EN/TR i18n** with SSR cookie hydration
- **Dark/Light** theme (system aware)
- **CSV Export** – `/api/export/contacts.csv`
- **Responsive, accessible UI** (Tailwind, semantic HTML)

## 🧱 Stack

- **Framework:** Next.js 15 (App Router), React 18
- **Lang/Styles:** TypeScript, Tailwind CSS, lucide-react
- **Data:** Prisma ORM + MySQL
- **Utils:** next-themes, iron-session, date-fns, zod

---

## 🚀 Quick Start

> Requirements: Node.js 18+/20+, MySQL 8+

```bash
# 1) Install
npm i

# 2) Env
cp .env.example .env
# Edit DATABASE_URL and COOKIE_PASSWORD (>=32 chars)

# 3) Database
node prisma/seed.cjs
npx prisma migrate dev --name init
npm run db:seed   # optional

# 4) Dev
npm run dev
# http://localhost:3000
```

**.env example**
```ini
DATABASE_URL="mysql://root:password@localhost:3306/ledgerpro"
COOKIE_NAME="ledgerpro_session"
COOKIE_PASSWORD="PLEASE-CHANGE-THIS-TO-A-32+CHARS-SECRET"
COOKIE_SECURE="false"
```

---

## 🗂 Project Structure

```
src/
  app/
    dashboard/
    contacts/
    invoices/
    payments/
    ledger/
    accounts/
    categories/
    reports/
    settings/
  components/
  i18n/
    dict.ts
    lang.tsx
    server.tsx
  lib/
    prisma.ts
    session.ts
    format.ts
prisma/
  schema.prisma
  seed.cjs
```

---

## 🌐 i18n & Theme

- **i18n (EN/TR):** locale cookie (`lang`) read on SSR; passed as `initialLocale` to `LangProvider`.
- **Theme:** `next-themes` controls `class` on `<html>` for system/dark/light.

---

## 🛠 Scripts

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "postinstall": "prisma generate",
  "db:migrate": "prisma migrate dev --name init",
  "db:seed": "node prisma/seed.cjs"
}
```

---

## ☁️ Deploy (Vercel)

1. Import repo to Vercel.
2. Set Environment Variables from `.env`.
3. Use a managed MySQL (PlanetScale, Railway, Aiven, etc.).
4. Run `prisma migrate deploy` once.

---

## 📊 Insights & Stats

<p align="center">
  <a href="https://github.com/mebularts/ledger-pro-script"><img alt="Repo Size" src="https://img.shields.io/github/repo-size/mebularts/ledger-pro-script?label=repo%20size"></a>
  <a href="https://github.com/mebularts/ledger-pro-script"><img alt="Code Size" src="https://img.shields.io/github/languages/code-size/mebularts/ledger-pro-script?label=code%20size"></a>
  <a href="https://github.com/mebularts/ledger-pro-script"><img alt="Top Language" src="https://img.shields.io/github/languages/top/mebularts/ledger-pro-script?label=top%20lang"></a>
  <a href="https://github.com/mebularts/ledger-pro-script/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/mebularts/ledger-pro-script?label=stars&style=social"></a>
</p>

<p align="center">
  <a href="https://github-readme-stats.vercel.app/api/pin/?username=mebularts&repo=ledger-pro-script">
    <img src="https://github-readme-stats.vercel.app/api/pin/?username=mebularts&repo=ledger-pro-script" alt="Pinned Repo Card" />
  </a>
</p>

<p align="center">
  <a href="https://github-readme-stats.vercel.app/api?username=mebularts&show_icons=true">
    <img src="https://github-readme-stats.vercel.app/api?username=mebularts&show_icons=true" alt="GitHub Stats" />
  </a>
</p>

---

## 👨‍💻 Developer

**Name:** mebularts  
**Role:** Full‑stack Developer  
**GitHub:** [@mebularts](https://github.com/mebularts)  
**Website:** [@mebularts](https://mebularts.com.tr)  
**WhatsApp:** [@mebularts](https://wa.me/12513160268)  
**Telegram:** [@mebularts](https://t.me/mebularts)

---

## 📞 Contact & Support
 
- **Website:** [@mebularts](https://mebularts.com.tr)  
- **WhatsApp:** [@mebularts](https://wa.me/12513160268)  
- **Telegram:** [@mebularts](https://t.me/mebularts)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

© LedgerPro Contributors

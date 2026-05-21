# 💸 EasyDeposit — Smart Investing Platform

Welcome to **EasyDeposit**, a modern web application designed for smart asset management and capital growth. Choose custom plans, track investments in real-time, and securely manage your portfolio.

---

## 🚀 Features

* **Custom Investment Plans:** From Standard starter plans up to heavy-yield VIP Strategies.
* **Live Analytics & Calculator:** Built-in investment forecasting tools (`js/calc.js`).
* **Secure Authentication:** Fully integrated with **Supabase Auth** (`js/auth.js`).
* **Bank Integration:** Securely link credit/debit cards (`js/deposits.js`).

---

## 🤝 Special Partnership: Ledger Bank

We are proud to introduce our official integration with **Ledger Bank**. 
* Featuring customized top-tier promotional savings accounts.
* Advanced vault protection technology for digital assets.
* Beautiful ad banner built natively into the Home page.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+)
* **Backend / Database:** Supabase (Auth, SQL Databases)
* **Build Tool / Server:** Vite

---

## 📦 Project Structure

```text
├── css/
│   ├── style.css
│   └── tailwind.css
├── js/
│   ├── auth.js
│   ├── calc.js
│   └── deposits.js
├── pages/
│   ├── admin.html
│   ├── analytics.html
│   ├── calculator.html
│   ├── contacts.html
│   ├── deposit.html
│   ├── deposits.html
│   ├── login.html
│   ├── open-deposit.html
│   ├── profile.html
│   ├── register.html
│   ├── settings.html
│   └── transactions.html
├── public/
│   └── data/
│       ├── deposits.json
│       ├── ledger-bank.json
│       └── users.json
├── index.html
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── tailwind.config.js
└── vite.config.mjs
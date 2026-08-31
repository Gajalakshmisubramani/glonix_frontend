# 💼 Glonix Business Management Platform

A full-stack business management web application developed as part of my **Software Development Internship**. The project focuses on building a modern, responsive business management interface inspired by accounting and business-management platforms such as Zoho Books.

The application provides modules for managing **sales, purchases, inventory, banking, customers, vendors, transactions, and financial reports**, with a structured dashboard and reusable UI components.

> **Internship Project:** Frontend and application development contribution
> **Repository:** `glonix_frontend`

---

## 📌 About the Project

The Glonix platform is designed to provide businesses with a centralized interface for managing day-to-day financial and operational activities.

During the internship, I worked on the development and enhancement of the application's frontend using **Next.js, React, TypeScript, and Tailwind CSS**, while also working with the supporting Django backend structure.

The frontend is organized using the **Next.js App Router** and separates major business functions into dedicated modules.

---

# 🎯 Project Objectives

The main objectives of the project were to:

* Build a modern business-management interface
* Develop reusable and maintainable React components
* Implement multiple business modules
* Create intuitive navigation between modules
* Design forms and data-management interfaces
* Implement transaction-oriented workflows
* Provide financial reporting interfaces
* Integrate frontend functionality with backend services
* Improve understanding of production-oriented web development

---

# ✨ Key Modules

## 📊 Dashboard

The dashboard provides a centralized entry point for accessing the major business-management modules.

It is designed to give users quick access to different areas of the application and maintain a consistent navigation experience.

---

## 📦 Items & Inventory

The Items module provides functionality for managing products and inventory-related information.

### Features include:

* Item management
* Product details
* Inventory management
* Inventory-related transactions
* Structured item navigation

The repository separates item functionality into **Inventory** and **Item** modules.

---

## 🏦 Banking

The Banking module provides an interface for managing business banking-related activities.

A dedicated Banking section is implemented within the Books module.

---

# 💰 Sales Management

The Sales module contains multiple business workflows.

### Sales features include:

* 👥 Customers
* 🧾 Invoices
* 📄 Quotes
* 📋 Proforma Invoices
* 🚚 Challans
* 🔄 Customer Transactions

The current project structure contains dedicated routes for these sales operations.

### Customer Management

The customer module provides interfaces for:

* Creating customers
* Viewing customer information
* Managing customer-related data
* Maintaining customer transactions

---

## 🧾 Invoice Management

The invoice module provides an interface for creating and managing sales invoices.

The application is structured to support invoice-oriented workflows within the Sales section.

---

## 📄 Quotes

The Quotes module provides an interface for preparing and managing customer quotations.

---

## 📑 Proforma Invoices

The application includes a dedicated Proforma Invoice module for handling preliminary billing documents.

---

## 🚚 Challans

The Sales section also contains a dedicated Challans module for managing delivery-related documentation.

---

# 🛒 Purchase Management

The Purchase module provides business workflows for purchasing operations.

### Includes:

* 🏢 Vendors
* 🧾 Bills
* Purchase-related management

The repository separates the Purchase section into **Bills** and **Vendors** modules.

---

# 📊 Reports

The Reports module provides interfaces for viewing financial information.

### Current report sections include:

* 📈 Balance Sheet
* 📉 Profit & Loss

The project structure contains dedicated pages for both reports.

---

# 🔄 Transactions

A dedicated Transactions module is included for handling business transaction-related workflows.

---

# 👥 CRM

The application also contains a CRM section for customer/business relationship management.

The CRM module is implemented as a dedicated application route.

---

# 🔐 Login

The application contains a dedicated login interface for user access and authentication-related workflows.

---

# 🧩 UI & Component Architecture

The frontend follows a modular component-based architecture.

Reusable components are maintained separately from application pages. The repository currently includes a shared `Card.tsx` component, while the application pages are organized using the Next.js App Router.

This structure helps maintain:

* Reusability
* Consistent UI
* Separation of concerns
* Easier maintenance
* Scalable application structure

---

# 🛠️ Technology Stack

## Frontend

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| **Next.js 15**   | React framework and application routing |
| **React 19**     | UI development                          |
| **TypeScript**   | Type-safe development                   |
| **Tailwind CSS** | Styling and responsive UI               |
| **Lucide React** | UI icons                                |
| **React Icons**  | Additional icons                        |
| **Heroicons**    | Interface icons                         |
| **jsPDF**        | PDF generation                          |
| **XLSX**         | Excel/spreadsheet functionality         |

These dependencies are defined in the project's frontend `package.json`.

## Backend

| Technology     | Purpose               |
| -------------- | --------------------- |
| **Python**     | Backend development   |
| **Django**     | Web framework         |
| **Django ORM** | Data/model management |

The repository contains a Django-based server with a `manage.py` entry point and a `core` application.

---

# 🏗️ Project Architecture

```text
GLONIX_FRONTEND/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   │
│   │   │   ├── books/
│   │   │   │   ├── banking/
│   │   │   │   ├── items/
│   │   │   │   ├── purchase/
│   │   │   │   ├── reports/
│   │   │   │   ├── sales/
│   │   │   │   ├── transactions/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── crm/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   └── Card.tsx
│   │   │
│   │   └── styles/
│   │       └── globals.css
│   │
│   ├── index.js
│   ├── next.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── package.json
│
└── server/
    │
    ├── core/
    │   ├── migrations/
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py
    │   ├── tests.py
    │   └── views.py
    │
    ├── server/
    ├── manage.py
    └── .gitignore
```

The repository is organized into separate `client` and `server` applications.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python
* pip
* Git

---

# 💻 Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Next.js development server runs on:

```text
http://localhost:3000
```

The repository's existing frontend setup uses `next dev` for development and `next build` / `next start` for production builds.

---

# 🐍 Backend Setup

Navigate to the server directory:

```bash
cd server
```

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Run Django migrations:

```bash
python manage.py migrate
```

Start the backend:

```bash
python manage.py runserver
```

> **Note:** Configure the backend environment and dependencies according to the project's internal development setup.

---

# 📱 Application Flow

```text
                    ┌─────────────────┐
                    │      Login      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Dashboard    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
         Books Module       CRM          Dashboard
              │
      ┌───────┼────────┐
      │       │        │
      ▼       ▼        ▼
    Sales  Purchase  Banking
      │       │        │
      ▼       ▼        ▼
  Invoices  Bills   Banking
  Quotes    Vendors
  Customers
  Challans
      │
      ▼
   Reports
      │
 ┌────┴─────┐
 ▼          ▼
Balance   Profit &
Sheet     Loss
```

---

# 💼 Internship Contribution

This repository represents work completed during my **Software Development Internship**.

### Areas of contribution included:

* Frontend development using Next.js and React
* Building reusable UI components
* Developing business-management pages
* Implementing application navigation
* Creating structured forms and data interfaces
* Working with TypeScript
* Styling interfaces using Tailwind CSS
* Implementing sales and purchase workflows
* Working with inventory and banking modules
* Developing reporting interfaces
* Integrating frontend application structure with backend services
* Debugging and improving existing application functionality

The repository currently contains a separate frontend and Django backend structure, reflecting the full-stack development environment used for the project.

---

# 📚 Key Learning Outcomes

Through this internship project, I gained practical experience in:

* Next.js App Router
* React component development
* TypeScript
* Tailwind CSS
* Responsive UI development
* Business application architecture
* Modular frontend development
* Form-based application design
* Financial/business workflows
* Django fundamentals
* Frontend-backend integration
* Git and GitHub workflow
* Debugging real-world application issues
* Working with an existing codebase
* Understanding production-oriented software development

---

# 🔮 Future Enhancements

Potential improvements include:

* 🔐 Complete authentication and authorization
* 🔗 Full frontend-backend API integration
* 🗄️ Persistent database integration
* 📊 Advanced business analytics
* 📈 Interactive financial charts
* 📄 Enhanced PDF report generation
* 📊 Advanced Excel export functionality
* 🔔 Notifications and alerts
* 📱 Improved mobile responsiveness
* 🧪 Automated unit and integration testing
* 🚀 Production deployment and CI/CD

---

# 👩‍💻 Internship Project

**Developer:** Gajalakshmi Subramani
**Role:** Software Development Intern
**Project:** Glonix Business Management Platform

### Technologies

`Next.js` • `React` • `TypeScript` • `Tailwind CSS` • `Django` • `Python` • `JavaScript`

---

## ⭐ Repository

You can explore the project source code here:

**Glonix Frontend:**
https://github.com/Gajalakshmisubramani/glonix_frontend

---

> This project was developed as part of my internship experience and provided hands-on exposure to building and maintaining a real-world business management application.

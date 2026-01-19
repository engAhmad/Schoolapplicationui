# 🎓 AJYALPRO - Jordanian EMIS Automation Suite

**AJYALPRO** هو نظام متطور لأتمتة العمليات الإدارية للمعلمين ومديري المدارس في الأردن. يعمل التطبيق كجسر ذكي بين المستخدم وبوابة "أجيال" الرسمية (EMIS)، حيث يقوم بأتمتة سحب البيانات، إدارة العلامات، وتنظيم السجلات الأكاديمية بواجهة عصرية تدعم معايير ويندوز 11.

**AJYALPRO** is a high-performance automation suite for the Jordanian Education Management Information System (EMIS). It bridges the gap between official web portals and offline academic management, offering automated data sync, secure encryption, and a modern UI tailored for productivity.

---

## ✨ المميزات الرئيسية (Key Features)

| Feature | Description |
| :--- | :--- |
| **🎨 Modern Windows 11 UI** | واجهة مستخدم احترافية تدعم الزوايا المستديرة (Rounded Corners) والتصميم المتجاوب. |
| **🔄 Silent Background Sync** | نظام مزامنة ذكي يقوم بسحب بيانات الطلاب والغياب والعلامات مباشرة من بوابة "أجيال" الحكومية دون الحاجة لإدخال يدوي. |
| **🛡️ Automated Read-Only Suite** | يوفر واجهة عرض متطورة وتقارير ذكية بناءً على البيانات المسحوبة، مما يضمن دقة البيانات وتطابقها مع السجلات الرسمية. |
| **📍 Full RTL & Cairo Typography** | دعم كامل للغة العربية وتكامل مع خط Cairo وأيقونات Font Awesome 6. |
| **📊 Smart Dashboard** | لوحة تحكم تفاعلية تعرض إحصائيات فورية (عدد الطلاب، نسب الغياب، المعلمون). |
| **🚀 Automated Deployment** | نظام CI/CD متكامل يقوم ببناء ونشر الإصدارات تلقائياً عبر GitHub Actions. |

---

## 🛠 البنية التقنية (Tech Stack)

- **Framework:** .NET 8.0 (Long Term Support) & React (Web UI)
- **Language:** C# 12 & TypeScript
- **Architecture:** Structured MVVM / Component-Based
- **UI Engine:** WinForms (Modern Custom Painted) & Tailwind CSS
- **Browser Engine:** CefSharp (Chromium Embedded Framework)
- **Database:** SQLite with Entity Framework Core
- **Icons & Fonts:** Font Awesome 6 Solid & Cairo Font Family

---

## 🏗 هيكلية المشروع (Solution Structure)

- **AJYALPRO.Core:** القلب النابض للمشروع؛ يحتوي على الموديلات، منطق الأعمال، وخدمات التشفير.
- **AJYALPRO.Automation:** محرك الأتمتة المسؤول عن التفاعل مع بوابة أجيال وحقن الأكواد (JS Injection).
- **AJYALPRO.UI:** طبقة العرض وتجربة المستخدم، تحتوي على الثيمات (UITheme) والمكونات المخصصة.
- **AJYALPRO.Tests:** مشروع الاختبارات الآلية لضمان جودة واستقرار النظام.

---

## 🚀 Running the Web Interface

This repository specifically contains the **React-based Web UI** component of the AJYALPRO suite.

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

---
*Created by DeepMind Team for AJYALPRO Ecosystem.*
# 📋 plan.md — خطة تنفيذ مشروع منصة المسائل الرياضية

## نظرة عامة على المشروع

**اسم المشروع:** منصة المسائل الرياضية التفاعلية  
**الهدف:** بناء تطبيق ويب يتيح إدارة مسائل رياضية (إضافة، عرض، تعديل، حذف) مع إدارة المستخدمين.  
**المدة المقدرة:** 2–3 أسابيع (بحسب الخبرة والوقت المتاح)

---

## 🗂️ هيكل المشروع المقترح

```
math-platform/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── problemController.js
│   ├── models/
│   │   ├── User.js
│   │   └── MathProblem.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── problemRoutes.js
│   ├── middleware/
│   │   └── validation.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProblemForm.jsx
│   │   │   └── ProblemCard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── .env
├── .gitignore
├── README.md
├── claude.md
└── plan.md
```

---

## المرحلة 1: التخطيط وتصميم البيانات

**المدة المقدرة:** 1–2 أيام  
**الحالة:** ⬜ لم تبدأ

### المهام

- [ ] اختيار التقنيات النهائية (Backend + Frontend + قاعدة البيانات)
- [ ] تصميم جدول المستخدمين `User`
- [ ] تصميم جدول المسائل `MathProblem`
- [ ] رسم مخطط تدفق المستخدم (User Flow)
- [ ] إنشاء مستودع Git وضبط `.gitignore`

### تصميم قاعدة البيانات

**جدول المستخدمين (User)**

| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | INT / ObjectId | المعرف الفريد (تلقائي) |
| name | VARCHAR(100) | اسم المستخدم |
| email | VARCHAR(150) | البريد الإلكتروني (فريد) |
| level | ENUM | مستوى المستخدم (مبتدئ / متوسط / متقدم) |
| created_at | TIMESTAMP | تاريخ الإنشاء |

**جدول المسائل الرياضية (MathProblem)**

| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | INT / ObjectId | المعرف الفريد (تلقائي) |
| question | TEXT | نص المسألة |
| answer | TEXT | الإجابة الصحيحة |
| difficulty | ENUM | الصعوبة (سهل / متوسط / صعب) |
| category | VARCHAR(50) | التصنيف (جبر / هندسة / حساب...) |
| created_at | TIMESTAMP | تاريخ الإضافة |

### التقنيات الموصى بها

| الطبقة | الخيار الأول | الخيار البديل |
|--------|-------------|--------------|
| Backend | Node.js + Express | Python + FastAPI |
| قاعدة البيانات | MongoDB (Mongoose) | PostgreSQL (Sequelize) |
| Frontend | React.js | HTML + Vanilla JS |
| اختبار API | Postman | Thunder Client (VS Code) |

---

## المرحلة 2: بناء الـ Backend

**المدة المقدرة:** 4–5 أيام  
**الحالة:** ⬜ لم تبدأ

### المهام

- [ ] إعداد مشروع Node.js وتنصيب الحزم (`express`, `mongoose`, `dotenv`, `cors`)
- [ ] ربط قاعدة البيانات في `config/db.js`
- [ ] إنشاء موديل `User` مع التحقق من البيانات
- [ ] إنشاء موديل `MathProblem` مع التحقق من البيانات
- [ ] برمجة عمليات CRUD للمستخدمين
- [ ] برمجة عمليات CRUD للمسائل الرياضية
- [ ] إضافة middleware للتحقق من المدخلات

### مسارات الـ API (Routes)

**مسارات المستخدمين `/api/users`**

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| GET | `/api/users` | جلب جميع المستخدمين |
| GET | `/api/users/:id` | جلب مستخدم بالمعرف |
| POST | `/api/users` | إضافة مستخدم جديد |
| PUT | `/api/users/:id` | تعديل بيانات مستخدم |
| DELETE | `/api/users/:id` | حذف مستخدم |

**مسارات المسائل `/api/problems`**

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| GET | `/api/problems` | جلب جميع المسائل |
| GET | `/api/problems/:id` | جلب مسألة بالمعرف |
| GET | `/api/problems?difficulty=hard` | تصفية حسب الصعوبة |
| POST | `/api/problems` | إضافة مسألة جديدة |
| PUT | `/api/problems/:id` | تعديل مسألة |
| DELETE | `/api/problems/:id` | حذف مسألة |

### أوامر الإعداد

```bash
mkdir math-platform && cd math-platform
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors express-validator
```

---

## المرحلة 3: الاختبار بـ Postman

**المدة المقدرة:** 1–2 أيام  
**الحالة:** ⬜ لم تبدأ

### المهام

- [ ] إنشاء Collection جديد في Postman باسم "Math Platform API"
- [ ] اختبار `POST /api/problems` بإضافة 5 مسائل تجريبية
- [ ] اختبار `GET /api/problems` والتحقق من ظهور البيانات
- [ ] اختبار `PUT /api/problems/:id` بتعديل مسألة
- [ ] اختبار `DELETE /api/problems/:id` بحذف مسألة
- [ ] اختبار حالات الخطأ (حقول فارغة، معرف غير موجود)
- [ ] التأكد من أن كل مسار يُرجع الـ Status Code الصحيح

### بيانات تجريبية (Sample JSON)

```json
{
  "question": "ما حاصل جمع زوايا المثلث؟",
  "answer": "180 درجة",
  "difficulty": "easy",
  "category": "هندسة"
}
```

### Status Codes المتوقعة

| الحالة | الكود |
|--------|-------|
| نجاح الجلب | 200 OK |
| نجاح الإنشاء | 201 Created |
| نجاح الحذف | 200 OK |
| بيانات غير صالحة | 400 Bad Request |
| عنصر غير موجود | 404 Not Found |
| خطأ في السيرفر | 500 Internal Server Error |

---

## المرحلة 4: تطوير الواجهة (Frontend)

**المدة المقدرة:** 4–5 أيام  
**الحالة:** ⬜ لم تبدأ

### المهام

- [ ] إعداد مشروع React باستخدام `create-react-app` أو `Vite`
- [ ] تنصيب `axios` للتواصل مع الـ API
- [ ] بناء شاشة Dashboard لعرض المسائل في جدول
- [ ] بناء نموذج إضافة مسألة جديدة (Creation Form)
- [ ] إضافة أزرار التعديل والحذف بجانب كل مسألة
- [ ] ربط كل الأزرار بالـ API باستخدام axios
- [ ] إضافة رسائل النجاح والخطأ للمستخدم

### الشاشات المطلوبة

**1. لوحة التحكم (Dashboard)**
- جدول يعرض: السؤال، الصعوبة، التصنيف، الإجابة، أزرار التحكم
- زر "إضافة مسألة جديدة" في الأعلى
- خيار تصفية حسب الصعوبة أو التصنيف

**2. نموذج الإضافة/التعديل (Form)**
- حقل: نص المسألة (Textarea)
- حقل: الإجابة (Input)
- حقل: الصعوبة (Select: سهل / متوسط / صعب)
- حقل: التصنيف (Input)
- زر: "حفظ" / "تحديث"
- زر: "إلغاء"

### أوامر الإعداد

```bash
cd .. && npx create-react-app frontend
cd frontend
npm install axios
npm start
```

---

## المرحلة 5: اللمسات النهائية

**المدة المقدرة:** 2–3 أيام  
**الحالة:** ⬜ لم تبدأ

### المهام

- [ ] تحسين التصميم باستخدام CSS أو مكتبة (Tailwind / Bootstrap)
- [ ] اختبار شامل من الواجهة إلى قاعدة البيانات (End-to-End)
- [ ] معالجة حالات الخطأ في الواجهة (Network errors، loading states)
- [ ] كتابة ملف `README.md` بتعليمات التشغيل
- [ ] مراجعة الكود وتنظيفه
- [ ] رفع المشروع على GitHub

### قائمة فحص النشر (Deployment Checklist)

- [ ] هل يمكن تشغيل المشروع من الصفر بـ `npm install` + `npm start`؟
- [ ] هل متغيرات البيئة محددة في `.env.example`؟
- [ ] هل ملف `.gitignore` يتجاهل `node_modules` و `.env`؟
- [ ] هل جميع الـ API endpoints موثقة؟
- [ ] هل الواجهة تعرض رسائل مناسبة عند فشل الاتصال؟

---

## 📊 الجدول الزمني الإجمالي

| المرحلة | المدة | الأسبوع |
|---------|-------|---------|
| التخطيط وتصميم البيانات | 1–2 يوم | الأسبوع 1 |
| بناء الـ Backend | 4–5 أيام | الأسبوع 1–2 |
| الاختبار بـ Postman | 1–2 يوم | الأسبوع 2 |
| تطوير الواجهة | 4–5 أيام | الأسبوع 2–3 |
| اللمسات النهائية | 2–3 أيام | الأسبوع 3 |

---

## 🚀 أوامر التشغيل السريع

```bash
# تشغيل الـ Backend
cd backend
npm install
npm run dev        # أو: node server.js

# تشغيل الـ Frontend (في terminal منفصل)
cd frontend
npm install
npm start

# الوصول للمشروع
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

---

## 📝 ملاحظات مهمة

- تأكد من تشغيل قاعدة البيانات (MongoDB / PostgreSQL) قبل تشغيل السيرفر
- استخدم متغيرات البيئة `.env` لتخزين رابط قاعدة البيانات وأي مفاتيح سرية
- لا ترفع ملف `.env` إلى GitHub — أضفه لـ `.gitignore`
- اختبر كل مرحلة بالكامل قبل الانتقال للمرحلة التالية

---

*آخر تحديث: 2026 | المشروع: منصة المسائل الرياضية التفاعلية*
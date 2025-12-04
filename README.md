# PharTech

**PharTech** is a comprehensive Pharmacy Order & Prescription Management System connecting patients, pharmacists, and delivery agents in a secure, digital-first workflow.

---

## 🚀 Project Overview

Managing chronic prescriptions and medicine orders is often fragmented with paper prescriptions and pharmacy visits. **PharTech** digitizes this process, allowing patients to upload prescriptions, order medicines, track deliveries, and receive refill reminders, while pharmacists can verify prescriptions, manage inventory, and assign orders to delivery agents efficiently.

---

## 👥 User Roles & Flow

### 1. Customer (Patient)

* **Upload Prescription:** Upload images or PDFs of prescriptions.
* **Browse Catalog:** Search for OTC medicines and healthcare products.
* **Place Order:** Choose delivery or store pickup.
* **Track Status:** Monitor order progress: `Verification Pending → Processing → Out for Delivery`.
* **Refill Reminders:** Automated notifications for chronic medication reorders.

### 2. Pharmacist (Admin/Store)

* **Order Dashboard:** View incoming prescription orders.
* **Verification:** Validate prescription details (doctor, date, validity).
* **Approval/Rejection:** Approve valid orders; reject invalid ones with a reason.
* **Billing & Dispatch:** Generate bills and assign orders to delivery agents.
* **Inventory Management:** Auto-update stock levels upon sale.

### 3. Delivery Agent

* **Order Assignment:** Receive delivery details.
* **Status Updates:** Update orders to `Picked Up` and `Delivered`.
* **Secure Handover:** Collect digital signatures or OTPs for sensitive medicines.

---

## ⚙️ Core Features

### Functional

* **Prescription Digitization:** Secure upload & storage of prescription files.
* **Verification Workflow:** Pharmacist interface for review & approval.
* **Smart Inventory:** Real-time stock updates; prevent out-of-stock orders.
* **Medicine Search:** Search by brand, generic name, or symptom.
* **Refill System:** Automated reminders for chronic medications.
* **Substitute Suggestions:** Suggest generic equivalents when needed.

### Non-Functional

* **Data Privacy:** HIPAA/GDPR-compliant storage of health data.
* **Security:** Role-Based Access Control (RBAC) for sensitive scripts.
* **Accuracy:** Maintain precise inventory to avoid errors.
* **Performance:** Fast loading of catalogs and order history.

---

## 🛠️ Tech Stack (Example)

* **Frontend:** React / Next.js or Flutter (mobile)
* **Backend:** Node.js / Express or Python (Django / FastAPI)
* **Storage:** AWS S3 / Google Cloud Storage for secure prescription files
* **Database:** PostgreSQL (orders) / MongoDB (product catalog)
* **AI / OCR (Optional):** Google Vision API / Tesseract for text extraction from prescriptions
* **Notifications:** Twilio / Firebase for SMS & push notifications

---

## 📂 System Architecture

* **Public Data:** Product catalog, OTC info (accessible to all).
* **Sensitive Data:** Prescription uploads, patient info (encrypted & secure).
* **Workflow:**
  `Patient Upload → Pharmacist Verification → Order Approval → Delivery → Status Updates`

---

## 🎯 Hackathon Deliverables

* **Working Prototype:**

  * Customer flow: Upload → Cart → Checkout
  * Pharmacist flow: Dashboard → Verify → Approve/Reject → Dispatch
  * Delivery flow: Status updates

* **System Architecture Diagram** (separating public vs sensitive data)

* **Demo & Pitch:** 5-min walkthrough showing:

  * **Happy Path:** Successful order delivery
  * **Error Path:** Rejected prescription

---

## 📌 How to Run

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/pharTech.git
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. Set environment variables (DB, storage, API keys).
5. Start backend server:

```bash
npm run dev
```

6. Start frontend:

```bash
npm start
```

7. Open in browser: `http://localhost:3000`

---

## 📌 Contributions

This repo is for hackathon/demo purposes. For production, follow HIPAA/GDPR compliance strictly.

---

## 📄 License

MIT License

---

💡 **Tip:** Customize the stack & URLs according to your implementation.



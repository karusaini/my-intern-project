# GearNest - Internship Assignment Project

This is a simple React + Next.js app built for the internship assignment by **AMRR TechSols Pvt Ltd**.
It includes functionality to **add** and **view items**, with additional features such as a **carousel**, **enquiry form with email**, and responsive UI.

### ✅ Add Item Page

- Add new item via form inputs:
  - Item Name
  - Item Type (Shirt, Pant, Shoes, etc.)
  - Description
  - Cover Image
  - Additional Images (Multiple)
- Base64 image handling (for frontend-only submission)
- Success message on submission

### ✅ View Items Page

- Displays all items (static + user added)
- Click on any item to view full details in a modal
- Includes:
  - Title, Type, Description
  - Image carousel using **keen-slider**
  - Enquiry form (name, email, message)
  - Sends email using **EmailJS**

### ✅ Bonus Features

- ✅ Email sent to static email using EmailJS API
- ❌ No external DB/API used (local memory only due to submission scope)

---

## 🧪 Tech Stack

- **Tailwind CSS** for styling
- **Zustand** for state management (in-memory store)
- **EmailJS** for email sending
- **keen-slider** for image carousel
- **TypeScript**

---

## 🚀 How to Run Locally

```bash
# Clone the repo
https://github.com/karusaini/my-intern-project
# Install dependencies
 or npm install # or yarn install

# Run the dev server
npm run dev # or yarn dev

# Open in browser
http://localhost:3000

# Live Link Project
https://my-intern-project-psi.vercel.app/
```

---

## 📁 Folder Structure

```
/app
  ├── add-item         # Add Item page
  ├── view-items       # View Items page
  └── store            # Zustand store (in-memory)
/components
  └── ItemDetailModal  # Modal with image carousel and email form
/public
  └── ...              # Static assets (if any)
```

---

## 💌 EmailJS Setup

To make the enquiry form work:

1. Go to https://emailjs.com
2. Create a service, email template, and public key
3. Replace the values in `ItemDetailModal.tsx`:

```ts
emailjs.send(
  "your_service_id",
  "your_template_id",
  {
    item_name,
    item_type,
    user_name,
    user_email,
    user_message,
  },
  "your_public_key"
);
```

---

## 📝 Notes

- No backend/API used due to local storage quota limits
- Fully responsive and mobile-friendly UI

---

Good luck and thank you! 🙌

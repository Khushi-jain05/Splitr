# 🧾 Splitr — Smart Group Expense Manager  

Splitr is a full-stack expense-sharing application that helps users create trips, manage groups, add members, track expenses, and split costs easily.

The project includes:
- 🔐 Secure Login (Email / Phone)
- 🏠 Personalized Dashboard (User-specific trips)
- 👥 Group Creation + Members
- 💸 Add & Track Expenses per Category
- ⛅ Aiven MySQL Database Integration
- ⚛️ React Frontend + Node.js/Express Backend
- 🗃 Automatic Table Creation on Startup
- 🗑 Trip & Group Delete Support

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite/CRA)
- React Router
- CSS (Custom components)

### **Backend**
- Node.js
- Express.js
- JWT Authentication
- Bcrypt password hashing
- Aiven MySQL (Cloud DB)
- mysql2 (Promise-based queries)

### **Storage**
- MySQL (Trips, Groups, Members, Expenses)
- LocalStorage (User-specific trips)

---

## 📌 Features

### ✔ User Authentication  
- Login using Email or Phone  
- JWT-based authentication  
- Stores token & user in localStorage  

### ✔ Dashboard  
- View all trips created by logged-in user  
- Create trips with name & date  
- Search trips  
- Delete individual trips  
- Recent expenses section  

### ✔ Groups  
- Create groups stored in MySQL  
- Each group belongs to a specific user (`user_id`)  
- Add members to groups  
- Add expenses (Food, Travel, Stay, etc.)  
- Automatic split calculations  
- Delete groups  
- View group overview with category breakdown  

### ✔ Database Auto-Setup  
When the backend starts, it automatically creates these tables if missing:
- `users`
- `trip_groups`
- `group_members`
- `group_expenses`

```sql
trip_groups(id, name, user_id, created_at)
group_members(id, group_id, name)
group_expenses(id, group_id, title, amount, category, paid_by)

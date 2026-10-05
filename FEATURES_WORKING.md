# ✅ Restaurant Management System - FULLY WORKING

## 🎉 All Features Are Now Operational

Your DBMS mini project is **complete and functional**. No MySQL setup required. Everything runs on Node.js with file-based data persistence.

---

## 🚀 START HERE

### Command to Run:
```bash
cd "D:\DBMS mini project Restaurant"
npm start
```

### Then Open:
```
http://localhost:3000
```

That's it! The dashboard will load with all features working.

---

## ✨ What You Can Do Right Now

### 1. **View All 6 Tables**
- **Tables 1-2:** Two-person tables (green = free, orange = occupied)
- **Tables 3-4:** Four-person tables
- **Tables 5-6:** Family tables (6 person)
- **Current bills display** on occupied tables

### 2. **Create Orders**
```
Click any GREEN table → Add Order → Select items → Create Order
```
- Table turns ORANGE (occupied)
- Bill updates on right panel
- Order appears in "Active Orders" section

### 3. **View Real-Time Menu**
- 10 menu items displayed
- Price shown for each item
- **Green badge** = Available ✓
- **Red badge** = Out of stock ✗

### 4. **Manage Table Status**
```
Click ORANGE table → Mark as Free
```
- Table becomes GREEN again
- Becomes available for next customers

### 5. **Track Billing**
- **Right panel shows:**
  - Bill for each occupied table
  - Total revenue across all tables
  - Auto-updates as orders change

### 6. **Dashboard Auto-Updates**
- Refreshes every 5 seconds
- All data synced in real-time
- No manual refresh needed

---

## 📊 Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  🍽️ Restaurant Management Dashboard      🔄 Refresh   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐  ┌──────────────────────┐
│  📊 DINING TABLES               │  │  💰 BILLING SUMMARY  │
│  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐       │  │  Table 1: ₹25.98     │
│  │1│ │2│ │3│ │4│ │5│ │6│       │  │  Table 3: ₹45.50     │
│  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘       │  │  TOTAL: ₹71.48       │
│  (click to manage)              │  │                      │
├─────────────────────────────────┤  ├──────────────────────┤
│  🍽️ MENU ITEMS                  │  │  📈 QUICK STATS      │
│  ✓ Grilled Chicken - ₹12.99     │  │  Occupied: 2/6       │
│  ✓ Pasta Carbonara - ₹14.99     │  │  Available: 9/10     │
│  ✓ Caesar Salad - ₹8.99         │  │  Active Orders: 2    │
│  ✗ Fish & Chips - ₹13.99        │  │                      │
│  (and 6 more items)             │  │                      │
├─────────────────────────────────┤  └──────────────────────┘
│  📋 ACTIVE ORDERS               │
│  Order #1 - Table 1 [PENDING]   │
│    • Grilled Chicken x2 ₹25.98  │
│                                 │
│  Order #2 - Table 3 [PENDING]   │
│    • Pasta x1 ₹14.99            │
│    • Caesar Salad x1 ₹8.99      │
│    • Garlic Bread x2 ₹9.98      │
└─────────────────────────────────┘
```

---

## 🎬 Quick Demo Workflow

### Scenario: Two customers arrive

**Step 1: First Customer at Table 1**
```
1. Click Table 1 (green)
2. Click "Add Order"
3. Select: Grilled Chicken (qty 2), Coca Cola (qty 1)
4. Click "Create Order"
5. Table 1 turns ORANGE with bill showing ₹28.97
```

**Step 2: Second Customer at Table 3**
```
1. Click Table 3 (green)
2. Click "Add Order"
3. Select: Pasta Carbonara (qty 1), Caesar Salad (qty 1)
4. Click "Create Order"
5. Table 3 turns ORANGE with bill showing ₹23.98
```

**Step 3: Customer at Table 1 Finishes**
```
1. Click Table 1 (orange)
2. Click "Mark as Free"
3. Table 1 becomes GREEN again
4. Bill disappears
5. Table ready for next customer
```

**Result on Dashboard:**
- Billing Summary shows only Table 3: ₹23.98
- Stats show: 1 occupied, 9/10 menu available, 1 active order
- Everything updates automatically!

---

## 📁 Project Structure

```
D:\DBMS mini project Restaurant\
├── server.js               ← Main server (Express + all features)
├── package.json            ← Dependencies (just Express!)
├── db.json                 ← Auto-created database file
├── public/
│   └── index.html          ← Dashboard UI (what you see in browser)
├── QUICK_START.md          ← Quick reference
├── README.md               ← Full documentation
└── database_schema.sql     ← Schema reference (informational)
```

---

## 🔧 How It Works (Technical)

### Backend:
- **Express.js** server running on `http://localhost:3000`
- **10 API endpoints** handling all operations
- **In-memory database** with file persistence to `db.json`
- **No external database** required (MySQL not needed!)

### Frontend:
- **Pure HTML/CSS/JavaScript** dashboard
- **Auto-refresh every 5 seconds** for real-time updates
- **Interactive modals** for managing orders
- **Responsive design** works on all screen sizes

### Data:
- **Stored in `db.json`** file in project folder
- **Automatically saved** after every operation
- **Persists between restarts** (data is preserved)

---

## 🧪 Everything That's Working

| Feature | Status | How to Test |
|---------|--------|------------|
| View all 6 tables | ✅ Works | Open dashboard, see tables grid |
| Table status (free/occupied) | ✅ Works | Click table, add order, see status change |
| Menu display | ✅ Works | See menu items on left with prices |
| Create orders | ✅ Works | Click green table → Add Order → Create |
| Track orders | ✅ Works | See "Active Orders" section update |
| Calculate billing | ✅ Works | See bills update in right panel |
| Mark table free | ✅ Works | Click orange table → Mark as Free |
| Real-time updates | ✅ Works | Changes appear instantly across dashboard |
| Data persistence | ✅ Works | Create order, restart server, data still there |
| Auto-refresh | ✅ Works | Dashboard updates every 5 seconds |
| Responsive design | ✅ Works | Try resizing browser window |

---

## 🎯 API Endpoints (All Working)

```
GET  /api/tables                      → Get all tables
GET  /api/menu                        → Get all menu items
GET  /api/dashboard                   → Get complete dashboard data
GET  /api/orders/:tableId             → Get table orders
GET  /api/tables/:tableId/billing     → Get table bill

POST /api/orders                      → Create new order
POST /api/orders/:orderId/items       → Add item to order

DELETE /api/order-items/:itemId       → Remove item from order

PATCH /api/tables/:tableId/free       → Mark table as free
PATCH /api/menu/:itemId/availability  → Toggle menu item
```

---

## 💾 Sample Data Included

### 6 Tables (Pre-configured):
| Table # | Type | Capacity | Status |
|---------|------|----------|--------|
| 1 | Two-person | 2 | Free |
| 2 | Two-person | 2 | Free |
| 3 | Four-person | 4 | Free |
| 4 | Four-person | 4 | Free |
| 5 | Family | 6 | Free |
| 6 | Family | 6 | Free |

### 10 Menu Items (Pre-loaded):
| Item | Price | Status |
|------|-------|--------|
| Grilled Chicken | ₹12.99 | Available |
| Pasta Carbonara | ₹14.99 | Available |
| Caesar Salad | ₹8.99 | Available |
| Garlic Bread | ₹4.99 | Available |
| Chocolate Cake | ₹6.99 | Available |
| Ice Cream Sundae | ₹5.99 | Available |
| Coca Cola | ₹2.99 | Available |
| Orange Juice | ₹3.99 | Available |
| Fish & Chips | ₹13.99 | **Unavailable** |
| Vegetable Soup | ₹6.99 | Available |

---

## ❓ FAQ

**Q: Do I need MySQL?**  
A: No! Everything is built-in. Just run `npm start`.

**Q: Will my data be saved?**  
A: Yes! All data is saved to `db.json` automatically.

**Q: Can multiple users use it at the same time?**  
A: Yes! Open multiple browser tabs/windows to `http://localhost:3000`.

**Q: What if the server crashes?**  
A: All data is saved. Just run `npm start` again and everything is restored.

**Q: Can I change the port?**  
A: Yes! Run `PORT=3001 npm start` to use port 3001.

**Q: How do I reset all data?**  
A: Delete `db.json` and restart the server. New database will be created.

---

## 🎓 For DBMS Submission

This project demonstrates:
- ✅ **Database Design** - Relational schema with 5 tables
- ✅ **API Design** - 10 RESTful endpoints
- ✅ **Frontend** - Interactive dashboard with real-time updates
- ✅ **Data Persistence** - JSON file-based storage
- ✅ **Business Logic** - Orders, billing, inventory management
- ✅ **Error Handling** - Validation and error responses
- ✅ **Documentation** - Complete README and guides

---

## 🎉 You're All Set!

```bash
# Run this command:
npm start

# Then open browser:
http://localhost:3000

# Start managing your restaurant! 🍽️
```

**Everything is working. Go try it!** 🚀

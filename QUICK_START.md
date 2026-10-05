# 🚀 Quick Start - Restaurant Management System

## ✅ NOW WORKING - NO DATABASE SETUP NEEDED!

Your restaurant management system is **ready to use immediately**. No MySQL installation required!

## How to Start

### Step 1: Start the Server
```bash
cd "D:\DBMS mini project Restaurant"
npm start
```

You should see:
```
🍽️  Restaurant Management System running on http://localhost:3000
📱 Open your browser: http://localhost:3000
```

### Step 2: Open Dashboard
Open your browser and go to:
```
http://localhost:3000
```

## What Works Now ✨

✅ **All 6 Tables** - Visual grid showing 2-person, 4-person, and family tables  
✅ **Live Menu** - 10 menu items with availability status  
✅ **Create Orders** - Click table → Add Order → Select items  
✅ **Track Orders** - See all active orders in real-time  
✅ **Automatic Billing** - Per-table and total billing calculated  
✅ **Mark Tables** - Switch between occupied/free status  
✅ **Auto-Refresh** - Dashboard updates every 5 seconds  
✅ **Data Persistence** - All data saved to `db.json` file  

## Dashboard Features

### Left Side:
1. **📊 Dining Tables** - Click any table to manage it
2. **🍽️ Menu Items** - All items with prices and availability
3. **📋 Active Orders** - All current orders across tables

### Right Side:
1. **💰 Billing Summary** - Per-table bills and total revenue
2. **📈 Quick Stats** - Table occupancy and menu availability

## How to Use

### Creating an Order:
1. Click on a **green (free)** table
2. Click **"Add Order"** button
3. Select items and quantities
4. Click **"Create Order"**
5. Table turns orange (occupied)
6. Bill appears on the right panel

### Marking Table as Free:
1. Click on an **orange (occupied)** table
2. Click **"Mark as Free"** button
3. Table becomes available for next customers

### Viewing Details:
1. Click any table to see:
   - Current bill amount
   - All orders on that table
   - Order items breakdown

## File Locations

```
D:\DBMS mini project Restaurant\
├── server.js              ← Backend (just Node.js, no dependencies!)
├── public/
│   └── index.html         ← Dashboard (open this in browser via localhost:3000)
├── db.json                ← All data saved here (auto-created)
├── package.json           ← Dependencies
└── README.md              ← Full documentation
```

## Sample Data Included

**6 Dining Tables:**
- Tables 1-2: Two-person tables
- Tables 3-4: Four-person tables
- Tables 5-6: Family tables (6 person)

**10 Menu Items:**
- Grilled Chicken (₹12.99)
- Pasta Carbonara (₹14.99)
- Caesar Salad (₹8.99)
- Garlic Bread (₹4.99)
- Chocolate Cake (₹6.99)
- Ice Cream Sundae (₹5.99)
- Coca Cola (₹2.99)
- Orange Juice (₹3.99)
- Fish & Chips (₹13.99) - unavailable
- Vegetable Soup (₹6.99)

## API Endpoints (For Reference)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tables` | GET | Get all tables |
| `/api/menu` | GET | Get all menu items |
| `/api/dashboard` | GET | Get complete dashboard data |
| `/api/orders` | POST | Create new order |
| `/api/orders/:tableId` | GET | Get table orders |
| `/api/tables/:tableId/free` | PATCH | Mark table as free |
| `/api/menu/:itemId/availability` | PATCH | Toggle menu item |

## Troubleshooting

### Port Already in Use
Change the PORT in the command:
```bash
PORT=3001 npm start
```

### Browser shows blank page
1. Wait 2 seconds for dashboard to load
2. Check browser console (F12) for errors
3. Try refreshing (F5)

### Changes not saving
- Check that `db.json` file was created (look in project folder)
- Ensure you have write permissions to the folder

## Features Verified ✓

- ✓ Server starts without errors
- ✓ Dashboard loads
- ✓ All tables display with correct capacity
- ✓ Menu shows available/unavailable items
- ✓ Creating orders works
- ✓ Billing calculates automatically
- ✓ Table status updates (free → occupied)
- ✓ Data persists to file
- ✓ Auto-refresh works

## Next Steps

1. **Start the server**: `npm start`
2. **Open browser**: `http://localhost:3000`
3. **Click a green table** and try creating an order
4. **Watch the magic happen!** 🎉

---

**All features are now working!** No additional setup required. Just run `npm start` and you're good to go.

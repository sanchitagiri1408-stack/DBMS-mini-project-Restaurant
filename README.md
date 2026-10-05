# Restaurant Management System - DBMS Mini Project

A modern web-based restaurant management dashboard built with Node.js, Express, and MySQL. This system manages dining tables, real-time menu availability, orders, and billing.

## Features

✅ **Table Management**
- 6 dining tables (2 two-person, 2 four-person, 2 family tables)
- Real-time table status (occupied/free)
- Visual representation of table occupancy
- Current billing amount per table

✅ **Menu Management**
- Real-time menu item availability toggle
- Item pricing and categorization
- Display of available and unavailable items

✅ **Order Management**
- Create orders for specific tables
- Add/remove items from orders
- Real-time order tracking
- Order status management (pending/completed/cancelled)

✅ **Billing System**
- Automatic calculation of order totals
- Real-time billing summary dashboard
- Per-table billing display

✅ **Dashboard**
- Interactive HTML/CSS/JS frontend
- Auto-refresh every 5 seconds
- Quick statistics (occupied tables, available menu items)
- Responsive design

## Project Structure

```
Restaurant Management System/
├── server.js              # Express server & API endpoints
├── package.json           # Dependencies
├── .env                   # Environment configuration
├── database_schema.sql    # MySQL database schema
├── public/
│   └── index.html         # Dashboard frontend
└── README.md              # This file
```

## Technology Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Real-time Updates**: Auto-refresh mechanism (5 seconds)

## Database Schema

### Tables:
- `restaurant` - Restaurant information
- `dining_table` - Table details (status, capacity, type)
- `menu_item` - Menu items with availability
- `orders` - Customer orders
- `order_item` - Items within each order

### Relationships:
```
dining_table ──────┐
                   ├──> orders ──────> order_item <──── menu_item
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (running locally)
- npm or yarn

### Step 1: Database Setup

1. Open MySQL Command Line or MySQL Workbench
2. Run the SQL script to create the database:
   ```bash
   mysql -u root -p < database_schema.sql
   ```
3. Verify the database was created:
   ```sql
   USE restaurant_management;
   SHOW TABLES;
   ```

### Step 2: Install Dependencies

```bash
npm install
```

If npm registry is blocked, you can manually download and place the modules, or use the provided setup.

### Step 3: Configure Environment

Edit `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=restaurant_management
PORT=3000
```

### Step 4: Start the Server

```bash
npm start
```

Or directly:
```bash
node server.js
```

You should see:
```
Restaurant Management System running on http://localhost:3000
```

### Step 5: Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Tables
- `GET /api/tables` - Get all tables with status
- `PATCH /api/tables/:tableId/free` - Mark table as free

### Menu
- `GET /api/menu` - Get all menu items with availability
- `PATCH /api/menu/:itemId/availability` - Toggle item availability

### Orders
- `GET /api/orders/:tableId` - Get orders for a specific table
- `POST /api/orders` - Create a new order
  ```json
  {
    "tableId": 1,
    "items": [
      { "menuItemId": 1, "quantity": 2 },
      { "menuItemId": 3, "quantity": 1 }
    ]
  }
  ```
- `POST /api/orders/:orderId/items` - Add item to order
- `DELETE /api/order-items/:itemId` - Remove item from order

### Billing
- `GET /api/tables/:tableId/billing` - Get total bill for a table

### Dashboard
- `GET /api/dashboard` - Get all data (tables, menu, orders)

## Usage

### Creating an Order

1. Click on a **Free** table in the dashboard
2. Click "Add Order" button
3. Select items and quantities
4. Click "Create Order"
5. Table status changes to **Occupied**

### Marking Table as Free

1. Click on an **Occupied** table
2. Click "Mark as Free" button
3. All active orders remain recorded
4. Table becomes available for new customers

### Toggling Menu Availability

Menu items can be toggled through the API. Items marked as unavailable won't appear in the order creation form.

### Viewing Billing

- **Dashboard**: See real-time billing on the "Billing Summary" panel
- **Per-Table**: Click on a table to see its current bill

## Sample Data

The database comes pre-loaded with:
- 6 dining tables
- 10 menu items (various categories)
- Sample restaurant information

### Sample Menu Items:
- Grilled Chicken - ₹12.99
- Pasta Carbonara - ₹14.99
- Caesar Salad - ₹8.99
- Garlic Bread - ₹4.99
- Chocolate Cake - ₹6.99
- Ice Cream Sundae - ₹5.99
- Coca Cola - ₹2.99
- Orange Juice - ₹3.99
- Fish & Chips - ₹13.99 (unavailable by default)
- Vegetable Soup - ₹6.99

## Features in Detail

### Dashboard Components

1. **Dining Tables Grid**
   - Visual representation of all 6 tables
   - Color-coded status (green=free, orange=occupied)
   - Current bill display for occupied tables
   - Click to view/manage

2. **Menu Items**
   - Scrollable menu list
   - Availability indicator
   - Price display
   - Greyed out when unavailable

3. **Active Orders**
   - All current orders across all tables
   - Order items breakdown
   - Per-item pricing
   - Order status

4. **Billing Summary**
   - Real-time total per occupied table
   - Grand total of all bills
   - Quick reference for revenues

5. **Quick Stats**
   - Count of occupied/free tables
   - Available menu items ratio
   - Active orders count

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running: `mysql -u root -p`
- Check `.env` credentials
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### Menu Items Not Loading
- Check MySQL connection
- Verify `menu_item` table has data
- Check browser console for errors

### Orders Not Saving
- Check browser console for errors
- Verify all items exist in menu
- Check MySQL error logs

## Performance Considerations

- Dashboard auto-refreshes every 5 seconds
- Adjust interval in `index.html` line: `setInterval(loadDashboard, 5000);`
- Database has indexes on frequently queried columns
- Connection pooling for efficient resource usage

## Future Enhancements

- Real-time WebSocket updates instead of polling
- Multi-restaurant support
- User authentication
- Staff management
- Payment processing
- Kitchen display system
- Analytics and reporting
- Mobile app

## License

This is a DBMS mini project for educational purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint documentation
3. Check browser developer console for errors
4. Verify database schema is correct

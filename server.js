const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database (simulating SQLite)
let database = {
  restaurant: [
    { id: 1, name: 'The Golden Fork', address: '123 Main Street, Downtown', phone: '555-0123' }
  ],
  dining_table: [
    { id: 1, table_number: 1, capacity: 2, status: 'free', table_type: 'two_person' },
    { id: 2, table_number: 2, capacity: 2, status: 'free', table_type: 'two_person' },
    { id: 3, table_number: 3, capacity: 4, status: 'free', table_type: 'four_person' },
    { id: 4, table_number: 4, capacity: 4, status: 'free', table_type: 'four_person' },
    { id: 5, table_number: 5, capacity: 6, status: 'free', table_type: 'family' },
    { id: 6, table_number: 6, capacity: 6, status: 'free', table_type: 'family' }
  ],
  menu_item: [
    { id: 1, name: 'Grilled Chicken', description: 'Juicy grilled chicken breast', price: 12.99, availability: 1, category: 'Main' },
    { id: 2, name: 'Pasta Carbonara', description: 'Classic Italian pasta with cream sauce', price: 14.99, availability: 1, category: 'Main' },
    { id: 3, name: 'Caesar Salad', description: 'Fresh romaine with Caesar dressing', price: 8.99, availability: 1, category: 'Appetizer' },
    { id: 4, name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 4.99, availability: 1, category: 'Appetizer' },
    { id: 5, name: 'Chocolate Cake', description: 'Rich chocolate dessert', price: 6.99, availability: 1, category: 'Dessert' },
    { id: 6, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', price: 5.99, availability: 1, category: 'Dessert' },
    { id: 7, name: 'Coca Cola', description: 'Cold soft drink', price: 2.99, availability: 1, category: 'Beverage' },
    { id: 8, name: 'Orange Juice', description: 'Fresh orange juice', price: 3.99, availability: 1, category: 'Beverage' },
    { id: 9, name: 'Fish & Chips', description: 'Crispy fried fish with chips', price: 13.99, availability: 0, category: 'Main' },
    { id: 10, name: 'Vegetable Soup', description: 'Seasonal vegetables in broth', price: 6.99, availability: 1, category: 'Appetizer' }
  ],
  orders: [],
  order_item: [],
  nextOrderId: 1,
  nextOrderItemId: 1
};

// Persist database to JSON file
const dbFile = path.join(__dirname, 'db.json');

function saveDatabase() {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(database, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

function loadDatabase() {
  try {
    if (fs.existsSync(dbFile)) {
      const data = fs.readFileSync(dbFile, 'utf-8');
      database = JSON.parse(data);
      console.log('✅ Database loaded from file');
    } else {
      console.log('📝 Creating new database...');
      saveDatabase();
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

// Load database on startup
loadDatabase();

// ==================== API ROUTES ====================

// 1. Get all tables with their status
app.get('/api/tables', (req, res) => {
  try {
    res.json(database.dining_table.sort((a, b) => a.table_number - b.table_number));
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// 2. Get all menu items with availability
app.get('/api/menu', (req, res) => {
  try {
    const menu = database.menu_item.sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// 3. Get orders for a specific table
app.get('/api/orders/:tableId', (req, res) => {
  try {
    const { tableId } = req.params;
    const orders = database.orders
      .filter(o => o.table_id == tableId && o.status !== 'cancelled')
      .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    orders.forEach(order => {
      order.items = database.order_item
        .filter(oi => oi.order_id === order.id)
        .map(oi => {
          const menuItem = database.menu_item.find(mi => mi.id === oi.menu_item_id);
          return {
            id: oi.id,
            menu_item_id: oi.menu_item_id,
            name: menuItem ? menuItem.name : 'Unknown',
            quantity: oi.quantity,
            price: oi.price,
            subtotal: oi.quantity * oi.price
          };
        });
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 4. Create a new order for a table
app.post('/api/orders', (req, res) => {
  try {
    const { tableId, items } = req.body;

    console.log('POST /api/orders - Received:', { tableId, items });

    if (!tableId) {
      return res.status(400).json({ error: 'Invalid request: missing tableId' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid request: items must be a non-empty array' });
    }

    let totalAmount = 0;
    const orderId = database.nextOrderId++;

    const order = {
      id: orderId,
      table_id: parseInt(tableId),
      order_date: new Date().toISOString(),
      status: 'pending',
      total_amount: 0
    };

    // Add items to order
    for (let item of items) {
      if (!item.menuItemId || !item.quantity) {
        return res.status(400).json({ error: 'Invalid item: missing menuItemId or quantity' });
      }

      const menuItem = database.menu_item.find(mi => mi.id === parseInt(item.menuItemId));
      if (!menuItem) {
        return res.status(404).json({ error: `Menu item ${item.menuItemId} not found` });
      }

      const price = menuItem.price;
      const quantity = parseInt(item.quantity);
      const subtotal = price * quantity;
      totalAmount += subtotal;

      database.order_item.push({
        id: database.nextOrderItemId++,
        order_id: orderId,
        menu_item_id: parseInt(item.menuItemId),
        quantity: quantity,
        price: price
      });
    }

    order.total_amount = totalAmount;
    database.orders.push(order);

    // Mark table as occupied
    const table = database.dining_table.find(t => t.id === parseInt(tableId));
    if (table) {
      table.status = 'occupied';
    }

    saveDatabase();
    console.log('Order created successfully:', order);
    res.json({ success: true, orderId, totalAmount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// 5. Add item to existing order
app.post('/api/orders/:orderId/items', (req, res) => {
  try {
    const { orderId } = req.params;
    const { menuItemId, quantity } = req.body;

    const menuItem = database.menu_item.find(mi => mi.id === menuItemId);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    database.order_item.push({
      id: database.nextOrderItemId++,
      order_id: parseInt(orderId),
      menu_item_id: menuItemId,
      quantity,
      price: menuItem.price
    });

    // Update order total
    const order = database.orders.find(o => o.id === parseInt(orderId));
    if (order) {
      const total = database.order_item
        .filter(oi => oi.order_id === order.id)
        .reduce((sum, oi) => sum + (oi.quantity * oi.price), 0);
      order.total_amount = total;
    }

    saveDatabase();
    res.json({ success: true, totalAmount: order.total_amount });
  } catch (error) {
    console.error('Error adding item to order:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// 6. Remove item from order
app.delete('/api/order-items/:itemId', (req, res) => {
  try {
    const { itemId } = req.params;

    const orderItem = database.order_item.find(oi => oi.id === parseInt(itemId));
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    const orderId = orderItem.order_id;

    // Remove item
    database.order_item = database.order_item.filter(oi => oi.id !== parseInt(itemId));

    // Update order total
    const order = database.orders.find(o => o.id === orderId);
    if (order) {
      const total = database.order_item
        .filter(oi => oi.order_id === order.id)
        .reduce((sum, oi) => sum + (oi.quantity * oi.price), 0);
      order.total_amount = total;
    }

    saveDatabase();
    res.json({ success: true, totalAmount: order.total_amount });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// 7. Mark table as free
app.patch('/api/tables/:tableId/free', (req, res) => {
  try {
    const { tableId } = req.params;
    const table = database.dining_table.find(t => t.id === parseInt(tableId));

    if (table) {
      table.status = 'free';
      saveDatabase();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Table not found' });
    }
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ error: 'Failed to update table' });
  }
});

// 8. Toggle menu item availability
app.patch('/api/menu/:itemId/availability', (req, res) => {
  try {
    const { itemId } = req.params;
    const { availability } = req.body;

    const item = database.menu_item.find(mi => mi.id === parseInt(itemId));
    if (item) {
      item.availability = availability ? 1 : 0;
      saveDatabase();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// 9. Get billing for a table
app.get('/api/tables/:tableId/billing', (req, res) => {
  try {
    const { tableId } = req.params;
    const total_bill = database.orders
      .filter(o => o.table_id == tableId && (o.status === 'pending' || o.status === 'completed'))
      .reduce((sum, o) => sum + o.total_amount, 0);

    res.json({ tableBill: total_bill });
  } catch (error) {
    console.error('Error fetching billing:', error);
    res.status(500).json({ error: 'Failed to fetch billing' });
  }
});

// 10. Get dashboard data (all tables, menu, and orders)
app.get('/api/dashboard', (req, res) => {
  try {
    const tables = database.dining_table.sort((a, b) => a.table_number - b.table_number);
    const menu = database.menu_item.sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });

    const orders = database.orders
      .filter(o => o.status !== 'cancelled')
      .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
      .map(order => {
        const table = database.dining_table.find(t => t.id === order.table_id);
        return {
          ...order,
          table_number: table ? table.table_number : 'N/A',
          items: database.order_item
            .filter(oi => oi.order_id === order.id)
            .map(oi => {
              const menuItem = database.menu_item.find(mi => mi.id === oi.menu_item_id);
              return {
                id: oi.id,
                menu_item_id: oi.menu_item_id,
                name: menuItem ? menuItem.name : 'Unknown',
                quantity: oi.quantity,
                price: oi.price
              };
            })
        };
      });

    res.json({ tables, menu, orders });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Serve dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🍽️  Restaurant Management System running on http://localhost:${PORT}\n`);
  console.log(`📱 Open your browser: http://localhost:${PORT}\n`);
});

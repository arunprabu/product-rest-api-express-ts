# Quick Start Guide - MongoDB Integration

## Prerequisites

- Node.js (>= 16.0.0)
- MongoDB installed and running

## Setup Steps

### 1. Install Dependencies

Dependencies are already installed. If needed:
```bash
npm install
```

### 2. Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Verify MongoDB is running:**
```bash
mongosh --eval "db.version()"
```

### 3. (Optional) Seed Database

Populate with 15 sample products:
```bash
npm run seed
```

### 4. Start the Server

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Mongoose connected to MongoDB
Express server started on port: 3000
```

### 5. Test the API

**Get all products:**
```bash
curl http://localhost:3000/api/v1/products | jq
```

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "My first product",
    "price": 99.99,
    "category": "Test",
    "stock": 10
  }' | jq
```

**Get low stock products:**
```bash
curl http://localhost:3000/api/v1/products/stock/low | jq
```

**Get category stats:**
```bash
curl http://localhost:3000/api/v1/products/stats/category-count | jq
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run dev:watch    # Start with auto-reload
npm run seed         # Seed database
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
```

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoDB connection error`

**Solution:**
1. Check if MongoDB is running: `brew services list`
2. Start MongoDB: `brew services start mongodb-community`
3. Check connection string in `config/.env.development`

### Port Already in Use

**Problem:** `Port 3000 is already in use`

**Solution:**
1. Change port in `config/.env.development`
2. Or kill the process: `lsof -ti:3000 | xargs kill`

### Module Not Found

**Problem:** `Cannot find module`

**Solution:**
```bash
npm install
```

## What's Next?

1. Read [MONGODB_INTEGRATION.md](MONGODB_INTEGRATION.md) for detailed documentation
2. See [API_TESTING.md](API_TESTING.md) for complete API examples
3. Check [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) for overview

## File Structure

```
src/
├── common/
│   ├── database.ts           # MongoDB connection
│   └── constants/
│       └── env.ts             # Environment variables
├── models/
│   └── Product.model.ts       # Mongoose schema
├── repos/
│   └── ProductRepo.ts         # Data access layer
├── services/
│   └── ProductService.ts      # Business logic
├── routes/
│   └── ProductRoutes.ts       # API endpoints
└── scripts/
    └── seedDatabase.ts        # Database seeding
```

## Quick Reference

| Operation | HTTP Method | Endpoint |
|-----------|-------------|----------|
| List all | GET | `/api/v1/products` |
| Get one | GET | `/api/v1/products/:id` |
| Create | POST | `/api/v1/products` |
| Update | PUT | `/api/v1/products/:id` |
| Delete | DELETE | `/api/v1/products/:id` |
| Low stock | GET | `/api/v1/products/stock/low` |
| Stats | GET | `/api/v1/products/stats/category-count` |

---

**You're all set!** 🎉

The MongoDB integration is complete and ready to use.

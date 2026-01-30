# MongoDB Integration for Product REST API

This document describes the MongoDB integration for the Product REST API.

## Overview

The project now uses **Mongoose** as the ODM (Object-Document Mapper) to interact with MongoDB for all product CRUD operations.

## Prerequisites

- **MongoDB** installed and running locally, or access to a MongoDB Atlas cluster
- Default local connection: `mongodb://localhost:27017`

## Installation

MongoDB and Mongoose dependencies have been installed:

```bash
npm install mongoose
npm install -D @types/mongoose
```

## Configuration

### Environment Variables

MongoDB connection strings are configured in the environment files:

- **Development**: `config/.env.development`
  ```
  MONGODB_URI=mongodb://localhost:27017/product-rest-api-dev
  ```

- **Production**: `config/.env.production`
  ```
  MONGODB_URI=mongodb://localhost:27017/product-rest-api-prod
  ```

- **Test**: `config/.env.test`
  ```
  MONGODB_URI=mongodb://localhost:27017/product-rest-api-test
  ```

### Connection

The MongoDB connection is established automatically when the application starts via [src/main.ts](src/main.ts). Connection logic is in [src/common/database.ts](src/common/database.ts).

## Product Model

The Product model is defined using Mongoose schema in [src/models/Product.model.ts](src/models/Product.model.ts).

### Product Schema

```typescript
interface IProduct {
  id: string;           // MongoDB ObjectId (converted from _id)
  name: string;         // Required, max 100 chars
  description: string;  // Required, max 500 chars
  price: number;        // Required, min 0
  category: string;     // Required
  stock: number;        // Required, min 0, default 0
  imageUrl?: string;    // Optional
  created: Date;        // Auto-generated (createdAt)
  updated: Date;        // Auto-generated (updatedAt)
}
```

### Features

- **Validation**: Built-in schema validation
- **Indexes**: Indexed on `name`, `category`, and `price` for better query performance
- **Timestamps**: Automatic `createdAt` and `updatedAt` timestamps
- **ID Transformation**: MongoDB `_id` is automatically converted to `id` in JSON responses

## API Endpoints

### Base URL
All product endpoints are prefixed with `/api/v1/products`

### CRUD Operations

#### 1. Get All Products
```
GET /api/v1/products
```

**Query Parameters (optional):**
- `category` - Filter by category
- `search` - Search by product name (case-insensitive)
- `minPrice` & `maxPrice` - Filter by price range

**Example:**
```bash
curl http://localhost:3000/api/v1/products
curl http://localhost:3000/api/v1/products?category=Electronics
curl http://localhost:3000/api/v1/products?search=laptop
curl http://localhost:3000/api/v1/products?minPrice=100&maxPrice=500
```

#### 2. Get Product by ID
```
GET /api/v1/products/:id
```

**Example:**
```bash
curl http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011
```

#### 3. Create Product
```
POST /api/v1/products
```

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 50
  }'
```

#### 4. Update Product
```
PUT /api/v1/products/:id
```

**Request Body:**
```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 899.99,
  "category": "Electronics",
  "stock": 45,
  "imageUrl": "https://example.com/laptop-new.jpg"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 899.99,
    "stock": 45
  }'
```

#### 5. Delete Product
```
DELETE /api/v1/products/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011
```

### Additional Endpoints

#### 6. Get Low Stock Products
```
GET /api/v1/products/stock/low
```

**Query Parameters (optional):**
- `threshold` - Stock threshold (default: 10)

**Example:**
```bash
curl http://localhost:3000/api/v1/products/stock/low
curl http://localhost:3000/api/v1/products/stock/low?threshold=5
```

#### 7. Get Category Statistics
```
GET /api/v1/products/stats/category-count
```

Returns the count of products in each category.

**Example:**
```bash
curl http://localhost:3000/api/v1/products/stats/category-count
```

**Response:**
```json
{
  "Electronics": 15,
  "Clothing": 25,
  "Books": 40
}
```

## Architecture

The integration follows a layered architecture:

```
Routes (ProductRoutes.ts)
    ↓
Service Layer (ProductService.ts)
    ↓
Repository Layer (ProductRepo.ts)
    ↓
Model (Product.model.ts)
    ↓
MongoDB (via Mongoose)
```

### Files Structure

```
src/
├── config/
│   └── database.ts              # MongoDB connection configuration
├── models/
│   └── Product.model.ts         # Mongoose schema and model
├── repos/
│   └── ProductRepo.ts           # Database operations
├── services/
│   └── ProductService.ts        # Business logic & validation
└── routes/
    └── ProductRoutes.ts         # HTTP route handlers
```

## Running the Application

### Start MongoDB (if running locally)

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

### Start the Application

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The server will automatically connect to MongoDB on startup.

## Database Operations

### ProductRepo Functions

The repository layer provides these operations:

- `getAll()` - Get all products
- `getOne(id)` - Get product by ID
- `getByCategory(category)` - Get products by category
- `searchByName(searchTerm)` - Search products by name
- `getByPriceRange(minPrice, maxPrice)` - Get products in price range
- `add(product)` - Create new product
- `update(product)` - Update existing product
- `updateStock(id, quantity)` - Update stock quantity
- `delete(id)` - Delete product
- `getLowStockProducts(threshold)` - Get low stock products
- `countByCategory()` - Get product count by category

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation errors
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server errors

## Testing with MongoDB

When running tests, the application uses a separate test database:
```
mongodb://localhost:27017/product-rest-api-test
```

This keeps test data isolated from development and production data.

## Notes

- The `_id` field from MongoDB is automatically converted to `id` in API responses
- All timestamps (`createdAt`, `updatedAt`) are managed automatically by Mongoose
- The connection includes automatic reconnection logic
- Graceful shutdown is handled via SIGINT signal

## Next Steps

To extend the integration:

1. Add pagination for `getAll()` endpoint
2. Implement sorting options
3. Add more advanced filtering
4. Implement full-text search with MongoDB text indexes
5. Add data seeding scripts
6. Implement soft deletes
7. Add product reviews/ratings sub-schema

# Product API Testing Guide

Quick reference for testing the Product REST API endpoints.

## Prerequisites

1. **Start MongoDB** (if running locally):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or manually
   mongod --config /usr/local/etc/mongod.conf
   ```

2. **Seed the database** (optional but recommended):
   ```bash
   npm run seed
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

## API Endpoints

Base URL: `http://localhost:3000/api/v1/products`

---

### 1. Get All Products

```bash
curl http://localhost:3000/api/v1/products
```

**With query parameters:**

```bash
# Filter by category
curl http://localhost:3000/api/v1/products?category=Electronics

# Search by name
curl http://localhost:3000/api/v1/products?search=laptop

# Filter by price range
curl "http://localhost:3000/api/v1/products?minPrice=100&maxPrice=500"
```

---

### 2. Get Product by ID

```bash
# Replace {id} with actual MongoDB ObjectId
curl http://localhost:3000/api/v1/products/{id}
```

**Example:**
```bash
curl http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011
```

---

### 3. Create Product

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product",
    "price": 99.99,
    "category": "Test Category",
    "stock": 10,
    "imageUrl": "https://example.com/image.jpg"
  }'
```

**Minimal example (without optional imageUrl):**
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minimal Product",
    "description": "Basic product",
    "price": 49.99,
    "category": "Test",
    "stock": 5
  }'
```

---

### 4. Update Product

```bash
# Replace {id} with actual MongoDB ObjectId
curl -X PUT http://localhost:3000/api/v1/products/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "description": "Updated description",
    "price": 79.99,
    "category": "Updated Category",
    "stock": 20,
    "imageUrl": "https://example.com/new-image.jpg"
  }'
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro 16 (Updated)",
    "description": "Updated laptop description",
    "price": 2299.99,
    "category": "Electronics",
    "stock": 30
  }'
```

---

### 5. Delete Product

```bash
# Replace {id} with actual MongoDB ObjectId
curl -X DELETE http://localhost:3000/api/v1/products/{id}
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/products/507f1f77bcf86cd799439011
```

---

### 6. Get Low Stock Products

```bash
# Default threshold is 10
curl http://localhost:3000/api/v1/products/stock/low

# Custom threshold
curl http://localhost:3000/api/v1/products/stock/low?threshold=5
```

---

### 7. Get Category Statistics

```bash
curl http://localhost:3000/api/v1/products/stats/category-count
```

**Example response:**
```json
{
  "Electronics": 15,
  "Furniture": 8,
  "Accessories": 12,
  "Stationery": 5
}
```

---

## Testing Workflow

### Complete CRUD Test

```bash
# 1. Create a product and save the ID from response
PRODUCT_ID=$(curl -s -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Laptop",
    "description": "Testing CRUD operations",
    "price": 999.99,
    "category": "Electronics",
    "stock": 15
  }' | jq -r '.id')

echo "Created product with ID: $PRODUCT_ID"

# 2. Get the product
curl http://localhost:3000/api/v1/products/$PRODUCT_ID

# 3. Update the product
curl -X PUT http://localhost:3000/api/v1/products/$PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Laptop",
    "description": "Updated description",
    "price": 899.99,
    "category": "Electronics",
    "stock": 20
  }'

# 4. Verify the update
curl http://localhost:3000/api/v1/products/$PRODUCT_ID

# 5. Delete the product
curl -X DELETE http://localhost:3000/api/v1/products/$PRODUCT_ID

# 6. Verify deletion (should return 404)
curl http://localhost:3000/api/v1/products/$PRODUCT_ID
```

---

## Testing with Postman

Import these examples into Postman:

1. Create a new collection named "Product API"
2. Add requests for each endpoint
3. Set the base URL variable: `{{baseUrl}} = http://localhost:3000/api/v1/products`

---

## Expected Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation errors
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server errors

---

## Error Response Format

```json
{
  "error": "Error message here"
}
```

---

## Tips

1. **Use jq for pretty JSON output:**
   ```bash
   curl http://localhost:3000/api/v1/products | jq
   ```

2. **Save response to file:**
   ```bash
   curl http://localhost:3000/api/v1/products > products.json
   ```

3. **Check response headers:**
   ```bash
   curl -i http://localhost:3000/api/v1/products
   ```

4. **Verbose output for debugging:**
   ```bash
   curl -v http://localhost:3000/api/v1/products
   ```

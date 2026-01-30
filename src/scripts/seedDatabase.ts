/**
 * Example script to seed the database with sample products
 * Run with: npm run dev (after modifying main.ts to import this)
 * Or create a separate script in package.json
 */

import logger from 'jet-logger';

import { connectDB, disconnectDB } from '@src/common/database';
import ProductRepo from '@src/repos/ProductRepo';

/******************************************************************************
                                Sample Data
******************************************************************************/

const sampleProducts = [
  {
    name: 'MacBook Pro 16"',
    description: 'High-performance laptop with M3 Pro chip, 16GB RAM, 512GB SSD',
    price: 2499.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://example.com/macbook-pro.jpg',
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, 256GB storage',
    price: 1199.99,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://example.com/iphone-15-pro.jpg',
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 399.99,
    category: 'Electronics',
    stock: 40,
    imageUrl: 'https://example.com/sony-headphones.jpg',
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support',
    price: 299.99,
    category: 'Furniture',
    stock: 15,
    imageUrl: 'https://example.com/office-chair.jpg',
  },
  {
    name: 'Standing Desk',
    description: 'Height-adjustable standing desk, 60" x 30"',
    price: 599.99,
    category: 'Furniture',
    stock: 8,
    imageUrl: 'https://example.com/standing-desk.jpg',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with Cherry MX switches',
    price: 149.99,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://example.com/keyboard.jpg',
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 79.99,
    category: 'Electronics',
    stock: 60,
    imageUrl: 'https://example.com/mouse.jpg',
  },
  {
    name: '4K Monitor 27"',
    description: 'Ultra HD 4K monitor with IPS panel and HDR',
    price: 449.99,
    category: 'Electronics',
    stock: 20,
    imageUrl: 'https://example.com/monitor.jpg',
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
    price: 49.99,
    category: 'Electronics',
    stock: 100,
    imageUrl: 'https://example.com/usb-hub.jpg',
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with anti-theft design',
    price: 69.99,
    category: 'Accessories',
    stock: 45,
    imageUrl: 'https://example.com/backpack.jpg',
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    price: 39.99,
    category: 'Furniture',
    stock: 35,
    imageUrl: 'https://example.com/desk-lamp.jpg',
  },
  {
    name: 'Webcam 1080p',
    description: 'Full HD webcam with auto-focus and built-in microphone',
    price: 89.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://example.com/webcam.jpg',
  },
  {
    name: 'Portable SSD 1TB',
    description: 'Fast portable SSD with USB-C, 1050MB/s read speed',
    price: 129.99,
    category: 'Electronics',
    stock: 5, // Low stock
    imageUrl: 'https://example.com/ssd.jpg',
  },
  {
    name: 'Notebook Set',
    description: 'Premium hardcover notebooks, set of 3',
    price: 24.99,
    category: 'Stationery',
    stock: 75,
    imageUrl: 'https://example.com/notebooks.jpg',
  },
  {
    name: 'Pen Set',
    description: 'Professional pen set with ballpoint and rollerball',
    price: 34.99,
    category: 'Stationery',
    stock: 3, // Low stock
    imageUrl: 'https://example.com/pens.jpg',
  },
];

/******************************************************************************
                                Seed Function
******************************************************************************/

async function seedDatabase() {
  try {
    logger.info('Starting database seeding...');

    // Connect to MongoDB
    await connectDB();

    // Add all sample products
    let count = 0;
    for (const product of sampleProducts) {
      await ProductRepo.add(product);
      count++;
      logger.info(`Added: ${product.name}`);
    }

    logger.info(`✓ Successfully seeded ${count} products`);

    // Display some statistics
    const allProducts = await ProductRepo.getAll();
    const categoryStats = await ProductRepo.countByCategory();
    const lowStockProducts = await ProductRepo.getLowStockProducts();

    logger.info('\n--- Database Statistics ---');
    logger.info(`Total products: ${allProducts.length}`);
    logger.info('Products by category:');
    logger.info(categoryStats);
    logger.info(`Low stock products: ${lowStockProducts.length}`);

    // Disconnect from MongoDB
    await disconnectDB();

    logger.info('\n✓ Database seeding completed successfully!');
  } catch (error) {
    logger.err('Error seeding database:', error);
    process.exit(1);
  }
}

/******************************************************************************
                            Run if called directly
******************************************************************************/

// Uncomment to run this file directly
// seedDatabase();

export default seedDatabase;

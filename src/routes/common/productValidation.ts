import { body, ValidationChain } from 'express-validator';

/**
 * Validation middleware for product creation (POST)
 */
export const validateProductCreation = (): ValidationChain[] => {
  return [
    body('name').isString().notEmpty().withMessage('Name must be a string'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ];
};

/**
 * Validation middleware for product update (PUT)
 */
export const validateProductUpdate = (): ValidationChain[] => {
  return [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ];
};

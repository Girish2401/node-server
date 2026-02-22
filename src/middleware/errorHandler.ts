import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error & { status?: number; code?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Database connection errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ER_ACCESS_DENIED_ERROR') {
    res.status(503).json({
      success: false,
      message: 'Database connection failed. Please check your database configuration.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
    return;
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};


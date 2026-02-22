import express, { Request, Response } from 'express';
import { UserModel } from '../models/User';

const router = express.Router();

/**
 * GET /users
 * Fetch the complete user list from the database
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.getAll();
    
    res.status(200).json({
      success: true,
      total: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error'
    });
  }
});

export default router;


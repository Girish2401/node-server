import { connection } from '../config/database';

export interface Hair {
  color: string;
  type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  email: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {
  /**
   * Get all users from the database
   * Uses parameterized queries to prevent SQL injection
   */
  static async getAll(): Promise<User[]> {
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users ORDER BY id ASC'
      );
      
      // MySQL JSON columns may be returned as objects or strings depending on driver version
      const parseJsonField = (field: any): any => {
        if (!field) return null;
        if (typeof field === 'object') return field; // Already parsed
        if (typeof field === 'string') {
          try {
            return JSON.parse(field);
          } catch (e) {
            return null;
          }
        }
        return null;
      };

      return (rows as any[]).map((row: any) => ({
        ...row,
        hair: parseJsonField(row.hair),
        address: parseJsonField(row.address),
        bank: parseJsonField(row.bank),
        company: parseJsonField(row.company),
        crypto: parseJsonField(row.crypto)
      })) as User[];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch users: ${errorMessage}`);
    }
  }
}


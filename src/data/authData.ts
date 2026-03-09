export type Role = 'admin' | 'creator' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

export const DEMO_ACCOUNTS = {
  admin: {
    email: 'admin@renewberry.io',
    password: 'Admin123!',
    user: {
      id: 'admin-1',
      email: 'admin@renewberry.io',
      name: 'Admin User',
      role: 'admin' as Role,
      avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=b6e3f4'
    }
  },
  creator: {
    email: 'creator@renewberry.io',
    password: 'Creator123!',
    user: {
      id: 'creator-1',
      email: 'creator@renewberry.io',
      name: 'Creator User',
      role: 'creator' as Role,
      avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=creator&backgroundColor=c0aede'
    }
  }
};
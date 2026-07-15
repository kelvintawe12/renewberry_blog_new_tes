export interface TeamMember {
  id: number;

  slug: string;

  name: string;

  role: string;

  image: string;

  bio: string;

  department: string;

  expertise: string[];

  website?: string;

  facebook?: string;

  linkedin?: string;

  twitter?: string;

  achievements: string[];
}
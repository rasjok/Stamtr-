
export interface FamilyMember {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string; // New field
  deathDate?: string;
  burialPlace?: string; // New field
  parentId?: string; // ID of the Marriage/Union OR the ID of a single parent
  gender?: 'male' | 'female' | 'other';
  photoUrl?: string;
  customPhoto?: string; // Base64 encoded user-uploaded image
  bio?: string;
}

export interface Marriage {
  id: string;
  husbandId: string;
  wifeId: string;
  date?: string;
  location?: string;
  type?: string;
  status?: string;
  divorced?: boolean;
}

export interface FamilyUnitNode {
  id: string;
  descendant: FamilyMember;
  partner?: FamilyMember;
  marriage?: Marriage;
  children?: FamilyUnitNode[];
}

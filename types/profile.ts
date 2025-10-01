export type Badge = {
  id: string;
  name: string;
  description: string;
  earnedAt: Date;
};

export type Certification = {
  id: string;
  title: string;
  issuedBy: string;
  issuedAt: Date;
  fileUrl?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  country?: string | null;

  // optional sections
  badges?: Badge[];
  certifications?: Certification[];
};

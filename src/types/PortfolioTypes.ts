export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLinks;
  resumeUrl: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  mode: string;
  description: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

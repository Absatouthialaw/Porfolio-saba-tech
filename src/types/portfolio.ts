export interface Project {
  id: string | number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  results: string;
  images: string[];
  pdfUrl?: string;
  link?: string;
  enabled: boolean;
  order: number;
}

export interface Service {
  id: string;
  iconName: string; // lucide icon name
  title: string;
  description: string;
  color: string;
  details: string[];
  enabled: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  enabled: boolean;
  order: number;
}

export interface ToolCategory {
  id: string;
  category: string;
  items: ToolItem[];
  enabled: boolean;
  order: number;
}

export interface ToolItem {
  name: string;
  iconPath: string; // SVG path data or icon identifier
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  enabled: boolean;
  order: number;
}

export interface RoadmapStep {
  id: string;
  step: string;
  tag: string;
  title: string;
  description: string;
  iconName: string;
  enabled: boolean;
  order: number;
}

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface WorkProcessStep {
  id: string;
  num: string;
  title: string;
  desc: string;
  iconName: string;
  enabled: boolean;
  order: number;
}

export interface GlobalSettings {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  aboutText1: string;
  aboutText2: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  location: string;
  externalSiteText?: string; // Legacy
  externalSiteUrl?: string; // Legacy
  externalSites?: { label: string; url: string }[];
  cvUrl?: string;
  businessCardUrl?: string;
  presentationVideoUrl?: string;
  socials: Record<string, string>;
}

export interface PortfolioData {
  projects: Project[];
  services: Service[];
  skills: Skill[];
  tools: ToolCategory[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  roadmap: RoadmapStep[];
  statistics: Statistic[];
  workProcess: WorkProcessStep[];
  settings: GlobalSettings;
}

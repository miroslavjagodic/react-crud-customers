export interface CustomerResponse {
  id: string;
  isActive: boolean;
  company: string;
  industry: string;
  projects: Project[];
  about: string;
}
export interface CustomerCreate {
  id: string;
  isActive: boolean;
  company: string;
  industry: string;
  projects?: Project[];
  about?: string;
}

export interface CustomerEdit {
  isActive?: boolean;
  company?: string;
  industry?: string;
  projects?: Project[];
  about?: string;
}

export interface Project {
  id: string;
  name: string;
  contact: string;
  start_date: string;
  end_date: string;
}

export interface FormErrorProjects {
  name?: string;
  contact?: string;
  start_date?: string;
  end_date?: string;
}

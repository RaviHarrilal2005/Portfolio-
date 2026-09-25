export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  demo_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuestbookMessage {
  id: string;
  user_id: string;
  user_github_handle: string;
  avatar_url?: string;
  message: string;
  created_at: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    user_name?: string;
  };
}

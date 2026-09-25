export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          tech_stack: string[];
          github_url?: string;
          demo_url?: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          tech_stack: string[];
          github_url?: string;
          demo_url?: string;
          featured?: boolean;
        };
        Update: {
          title?: string;
          description?: string;
          tech_stack?: string[];
          github_url?: string;
          demo_url?: string;
          featured?: boolean;
        };
      };
      guestbook: {
        Row: {
          id: string;
          user_id: string;
          user_github_handle: string;
          avatar_url?: string;
          message: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          user_github_handle: string;
          avatar_url?: string;
          message: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    name: 'Backend & Data',
    skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'Supabase', 'Data Structures'],
  },
  {
    name: 'Tools & Practices',
    skills: ['Git & GitHub', 'Testing', 'Debugging', 'Agile', 'Accessibility'],
  },
];

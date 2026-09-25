import type { Project } from '../../hooks/useProjects'
import Card from '../shared/Card'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div>
        {project.featured && <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">Featured</span>}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
      </div>
      <p className="flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{project.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.tech_stack.map((technology) => <li key={technology} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{technology}</li>)}
      </ul>
      {(project.github_url || project.demo_url) && (
        <div className="flex gap-4 text-sm">
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">GitHub</a>}
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Live demo</a>}
        </div>
      )}
    </Card>
  )
}

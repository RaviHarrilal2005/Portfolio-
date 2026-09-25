import type { Project } from '../../hooks/useProjects'
import Card from '../shared/Card'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div>
        {project.featured && <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-cyber-amber">Featured</span>}
        <h3 className="text-xl font-bold text-cyan-200">{project.title}</h3>
      </div>
      <p className="flex-1 text-sm leading-6 text-slate-300">{project.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.tech_stack.map((technology) => <li key={technology} className="rounded bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{technology}</li>)}
      </ul>
      {(project.github_url || project.demo_url) && (
        <div className="flex gap-4 text-sm">
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-100">GitHub</a>}
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-100">Live demo</a>}
        </div>
      )}
    </Card>
  )
}

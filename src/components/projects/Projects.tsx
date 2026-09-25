import { useProjects } from '../../hooks/useProjects'
import Card from '../shared/Card'
import Loading from '../shared/Loading'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { projects, loading, error } = useProjects()

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16">
      <h2 id="projects-heading" className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
      {loading && <div className="py-12" role="status" aria-label="Loading projects"><Loading /></div>}
      {!loading && error && <Card><p role="alert" className="text-amber-300">{error}</p></Card>}
      {!loading && !error && projects.length === 0 && <Card><p className="text-slate-300">No projects are available yet.</p></Card>}
      {!loading && !error && projects.length > 0 && <div className="grid gap-6 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
    </section>
  )
}

export { ProjectCard }

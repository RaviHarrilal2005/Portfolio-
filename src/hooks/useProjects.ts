import { useEffect, useState } from 'react'
import type { Database } from '../lib/database.types'
import { supabase } from '../lib/supabase'

export type Project = Database['public']['Tables']['projects']['Row']

interface UseProjectsResult {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    void supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return
        if (queryError) {
          setError('Projects are temporarily unavailable. Please try again later.')
        } else {
          setProjects(data ?? [])
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { projects, loading, error }
}

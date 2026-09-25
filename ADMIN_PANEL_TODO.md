# Admin Panel + Video Upload — Next Session

## Quick Summary
Add an owner-only admin panel at `#admin` to add projects with optional video uploads to Supabase Storage.

## Setup (One-time — do first)

1. **Supabase Dashboard → SQL Editor:**
   ```sql
   ALTER TABLE projects ADD COLUMN video_url text;
   ```

2. **Supabase Dashboard → Storage → Create bucket:**
   - Name: `projects-videos`
   - Make public: YES
   - Click Create

3. **Update `.env.local`:**
   ```
   VITE_OWNER_GITHUB_ID=RaviHarrilal2005
   ```

---

## Tasks (Do in order)

### Task 1: Auth Helper (5 min)
**File:** `src/lib/auth.ts`

Add this function at the end:
```typescript
import type { User } from '@supabase/supabase-js'

export function isOwner(user: User | null): boolean {
  if (!user?.user_metadata?.user_name) return false
  const ownerGitHubId = import.meta.env.VITE_OWNER_GITHUB_ID
  if (!ownerGitHubId) {
    console.warn('VITE_OWNER_GITHUB_ID not set in environment')
    return false
  }
  return user.user_metadata.user_name === ownerGitHubId
}
```

**Commit:** `git add src/lib/auth.ts && git commit -m "feat: add isOwner() helper"`

---

### Task 2: Upload Helper (5 min)
**File:** `src/lib/supabase.ts`

Add this function before the export statement:
```typescript
export async function uploadProjectVideo(file: File): Promise<{ url: string | null; error: string | null }> {
  if (!file) return { url: null, error: 'No file selected' }

  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('projects-videos')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) {
    return { url: null, error: error.message }
  }

  const { data: publicUrl } = supabase.storage.from('projects-videos').getPublicUrl(data.path)
  return { url: publicUrl.publicUrl, error: null }
}
```

**Commit:** `git add src/lib/supabase.ts && git commit -m "feat: add uploadProjectVideo helper"`

---

### Task 3: Admin Form (20 min)
**New files:**
- `src/components/admin/ProjectForm.tsx`
- `src/components/admin/AdminDashboard.tsx`
- `src/components/admin/index.ts`

**Step 1: Create directory**
```bash
mkdir -p src/components/admin
```

**Step 2: Create `src/components/admin/ProjectForm.tsx`**
```typescript
import { FormEvent, useState } from 'react'
import Button from '../shared/Button'
import { supabase, uploadProjectVideo } from '../../lib/supabase'

export default function ProjectForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      let videoUrl: string | null = null

      if (videoFile) {
        const { url, error: uploadError } = await uploadProjectVideo(videoFile)
        if (uploadError) {
          throw new Error(`Video upload failed: ${uploadError}`)
        }
        videoUrl = url
      }

      const techStackArray = techStack
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0)

      const { error: insertError } = await supabase.from('projects').insert([
        {
          title,
          description,
          tech_stack: techStackArray,
          github_url: githubUrl || null,
          demo_url: demoUrl || null,
          video_url: videoUrl,
          featured,
        },
      ])

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`)
      }

      setTitle('')
      setDescription('')
      setTechStack('')
      setGithubUrl('')
      setDemoUrl('')
      setVideoFile(null)
      setFeatured(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Chat Application"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Brief description of the project"
        />
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-900 dark:text-white">
          Technologies (comma-separated)
        </label>
        <input
          id="techStack"
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="React, TypeScript, Tailwind"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-900 dark:text-white">
            GitHub URL
          </label>
          <input
            id="githubUrl"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-900 dark:text-white">
            Demo URL
          </label>
          <input
            id="demoUrl"
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="https://demo.example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="video" className="block text-sm font-medium text-gray-900 dark:text-white">
          Video (optional)
        </label>
        <input
          id="video"
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="mt-2 block w-full text-sm text-gray-500 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 dark:text-gray-400"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-900 dark:text-white">Featured project</span>
      </label>

      {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      {success && <p className="text-sm font-medium text-green-600 dark:text-green-400">Project added successfully!</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Project'}
      </Button>
    </form>
  )
}
```

**Step 3: Create `src/components/admin/AdminDashboard.tsx`**
```typescript
import { useAuth } from '../../hooks/useAuth'
import { isOwner } from '../../lib/auth'
import Card from '../shared/Card'
import ProjectForm from './ProjectForm'

export default function AdminDashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="py-20 text-center text-gray-600 dark:text-gray-300">Loading...</div>
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Card>
          <p className="text-gray-600 dark:text-gray-300">Sign in with GitHub to access the admin panel.</p>
        </Card>
      </section>
    )
  }

  if (!isOwner(user)) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Card>
          <p className="text-red-600 dark:text-red-400">Access denied. Only the portfolio owner can manage projects.</p>
        </Card>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Add Project</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Add a new project to your portfolio.</p>
      </div>
      <Card>
        <ProjectForm />
      </Card>
    </section>
  )
}
```

**Step 4: Create `src/components/admin/index.ts`**
```typescript
export { default as AdminDashboard } from './AdminDashboard'
export { default as ProjectForm } from './ProjectForm'
```

**Commit:**
```bash
git add src/components/admin/
git commit -m "feat: add admin dashboard and project form with video upload"
```

---

### Task 4: Video Player in ProjectCard (5 min)
**File:** `src/components/projects/ProjectCard.tsx`

Find the section with GitHub/Demo links and add this BEFORE it:
```typescript
{project.video_url && (
  <div className="mt-4 w-full overflow-hidden rounded-lg bg-black">
    <video controls className="w-full" style={{ maxHeight: '400px' }}>
      <source src={project.video_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
```

**Commit:**
```bash
git add src/components/projects/ProjectCard.tsx
git commit -m "feat: add video player to project cards"
```

---

### Task 5: Add Admin Route (2 min)
**File:** `src/App.tsx`

Add import at top:
```typescript
import { AdminDashboard } from './components/admin'
```

Find the `<main>` section and replace:
```typescript
<main className="mx-auto max-w-5xl px-6">
  <Hero />
  <Projects />
  <Skills />
  <Guestbook />
</main>
```

With:
```typescript
<main className="mx-auto max-w-5xl px-6">
  {window.location.hash === '#admin' ? (
    <AdminDashboard />
  ) : (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Guestbook />
    </>
  )}
</main>
```

**Commit:**
```bash
git add src/App.tsx
git commit -m "feat: add #admin route for project management"
```

---

## Testing

1. Build: `npm run build` (should pass)
2. Dev: `npm run dev`
3. Sign in as non-owner → go to `#admin` → should see access denied
4. Sign in as RaviHarrilal2005 → go to `#admin` → should see form
5. Fill form, add project (with or without video)
6. Check portfolio — project should appear with video player if video was uploaded

---

## Total Time: ~45 minutes

Pick up any task anytime in the next session!

# Graph Report - portfolio  (2026-09-24)

## Corpus Check
- Corpus is ~7,005 words - fits in a single context window. You may not need a graph.

## Summary
- 163 nodes · 240 edges · 18 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Build Scripts
- Guestbook Data Flow
- TypeScript App Config
- Interactive Portfolio UI
- React App Shell
- Development Tooling
- Shared Components
- Project Architecture
- Authentication Helpers
- Node Build Config
- OAuth Verification
- Runtime Dependencies
- Development History
- Portfolio Features

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `react` - 9 edges
3. `useAuth()` - 9 edges
4. `useGuestbook()` - 6 edges
5. `Card()` - 6 edges
6. `compilerOptions` - 6 edges
7. `scripts` - 5 edges
8. `useProjects()` - 5 edges
9. `supabase` - 5 edges
10. `@supabase/supabase-js` - 4 edges

## Surprising Connections (you probably didn't know these)
- `React Mount Point` --conceptually_related_to--> `Vite Development Environment`  [INFERRED]
  index.html → .superpowers/sdd/task-1-report.md
- `GitHub OAuth Guestbook Flow` --conceptually_related_to--> `Supabase Environment Variable Alignment`  [INFERRED]
  MANUAL_TESTING.md → .superpowers/sdd/task-4-fix-report.md
- `GitHub OAuth Guestbook Flow` --references--> `GitHub Auth Helpers`  [EXTRACTED]
  MANUAL_TESTING.md → .superpowers/sdd/task-2-report.md
- `useGuestbook()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/guestbook/useGuestbook.ts → src/hooks/useAuth.ts
- `useAuth()` --indirect_call--> `signInWithGitHub()`  [INFERRED]
  src/hooks/useAuth.ts → src/lib/auth.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Portfolio Development Readiness** — superpowers_sdd_progress_vite_react_scaffold, superpowers_sdd_progress_supabase_auth_helpers, superpowers_sdd_progress_manual_testing_checklist [EXTRACTED 1.00]
- **Guestbook OAuth Production Flow** — manual_testing_github_oauth_guestbook, manual_testing_netlify_production_verification, superpowers_sdd_task_2_report_github_auth_helpers [EXTRACTED 1.00]

## Communities (18 total, 0 thin omitted)

### Community 0 - "Build Scripts"
Cohesion: 0.09
Nodes (22): name, private, scripts, build, dev, lint, preview, type (+14 more)

### Community 1 - "Guestbook Data Flow"
Cohesion: 0.20
Nodes (11): @supabase/supabase-js, Guestbook(), GuestbookForm(), GuestbookFormProps, friendlyError(), useGuestbook(), Button(), ButtonProps (+3 more)

### Community 2 - "TypeScript App Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 3 - "Interactive Portfolio UI"
Cohesion: 0.19
Nodes (10): framer-motion, CommandPalette(), CommandPaletteProps, Projects(), Skills(), skillCategories, SkillCategory, useProjects() (+2 more)

### Community 4 - "React App Shell"
Cohesion: 0.32
Nodes (8): react, App(), Hero(), Navbar(), NavbarProps, useAuth(), signInWithGitHub(), signOut()

### Community 5 - "Development Tooling"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, eslint, postcss, tailwindcss, @types/react, @types/react-dom, typescript (+4 more)

### Community 6 - "Shared Components"
Cohesion: 0.31
Nodes (6): ProjectCard(), ProjectCardProps, Card(), CardProps, Loading(), Project

### Community 7 - "Project Architecture"
Cohesion: 0.25
Nodes (8): Main TSX Entry Module, Portfolio Document Shell, React Mount Point, Cyber Theme, Tailwind v3 Compatibility, Vite Development Environment, Initial Scaffold Review, Shared UI Components

### Community 8 - "Authentication Helpers"
Cohesion: 0.29
Nodes (3): GuestbookMessage, Project, User

### Community 9 - "Node Build Config"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 10 - "OAuth Verification"
Cohesion: 0.38
Nodes (7): Browser Verification, GitHub OAuth Guestbook Flow, Netlify Production Verification, GitHub Auth Helpers, Typed Supabase Client, Vite Environment Typing, Supabase Environment Variable Alignment

### Community 11 - "Runtime Dependencies"
Cohesion: 0.33
Nodes (6): dependencies, framer-motion, lucide-react, react, react-dom, @supabase/supabase-js

### Community 12 - "Development History"
Cohesion: 0.40
Nodes (5): Manual Testing Checklist, SDD Execution Plan, Supabase Auth Helpers, Task Dependency Order, Vite React Scaffold

### Community 13 - "Portfolio Features"
Cohesion: 0.50
Nodes (4): Projects and Guestbook Sections, Single-Page Hash Navigation, Command Palette Search, Terminal Commands

## Knowledge Gaps
- **74 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+69 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 82 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `React App Shell` to `Build Scripts`, `Guestbook Data Flow`, `Interactive Portfolio UI`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Tooling` to `Build Scripts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Build Scripts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useAuth()` (e.g. with `signInWithGitHub()` and `signOut()`) actually correct?**
  _`useAuth()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _74 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Build Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `TypeScript App Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
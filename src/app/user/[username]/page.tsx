import { UserPageClient } from './UserPageClient'

// Usernames aren't known at build time. A placeholder entry satisfies Next.js's
// static-export requirement (it checks prerenderRoutes.length > 0). Actual user
// routes are handled by the nginx SPA fallback (try_files → /index.html), which
// boots the client router that renders this component for any /user/<username>/ path.
export function generateStaticParams() {
  return [{ username: '_' }]
}

export default function UserPage() {
  return <UserPageClient />
}

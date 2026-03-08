'use client'

import Link from 'next/link'

export default function NotFound() {
  const channel = Math.random() < 0.5 ? 1 : 2

  return (
    <main className="index_page">
      <div>
        <h1 className="header">404 NOT FOUND</h1>
        <p>
          This page does not exist. Go{' '}
          <Link className="wheat_text_link" href={`/channel/${channel}`}>
            somewhere else
          </Link>
        </p>
      </div>
    </main>
  )
}

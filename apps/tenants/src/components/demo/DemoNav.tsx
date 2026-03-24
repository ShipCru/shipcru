import Link from 'next/link'

const sameOriginLinks = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
]

const crossBoundaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/blog/hello-world', label: 'Hello World' },
]

export function DemoNav() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 border-b">
      {crossBoundaryLinks.map(({ href, label }) => (
        <a key={href} href={href} className="text-blue-600 hover:underline">
          {label}
        </a>
      ))}
      {sameOriginLinks.map(({ href, label }) => (
        <Link key={href} href={href} className="text-blue-600 hover:underline">
          {label}
        </Link>
      ))}
    </nav>
  )
}

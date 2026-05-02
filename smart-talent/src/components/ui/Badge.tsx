import type { ReactNode } from 'react'

type Variant = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'

interface Props {
  children: ReactNode
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-700',
  purple: 'bg-purple-100 text-purple-800',
}

export function Badge({ children, variant = 'gray' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

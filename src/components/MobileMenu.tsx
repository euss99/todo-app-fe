'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import RouteName from '@/utils/enums/RouteName.enum'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  const getMobileClasses = useMemo(() => {
    const baseClasses = 'block px-3 py-2 rounded-md text-base font-medium'
    const activeClasses = 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
    const inactiveClasses = 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white'

    return (path: string) => `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`
  }, [pathname])

  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link href={RouteName.HOME} className={getMobileClasses(RouteName.HOME)} onClick={onClose}>
          Home
        </Link>
        <Link href={RouteName.COUNTER} className={getMobileClasses(RouteName.COUNTER)} onClick={onClose}>
          Counter
        </Link>
      </div>
    </div>
  )
}
import { useCallback,useEffect, useState } from "react"

import StorageKey from "@/utils/enums/StorageKey.enum"
import Theme from "@/utils/enums/Theme.enum"

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem(StorageKey.THEME) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
    localStorage.setItem(StorageKey.THEME, newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [theme])

  const isDark = useCallback(() => theme === Theme.DARK, [theme])

  return {
    theme,
    mounted,
    toggleTheme,
    isDark
  }
}
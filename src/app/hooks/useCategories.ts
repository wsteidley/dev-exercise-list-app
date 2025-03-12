'use client'
import { Category } from '@/lib/models/category'
import { useEffect, useState } from 'react'

export default function useCategories(): {
  categories: Category[]
  loading: boolean
  error: Error | null
} {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.categories)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

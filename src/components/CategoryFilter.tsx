// components/CategoryFilter.jsx
'use client'

import { Category } from '@/lib/models/category'
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type CategoryFilterProps = {
  categories: Category[]
}
export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryName = searchParams.get('category')
  const [categoryFilter, setCategoryFilter] = useState(categoryName ?? 'All')

  const handleCategoryChange = (e: SelectChangeEvent) => {
    const value = e.target.value
    setCategoryFilter(value)
    router.push(`?category=${value}`)
  }

  return (
    <Box width={'100%'}>
      <InputLabel id="categoryFilterLabel">Filter</InputLabel>
      <Select
        fullWidth
        labelId="categoryFilterLabel"
        name="categoryFitler"
        label="Category Filter"
        value={categoryFilter}
        onChange={handleCategoryChange}
      >
        <MenuItem value="All">
          <em>All</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

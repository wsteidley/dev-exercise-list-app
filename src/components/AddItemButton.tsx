'use client'

import { addItemAction } from '@/app/actions'
import getCategories from '@/app/hooks/getCategories'
import { formatErrorMessage } from '@/lib/utils'
import { Add } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export const AddItemButton = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const { categories } = getCategories()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setSelectedCategories([])
    setOpen(false)
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    // single item array, allowing for multi select later
    setSelectedCategories([event.target.value as string])
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      await addItemAction(formData)
    } catch (error) {
      enqueueSnackbar(formatErrorMessage(error), { variant: 'error' })
      return
    }

    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<Add />}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <form action={handleSubmit}>
          <DialogTitle>Add an item to the list</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ my: 2 }}>
              <TextField name="name" label="Name" fullWidth />
              <InputLabel id="categoryLabel">Category</InputLabel>
              <Select
                labelId="categoryLabel"
                name="categories"
                label="Category"
                value={selectedCategories?.[0] ?? ''}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>Uncategorized</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline={true}
                rows={4}
              />
              <TextField type="url" name="imageUrl" label="Image URL" fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

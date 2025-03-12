'use client'

import { addItemAction } from '@/app/actions'
import useCategories from '@/app/hooks/useCategories'
import { formatErrorMessage } from '@/lib/utils'
import { Add } from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import {
  Box,
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
import Image from 'next/image'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export const AddItemButton = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const { categories } = useCategories()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setSelectedCategory('')
    setOpen(false)
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      await addItemAction(formData)
      enqueueSnackbar('Item Successfully Created!')
    } catch (error) {
      enqueueSnackbar(formatErrorMessage(error), { variant: 'error' })
      return
    }

    handleClose()
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newUrl = event?.target?.value
      new URL(newUrl)
      setImageUrl(event?.target?.value ?? '')
    } catch (e) {
      setImageUrl('')
    }
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {!imageUrl && <ImageIcon sx={{ height: '200px', width: '200px' }} />}
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={'previewImage'}
                  onError={() => {
                    setImageUrl('')
                  }}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjY2NjYyIvPjwvc3ZnPg=="
                  style={{ objectFit: 'contain' }}
                />
              )}
            </Box>
            <Stack spacing={2} sx={{ my: 2 }}>
              <TextField name="name" label="Name" fullWidth />
              <InputLabel id="categoryLabel">Category</InputLabel>
              <Select
                labelId="categoryLabel"
                name="category"
                label="Category"
                value={selectedCategory}
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
              <TextField
                type="url"
                name="imageUrl"
                label="Image URL"
                fullWidth
                onChange={handleImageUrlChange}
              />
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

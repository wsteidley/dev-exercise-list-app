import { AddItemButton } from '@/components/AddItemButton'
import CategoryFilter from '@/components/CategoryFilter'
import { Category, listCategories } from '@/lib/models/category'
import { listMyItems } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import { pluralize } from '@/lib/utils'
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

const uncategorized: Category = {
  id: '',
  description: '',
  name: 'Uncategorized',
}

export type SearchParams = { [key: string]: string | string[] | undefined }
type SearchParamsProps = {
  searchParams: SearchParams
}

export default async function Categories({ searchParams }: SearchParamsProps) {
  const categoryName = searchParams.category || ''

  const authUser = getCurrentAuthUser()
  const categories = [...(await listCategories()), uncategorized]

  const displayCategories = categories.filter((c) =>
    categoryName && categoryName !== 'All' ? c.name === categoryName : true,
  )
  const items = await listMyItems(authUser)

  const categoriesWithItems = displayCategories.map((category) => ({
    ...category,
    items: items.filter(
      (item) => item.category?.id === category.id || (!item.category && !category.id),
    ),
  }))

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="body1">
            You have{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              {items.length.toLocaleString()} {pluralize(items.length, 'item', 'items')}
            </Box>{' '}
            in your list
          </Typography>
          <Typography variant="body1">
            {' '}
            <Link href="/dashboard">View All</Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AddItemButton />
          <Box width={'150px'}>
            <CategoryFilter categories={categories} />
          </Box>
        </Box>
      </Box>
      {categories.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {categoriesWithItems.map((category) => {
            return (
              <Box
                sx={{
                  border: 1,
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  padding: '1rem',
                }}
              >
                <Typography sx={{ padding: '0.5rem 0' }} variant="h5">
                  {category.name}
                  {` (${category.items.length})`}
                </Typography>
                <List
                  disablePadding
                  sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '1rem' }}
                >
                  {category.items.length ? (
                    category.items.map((item, index) => (
                      <Box key={item.id} sx={{ border: '1px solid black' }}>
                        <ListItem key={item.id} disableGutters disablePadding>
                          <ListItemButton
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                            href={`/dashboard/item/${item.id}`}
                          >
                            <ListItemText primary={item.name} />
                            <ListItemText secondary={item?.category?.name ?? 'Uncategorized'} />
                          </ListItemButton>
                        </ListItem>
                        {index < items.length - 1 && <Divider />}
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2">No Items in this Category</Typography>
                  )}
                </List>
              </Box>
            )
          })}
        </Box>
      )}
    </Stack>
  )
}

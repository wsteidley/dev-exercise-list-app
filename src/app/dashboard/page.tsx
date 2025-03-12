import { AddItemButton } from '@/components/AddItemButton'
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

export default async function Home() {
  const authUser = getCurrentAuthUser()
  const items = await listMyItems(authUser)

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
            <Link href="/dashboard/categories">View by Category</Link>
          </Typography>
        </Box>

        <AddItemButton />
      </Box>
      {items.length > 0 && (
        <Box
          sx={{
            border: 1,
            borderColor: 'grey.200',
            borderRadius: 1,
          }}
        >
          <List
            disablePadding
            sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '1rem' }}
          >
            {items.map((item, index) => (
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
            ))}
          </List>
        </Box>
      )}
    </Stack>
  )
}

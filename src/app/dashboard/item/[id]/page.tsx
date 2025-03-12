import { getItemDetails } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Link, Typography } from '@mui/material'
import Image from 'next/image'

export default async function Page({ params }: { params: { id: string } }) {
  const authUser = getCurrentAuthUser()
  const itemDetails = await getItemDetails(authUser, params.id)

  return (
    <Box>
      <Button href={'/dashboard'} startIcon={<ArrowBackIcon />}>
        Back to all items
      </Button>
      {itemDetails ? (
        <>
          <Typography variant="h4">{itemDetails.name}</Typography>
          <Typography variant="h5">
            <Link
              href={`/dashboard/categories?category=${itemDetails?.category?.name ?? 'Uncategorized'}`}
            >
              {itemDetails?.category?.name ?? 'Uncategorized'}
            </Link>
          </Typography>
          <Typography color={itemDetails.description ? 'text.primary' : 'text.secondary'}>
            {itemDetails.description || 'No description'}
          </Typography>
          {itemDetails.imageUrl && (
            <Image
              src={itemDetails.imageUrl}
              width={500}
              height={500}
              alt={itemDetails.name}
              style={{ objectFit: 'contain' }}
            />
          )}
        </>
      ) : (
        <Typography color="text.secondary">Item not found</Typography>
      )}
    </Box>
  )
}

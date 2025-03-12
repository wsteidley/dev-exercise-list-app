import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import prisma from '../prisma'
import { Category } from './category'
import { AuthUser } from './user'

type ListItem = {
  id: string
  name: string
  category: Category | null
}

type ListItemDetails = {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  category: Category | null
}

export const listMyItems = async (authUser: AuthUser): Promise<ListItem[]> => {
  const items = await prisma.listItem.findMany({
    where: { authorId: authUser.id },
    include: { category: true },
  })
  return items.map((item) => ({ id: item.id, name: item.name, category: item.category }))
}

export const getItemDetails = async (
  authUser: AuthUser,
  id: string,
): Promise<ListItemDetails | null> => {
  const listItem = await prisma.listItem.findFirst({
    where: { id, authorId: authUser.id },
    include: { category: true },
  })
  if (!listItem) return null
  return {
    id: listItem.id,
    name: listItem.name,
    description: listItem.description,
    imageUrl: listItem.imageUrl,
    category: listItem?.category ?? null,
  }
}

export const createItem = async (
  authUser: AuthUser,
  name: string,
  description: string,
  imageUrl: string,
  category: string,
): Promise<ListItem> => {
  const schema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
    imageUrl: z.string().trim().optional(),
    category: z.string().trim().optional(),
  })

  const parse = schema.safeParse({ name, description, imageUrl, category })

  if (!parse.success) {
    throw fromError(parse.error)
  }
  const data = parse.data
  const listItem = await prisma.listItem.create({
    data: {
      name: data.name,
      description: data.description,
      authorId: authUser.id,
      imageUrl: data.imageUrl,
      categoryId: data.category,
    },
  })
  return { id: listItem.id, name: listItem.name, category: null }
}

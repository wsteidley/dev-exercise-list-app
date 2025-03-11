import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import prisma from '../prisma'
import { AuthUser } from './user'

type ListItem = {
  id: string
  name: string
}

type ListItemDetails = {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  categories: string[] | null
}

export const listMyItems = async (authUser: AuthUser): Promise<ListItem[]> => {
  const items = await prisma.listItem.findMany({ where: { authorId: authUser.id } })
  return items.map((item) => ({ id: item.id, name: item.name }))
}

export const getItemDetails = async (
  authUser: AuthUser,
  id: string,
): Promise<ListItemDetails | null> => {
  const listItem = await prisma.listItem.findFirst({ where: { id, authorId: authUser.id } })
  if (!listItem) return null
  return {
    id: listItem.id,
    name: listItem.name,
    description: listItem.description,
    imageUrl: listItem.imageUrl,
    categories: listItem.categoryId ? [listItem.categoryId] : null,
  }
}

export const createItem = async (
  authUser: AuthUser,
  name: string,
  description: string,
  imageUrl: string,
  categories: string[],
): Promise<ListItem> => {
  const schema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
    imageUrl: z.string().trim().optional(),
    categories: z.string().array().optional(),
  })

  const parse = schema.safeParse({ name, description, imageUrl, categories })

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
      categoryId: data.categories?.[0],
    },
  })
  return { id: listItem.id, name: listItem.name }
}

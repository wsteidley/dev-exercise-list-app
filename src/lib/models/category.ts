import prisma from '../prisma'

export type Category = {
  id: string
  name: string
  description: string | null
}

export const listCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany()
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }))
}

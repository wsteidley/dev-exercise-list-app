import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return Response.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return Response.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('>>>>>here POSTING')
    const body = await request.json()

    if (!body.name) {
      return Response.json({ error: 'Category name is required' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
      },
    })

    return Response.json(
      { message: 'Category created successfully', category: category },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating category:', error)
    return Response.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

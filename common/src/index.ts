import z from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})


export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type SignupInput = z.infer<typeof signupInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SignInInput = z.infer<typeof signInInput>

import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@aakashsaini/medium-blog";
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
	Variables: { userId: string }
}>();
export const blogRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SEC: string
	},
    Variables: {
        userId: string
    }
}>();
blogRoute.post('/*', async(c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {   
        const user = await verify(authHeader, c.env.JWT_SEC);
        if (user) {
            c.set("userId", String(user.id));
            await next()
        }else{
            c.status(403)
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (err) {
        c.status(403);
        return c.json({
            message: "You are not looged in"
        })
    }
})
blogRoute.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message: "Input is not correct"
        })
    }
    const authorId = c.get("userId")
    console.log(authorId)
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
    console.log(authorId)
     return c.json({
        id: blog.id
     })
})

    // *********************************************update blog********************************************
    blogRoute.put('/', async(c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const body = await c.req.json()
        const { success } = updateBlogInput.safeParse(body)
        if(!success){
            c.status(411)
            return c.json({
                message: "Input is not correct"
            })
        }
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.json({
            id: blog.id
        })
    })
    // *********************************************delete blog********************************************
    blogRoute.delete('/:id', async(c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const blog = await prisma.blog.delete({
                where: {
                    id: Number(id)
                }
            })
            return c.json({
                message: "blog deleted"
            })
        } catch (error) {
            c.status(411);
            return c.json({
                message: "Error while fetching blog post",
                err: error
            })
        }
    })
    
        // *********************************************get all the blogs********************************************
        blogRoute.get('/bulk', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            try {
                const blogs = await prisma.blog.findMany({
                    select: {
                        content: true,
                        id: true,
                        title: true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    }
                })
                return c.json({
                    blogs
                })
            } catch (error) {
                c.status(411);
                return c.json({
                    message: "Error while fetching blog post",
                    err: error
                })
            }
        })
    // *********************************************get blogs of one user********************************************
    blogRoute.get('/:id', async (c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const blog = await prisma.blog.findFirst({
                where: {
                    id: Number(id)
                }
            })
            return c.json({
                blog
            })
        } catch (error) {
            c.status(411);
            return c.json({
                message: "Error while fetching blog post",
                err: error
            })
        }
    })
    

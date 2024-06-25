
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
    // console.log("we are at top api")
    // console.log("authHeader is ::  ", authHeader)
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

// *********************************************add blog********************************************
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
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
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
    
        // *********************************************get bulk blogs*******************************************
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
                        authorId: true,
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
    // *********************************************get single blog********************************************
    blogRoute.get('/:id', async (c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const blog = await prisma.blog.findFirst({
                where: {
                    id: Number(id)
                },
                select:{
                    title: true,
                    content: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
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
    
    // *********************************************get all blogs (specific user)********************************************
    blogRoute.post('/myblogs', async (c) => {
    // console.log("request hit")
    const id = c.get("userId")
    // console.log("id is:::  ", id)
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
    const blogs = await prisma.blog.findMany({
    where: {
        authorId: Number(id)
    },
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
    // *********************************************share user info********************************************
    blogRoute.post('/user', async (c) => {
        const id = c.get("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: Number(id)
                }
            })
            return c.json({
                user
            })
        } catch (error) {
            c.status(411);
            return c.json({
                message: "Error while fetching blog post",
                err: error
            })
        }
    })
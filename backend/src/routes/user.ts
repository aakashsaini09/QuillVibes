import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { jwt, sign } from 'hono/jwt';
import { signInInput, signupInput } from "@aakashsaini/medium-blog";
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SEC: string
	}
}>();

// *********************************************signUp route********************************************
userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    const { success } = signupInput.safeParse(body)
    if (!success) {
      c.status(411)
      return c.json({
        message: "input not correct"
      })
    }
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name || ''
        },
      })
      const jwt = await sign({ id: user.id }, c.env.JWT_SEC);
          return c.text(jwt)
    } catch (err) {
      c.status(411)
      return c.text("Invalid!!!")
    }
    })
    // *********************************************signIn route********************************************
    userRouter.post('/signin', async(c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = signInInput.safeParse(body);
    if (!success) {
      c.status(411)
      return c.json({message: "input not correct"})
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
    if(!user){
      c.status(403);
      return c.json({error: "Invalid Credintial"});
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SEC);
            return c.text(jwt)
    })




       // *********************************************delete blog********************************************
       userRouter.delete('/:id', async(c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            return c.json({
                message: "user deleted"
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
        userRouter.get('/bulk', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            try {
                const blogs = await prisma.user.findMany()
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
